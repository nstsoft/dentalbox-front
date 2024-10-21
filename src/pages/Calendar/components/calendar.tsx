import "react-big-calendar/lib/sass/styles.scss";
import "react-big-calendar/lib/sass/agenda.scss";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/sass/variables.scss";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import {
  Fragment,
  useMemo,
  type FC,
} from "react";
import moment from "moment/min/moment-with-locales";
import {
  Calendar,
  Views,
  type View,
  momentLocalizer,
  type EventProps,
} from "react-big-calendar";
import { useTranslation } from "react-i18next";

import {
  Appointment,
  AppointmentEventListItem,
} from "@types";
import { useLazyUpdateAppointmentQuery } from "@api";
import { CalendarEvent, Props } from "../types";

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
  const [myEvents, setMyEvents] = useState<AppointmentListItem[]>(events ?? []);
  const [updateAppointment, { isSuccess }] = useLazyUpdateAppointmentQuery();

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

  const updateCalendarAppointment = (appointment: Appointment) => {
    updateAppointment(appointment);
  };

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
          events={myEvents}
          localizer={momentLocalizer(moment)}
          onEventDrop={({ event, start, end, resourceId }) => {
            const { cabinet, doctor, patient, _id, workspace, chair, notes } =
              event as CalendarEvent;
            updateCalendarAppointment({
              _id,
              start: start.toString(),
              end: end.toString(),
              cabinet: cabinet._id,
              doctor: doctor._id,
              patient: patient._id,
              workspace,
              chair: chair?._id,
              notes,
            });
            console.log("onEventDrop", { event, start, end, resourceId });
          }}
          onEventResize={({ event, start, end, resourceId }) => {
            const { cabinet, doctor, patient, _id, workspace, chair, notes } =
              event as CalendarEvent;
            updateCalendarAppointment({
              _id,
              start: start.toString(),
              end: end.toString(),
              cabinet: cabinet._id,
              doctor: doctor._id,
              patient: patient._id,
              workspace,
              chair: chair?._id,
              notes,
            });
            console.log("onEventResize", { event, start, end, resourceId });
          }}
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
