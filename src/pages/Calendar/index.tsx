import { CalendarResource, EmptyData } from "./components";
import days from "dayjs";
import {
  useGetAppointmentsQuery,
  useGetCabinetSummaryQuery,
  useGetPatientSummaryQuery,
  useGetUserSummaryQuery,
} from "@api";
import { useState, useEffect } from "react";
import {
  CabinetSummaryListItem,
  PatientSummaryListItem,
  UserSummaryListItem,
  AppointmentEventListItem,
  Appointment,
} from "@types";
import { useWebsocket } from "@hooks";
import { WS_EVENTS } from "@types";

export const CalendarPage = () => {
  const { data: cabinetSummary } = useGetCabinetSummaryQuery();
  const { data: patientSummary } = useGetPatientSummaryQuery();
  const { data: userSummary } = useGetUserSummaryQuery();

  const [view, setView] = useState<"day" | "week">("day");
  const [date, setDate] = useState(days());

  const { data, refetch } = useGetAppointmentsQuery({
    start: date.startOf(view).toISOString(),
    end: date.endOf(view).toISOString(),
  });
  const { message } = useWebsocket();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    refetch();
  }, [date, refetch, view]);

  useEffect(() => {
    setAppointments(data ?? []);
  }, [data]);

  useEffect(() => {
    const appointment = message?.data as Appointment | { _id: string };
    if (message?.action === WS_EVENTS.APPOINTMENT_UPDATED) {
      setAppointments((appointments) => {
        return appointments.map((item) =>
          item._id === appointment._id ? (appointment as Appointment) : item
        );
      });
    }
    if (message?.action === WS_EVENTS.APPOINTMENT_CREATED) {
      setAppointments((prev) => [...prev, appointment as Appointment]);
    }
    if (message?.action === WS_EVENTS.APPOINTMENT_DELETED) {
      setAppointments((prev) =>
        prev.filter((item) => item._id !== appointment._id)
      );
    }
  }, [message]);

  if (!cabinetSummary || !patientSummary || !userSummary) {
    return <EmptyData />;
  }

  const cabinetsMap = new Map<string, CabinetSummaryListItem>();
  const usersMap = new Map<string, UserSummaryListItem>();
  const patientsMap = new Map<string, PatientSummaryListItem>();
  const assistantMap = new Map<string, UserSummaryListItem>();

  cabinetSummary.map((cabinet) => cabinetsMap.set(cabinet._id, cabinet));
  userSummary.map((user) => {
    usersMap.set(user._id, user);
    assistantMap.set(user._id, user);
  });
  patientSummary.map((patient) => patientsMap.set(patient._id, patient));

  const onNavigate = (newDate: Date) => {
    setDate(days(newDate));
  };

  const events: AppointmentEventListItem[] = (appointments ?? []).map(
    (appointment) => ({
      ...appointment,
      id: appointment._id,
      title: patientsMap.get(appointment.patient)?.name ?? "",
      start: days(appointment.start).toDate(),
      end: days(appointment.end).toDate(),
      resourceId:
        cabinetsMap.get(appointment.cabinet)?._id +
        `${appointment.chair ? "_" + appointment.chair : ""}`,
      patient: patientsMap.get(appointment.patient)!,
      cabinet: cabinetsMap.get(appointment.cabinet)!,
      doctor: usersMap.get(appointment.doctor)!,
      chair: appointment.chair,
      assistant: assistantMap.get(appointment?.assistant ?? ""),
    })
  );

  const resources = cabinetSummary.reduce((acc, { _id, name, chairs }) => {
    if (!chairs?.length) {
      return [...acc, { resourceId: _id, resourceTitle: name }];
    }
    return [
      ...acc,
      ...chairs.map((chair) => ({
        resourceId: _id + "_" + chair,
        resourceTitle: `${name} - ${chair}`,
      })),
    ];
  }, [] as { resourceId: string; resourceTitle: string }[]);

  return (
    <CalendarResource
      onNavigate={onNavigate}
      onViewChange={setView}
      events={events ?? []}
      resources={resources}
      eventResources={{
        cabinetsMap,
        patientsMap,
        usersMap,
        assistantMap,
      }}
    />
  );
};
