import "react-big-calendar/lib/sass/styles.scss";
import "react-big-calendar/lib/sass/agenda.scss";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/sass/variables.scss";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import {
  Fragment,
  useMemo,
  type FC,
  type Dispatch,
  type SetStateAction,
} from "react";
import moment from "moment/min/moment-with-locales";
import {
  Calendar,
  Views,
  type View,
  momentLocalizer,
  type CalendarProps,
  type EventProps,
} from "react-big-calendar";
import { useTranslation } from "react-i18next";

import { AppointmentEventListItem, AppointmentListItem } from "@types";

const DragAndDropCalendar = withDragAndDrop(Calendar);

const CustomEvent = (el: EventProps<object>) => {
  const event = el.event as AppointmentEventListItem;
  return (
    <div>
      <strong>{event.title}</strong>
      <p style={{ margin: "0", color: "#555" }}>
        Doctor: {event.doctor.surname}
      </p>
    </div>
  );
};

type Props = {
  events: CalendarProps<AppointmentListItem>["events"];
  resources: CalendarProps["resources"];
  onViewChange: Dispatch<SetStateAction<"day" | "week">>;
  onNavigate: CalendarProps["onNavigate"];
};

export const CalendarResource: FC<Props> = ({
  resources,
  events,
  onViewChange,
  onNavigate,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.calendar" });
  const { defaultDates, views, scrollToTime } = useMemo(
    () => ({
      defaultDates: moment().toDate(),
      views: ["day", "week", "agenda"] as View[],
      scrollToTime: new Date(1972, 0, 1, 8),
    }),
    []
  );

  // const handleSelectSlot = ({ start, end }) => {
  //   // const title = window.prompt("New Event name"); // Prompt user for event title
  //   // if (title) {
  //   //   const newEvent = {
  //   //     start,
  //   //     end,
  //   //     title,
  //   //   };
  //   //   console.log("newEvent", newEvent);
  //   // }
  // };

  // const resizeEvent = useCallback(
  //   ({ event, start, end }) => {
  //     setMyEvents((prev) => {
  //       const existing = prev.find((ev) => ev.id === event.id) ?? {};
  //       const filtered = prev.filter((ev) => ev.id !== event.id);
  //       return [...filtered, { ...existing, start, end }];
  //     });
  //   },
  //   [setMyEvents]
  // );
  // const handleNavigate = (date, view, action) => {
  //   console.log(date, view, action);
  // };
  // const handleViewChange = (newView) => {
  //   console.log("View changed to:", newView);
  //   // You can perform any action based on the new view here
  // };

  const messages = {
    today: t("messages.today"),
    previous: t("messages.previous"),
    next: t("messages.next"),
    month: t("messages.month"),
    week: t("messages.week"),
    day: t("messages.day"),
    agenda: t("messages.agenda"),
    date: t("messages.date"),
    time: t("messages.time"),
    event: t("messages.event"),
  };
  return (
    <Fragment>
      <div className="height600">
        <DragAndDropCalendar
          defaultDate={defaultDates}
          defaultView={Views.DAY}
          views={views}
          events={events}
          localizer={momentLocalizer(moment)}
          onEventDrop={({ event, start, end, resourceId }) =>
            console.log("onEventDrop", { event, start, end, resourceId })
          }
          onEventResize={() => console.log("onEventResize")}
          resizable
          resources={resources}
          scrollToTime={scrollToTime}
          selectable
          showMultiDayTimes={true}
          step={15}
          onSelectSlot={(data) => console.log("onSelectSlot", data)}
          onSelectEvent={(ev) => console.log("onSelectEvent", ev)}
          resourceIdAccessor={(resource) =>
            (resource as { resourceId: number }).resourceId
          }
          resourceTitleAccessor={(resource) =>
            (resource as { resourceTitle: string }).resourceTitle
          }
          min={moment().hour(6).minute(0).toDate()}
          max={moment().hour(23).minute(59).toDate()}
          components={{ event: CustomEvent }}
          messages={messages}
          onNavigate={onNavigate}
          onView={(val) => onViewChange(val as "day" | "week")}
        />
      </div>
    </Fragment>
  );
};
