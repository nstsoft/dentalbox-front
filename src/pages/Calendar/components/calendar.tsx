import "react-big-calendar/lib/sass/styles.scss";
import "react-big-calendar/lib/sass/agenda.scss";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/sass/variables.scss";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import { Fragment, useEffect, useMemo, useState, type FC } from "react";
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
  AppointmentListItem,
} from "@types";
import { useLazyUpdateAppointmentQuery } from "@api";
import { Props } from "../types";
import { CalenderModal } from "./modal";

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
  const [selectedEvent, setSelectedEvent] = useState<AppointmentListItem>();
  const [myEvents, setMyEvents] = useState<AppointmentListItem[]>(events ?? []);
  const [updateAppointment, { isSuccess }] = useLazyUpdateAppointmentQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (events) {
      setMyEvents(events);
    }
  }, [events]);

  const handleSelectSlot = (data: any) => {
    console.log("onSelectSlot", data);
  };

  const handleSelectEvent = (event: object) => {
    console.log("onSelectEvent", event);

    setSelectedEvent(event as AppointmentEventListItem);
    setIsModalOpen(true);
  };

  const updateCalendarAppointment = (
    appointment: Appointment,
    event: AppointmentListItem,
    resourceId: string
  ) => {
    updateAppointment(appointment);
    setMyEvents((prev) =>
      prev.map((ev) =>
        ev._id === appointment._id
          ? {
              ...event,
              start: new Date(appointment.start),
              end: new Date(appointment.end),
              // cabinet: { ...event.cabinet, _id: resourceId },
            }
          : ev
      )
    );
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
              event as AppointmentListItem;
            updateCalendarAppointment(
              {
                _id,
                start: start.toString(),
                end: end.toString(),
                cabinet: (resourceId as string) ?? cabinet._id,
                doctor: doctor._id,
                patient: patient._id,
                workspace,
                chair: chair?._id,
                notes,
              },
              event as AppointmentListItem,
              resourceId as string
            );
            console.log("onEventDrop", { event, start, end, resourceId });
          }}
          onEventResize={({ event, start, end, resourceId }) => {
            const { cabinet, doctor, patient, _id, workspace, chair, notes } =
              event as AppointmentListItem;
            updateCalendarAppointment(
              {
                _id,
                start: start.toString(),
                end: end.toString(),
                cabinet: (resourceId as string) ?? cabinet._id,
                doctor: doctor._id,
                patient: patient._id,
                workspace,
                chair: chair?._id,
                notes,
              },
              event as AppointmentListItem,
              resourceId as string
            );
            console.log("onEventResize", { event, start, end, resourceId });
          }}
          resizable
          resources={resources}
          scrollToTime={scrollToTime}
          selectable
          showMultiDayTimes={true}
          step={15}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
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
      {isModalOpen && (
        <CalenderModal
          open={isModalOpen}
          event={selectedEvent}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Fragment>
  );
};
