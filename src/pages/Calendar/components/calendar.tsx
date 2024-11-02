import "react-big-calendar/lib/sass/styles.scss";
import "react-big-calendar/lib/sass/agenda.scss";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/sass/variables.scss";
import "./style.scss";
import withDragAndDrop, {
  type EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";

import { Fragment, useEffect, useMemo, useState, type FC } from "react";
import { Calendar, Views, type View, dayjsLocalizer } from "react-big-calendar";
import { useTranslation } from "react-i18next";

import {
  AppointmentEventListItem,
  AppointmentListItem,
  AppointmentStatus,
  ChairSummaryListItem,
} from "@types";
import {
  useUpsertAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetWorkspaceMetadataQuery,
} from "@api";
import { Props } from "../types";
import { CalenderModal } from "./modal";
import { EditableProps, UpdateEventHandler } from "../types";
import { getCalendarMessages } from "./helpers";
import { CustomEvent } from "./elements";

import days from "dayjs";

const DragAndDropCalendar = withDragAndDrop(Calendar);

type SelectedEvent = Omit<AppointmentListItem, "id" | "workspace" | "_id"> & {
  _id?: string;
  resourceId: string;
  approved?: boolean;
  id?: string;
};

export const CalendarResource: FC<Props> = ({
  resources,
  events,
  onViewChange,
  onNavigate,
  eventResources,
}) => {
  const { patientsMap, cabinetsMap, usersMap, chairsMap, assistantMap } =
    eventResources;
  const { t } = useTranslation("", { keyPrefix: "pages.calendar" });
  const { defaultDates, views, scrollToTime } = useMemo(
    () => ({
      defaultDates: days().toDate(),
      views: ["day", "week"] as View[],
      scrollToTime: new Date(1972, 0, 1, 8),
    }),
    []
  );
  const [selectedEvent, setSelectedEvent] = useState<
    SelectedEvent | undefined
  >();
  const [myEvents, setMyEvents] = useState<AppointmentListItem[]>(events ?? []);
  const [upsertAppointment, { data }] = useUpsertAppointmentMutation();
  const [deleteAppointment, { data: deleted }] = useDeleteAppointmentMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableProps, setEditableProps] = useState<EditableProps>([]);

  const { data: workspaceMetadata } = useGetWorkspaceMetadataQuery();

  useEffect(() => {
    if (events) {
      setMyEvents(events);
    }
  }, [events]);

  useEffect(() => {
    if (deleted) {
      setMyEvents((prev) => prev.filter((item) => item._id !== deleted));
    }
  }, [deleted]);

  // Update events after mutation
  useEffect(() => {
    if (data) {
      const resourceId = data.cabinet + `${data.chair ? "_" + data.chair : ""}`;

      const newItem = {
        ...data,
        id: data._id,
        title: patientsMap.get(data.patient)?.name ?? "",
        start: days(data.start).toDate(),
        end: days(data.end).toDate(),
        resourceId,
        patient: patientsMap.get(data.patient)!,
        cabinet: cabinetsMap.get(data.cabinet)!,
        doctor: usersMap.get(data.doctor)!,
        assistant: assistantMap.get(data.assistant ?? "")!,
        chair: chairsMap.get(data.chair ?? ""),
      };

      setMyEvents((prevItems) => {
        const index = prevItems.findIndex((item) => item._id === newItem._id);
        if (index !== -1) {
          const updatedItems = [...prevItems];
          updatedItems[index] = newItem;
          return updatedItems;
        } else {
          return [...prevItems, newItem];
        }
      });
      setSelectedEvent(undefined);
    }
  }, [cabinetsMap, chairsMap, data, patientsMap, usersMap, assistantMap]);

  const getResourceChairs = (resourceId: string) => {
    const chairs: ChairSummaryListItem[] = [];

    chairsMap.forEach((chair) => {
      if (chair.cabinet === resourceId) {
        chairs.push(chair);
      }
    });
    return chairs;
  };

  const onSlotSelect = (data: {
    start: Date;
    end: Date;
    resourceId?: string | number | undefined;
  }) => {
    setEditableProps(["start", "end", "chair", "cabinet", "doctor", "patient"]);
    setIsModalOpen(true);
    const [cabinetId, chairId] = (data.resourceId as string).split("_");

    const event = {
      title: patientsMap.values().next().value.name,
      start: data.start,
      end: days(data.start).add(1, "h").toDate(),
      resourceId: data.resourceId as string,
      patient: patientsMap.values().next().value,
      cabinet: cabinetsMap.get(cabinetId)!,
      doctor: usersMap.values().next().value,
      chair: chairsMap.get(chairId),
      status: AppointmentStatus.pending,
    };

    setSelectedEvent(event);
  };

  const onUpdateSelectedEventItem: UpdateEventHandler = (data) => {
    const chairs: ChairSummaryListItem[] = [];
    setEditableProps([]);

    chairsMap.forEach((chair) => {
      if (chair.cabinet === selectedEvent?.resourceId) {
        chairs.push(chair);
      }
    });

    const val = {
      notes: data.notes,
      start: data.start?.toDate() ?? days().toDate(),
      end: data.end?.toDate() ?? days().add(1, "hour").toDate(),
      status: data.status,
    };

    if (data.cabinet) {
      Object.assign(val, {
        cabinet: cabinetsMap.get(data.cabinet),
        chair: getResourceChairs(selectedEvent?.resourceId as string)[0],
        resourceId: cabinetsMap.get(data.cabinet)?._id,
      });
    }
    if (data.doctor) {
      Object.assign(val, { doctor: usersMap.get(data.doctor) });
    }
    if (data.assistant) {
      Object.assign(val, { assistant: usersMap.get(data.assistant) });
    }

    if (data.patient) {
      Object.assign(val, {
        title: patientsMap.get(data.patient)?.name,
        patient: patientsMap.get(data.patient),
      });
    }

    if (data.chair && chairsMap.get(data.chair)?.cabinet === data.cabinet) {
      Object.assign(val, { chair: chairsMap.get(data.chair) });
    }

    setSelectedEvent((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        ...val,
        approved: true,
        status: data.status ?? AppointmentStatus.pending,
      };
    });
  };

  useEffect(() => {
    if (selectedEvent?.approved) {
      upsertAppointment({
        patient: selectedEvent.patient._id,
        doctor: selectedEvent.doctor._id,
        cabinet: selectedEvent.cabinet._id,
        chair: selectedEvent.chair?._id,
        assistant: selectedEvent.assistant?._id,
        start: days(selectedEvent.start).toISOString(),
        end: days(selectedEvent.end).toISOString(),
        status: selectedEvent.status,
        notes: selectedEvent.notes,
        _id: selectedEvent._id,
      });
    }
  }, [selectedEvent, upsertAppointment]);

  const onSelectEvent = (event: object) => {
    setEditableProps(["start", "end", "chair", "cabinet", "doctor", "status"]);

    setSelectedEvent(event as AppointmentEventListItem);
    setIsModalOpen(true);
  };

  const onAppointmentChange = ({
    event,
    start,
    end,
    resourceId,
  }: EventInteractionArgs<object>) => {
    const eventData = event as AppointmentEventListItem;
    const resource = resourceId as string;
    const [cabinetId, chairId] = resource.split("_");

    eventData.start = start;
    eventData.end = end;
    eventData.resourceId = resourceId as string;

    upsertAppointment({
      start: days(start).toISOString(),
      end: days(end).toISOString(),
      cabinet: cabinetId,
      patient: eventData.patient._id,
      doctor: eventData.doctor._id,
      chair: chairId,
      status: eventData.status,
      notes: eventData.notes,
      _id: eventData._id,
    });
  };

  if (!workspaceMetadata) {
    return null;
  }

  return (
    <Fragment>
      <div className="big-calendar">
        <DragAndDropCalendar
          defaultDate={defaultDates}
          defaultView={Views.DAY}
          views={views}
          events={myEvents}
          localizer={dayjsLocalizer(days)}
          onEventDrop={onAppointmentChange}
          onEventResize={onAppointmentChange}
          resizable
          resources={resources}
          scrollToTime={scrollToTime}
          selectable
          showMultiDayTimes={true}
          step={15}
          onSelectSlot={onSlotSelect}
          onSelectEvent={onSelectEvent}
          resourceIdAccessor={(resource) =>
            (resource as { resourceId: number }).resourceId
          }
          resourceTitleAccessor={(resource) =>
            (resource as { resourceTitle: string }).resourceTitle
          }
          min={days(workspaceMetadata.workingHours.start, "HH:mm").toDate()}
          max={days(workspaceMetadata.workingHours.end, "HH:mm").toDate()}
          components={{ event: CustomEvent }}
          messages={getCalendarMessages(t)}
          onNavigate={onNavigate}
          onView={(val) => onViewChange(val as "day" | "week")}
          eventPropGetter={(event) => ({
            className: `appointment-event ${
              (event as AppointmentEventListItem).status
            }`,
          })}
        />
      </div>

      <CalenderModal
        open={isModalOpen}
        event={selectedEvent}
        resources={eventResources}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onUpdate={onUpdateSelectedEventItem}
        editableProps={editableProps}
        onDelete={deleteAppointment}
      />
    </Fragment>
  );
};
