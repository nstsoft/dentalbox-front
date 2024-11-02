import { CalendarResource } from "./components";
import days from "dayjs";
import {
  useGetAppointmentsQuery,
  useGetCabinetSummaryQuery,
  useGetPatientSummaryQuery,
  useGetUserSummaryQuery,
  useGetChairSummaryQuery,
} from "@api";
import { useState, useEffect } from "react";
import {
  CabinetSummaryListItem,
  PatientSummaryListItem,
  UserSummaryListItem,
  ChairSummaryListItem,
  AppointmentEventListItem,
} from "@types";

export const CalendarPage = () => {
  const { data: cabinetSummary } = useGetCabinetSummaryQuery();
  const { data: patientSummary } = useGetPatientSummaryQuery();
  const { data: userSummary } = useGetUserSummaryQuery();
  const { data: chairSummary } = useGetChairSummaryQuery();

  const [view, setView] = useState<"day" | "week">("day");
  const [date, setDate] = useState(days());

  const { data, refetch } = useGetAppointmentsQuery({
    start: date.startOf(view).toISOString(),
    end: date.endOf(view).toISOString(),
  });

  useEffect(() => {
    refetch();
  }, [date, refetch, view]);

  if (!cabinetSummary || !patientSummary || !userSummary || !chairSummary) {
    return null;
  }

  const cabinetsMap = new Map<string, CabinetSummaryListItem>();
  const chairsMap = new Map<string, ChairSummaryListItem>();
  const usersMap = new Map<string, UserSummaryListItem>();
  const patientsMap = new Map<string, PatientSummaryListItem>();
  const assistantMap = new Map<string, UserSummaryListItem>();

  cabinetSummary.map((cabinet) => cabinetsMap.set(cabinet._id, cabinet));
  chairSummary.map((chair) => chairsMap.set(chair._id, chair));
  userSummary.map((user) => {
    usersMap.set(user._id, user);
    assistantMap.set(user._id, user);
  });
  patientSummary.map((patient) => patientsMap.set(patient._id, patient));

  const onNavigate = (newDate: Date) => {
    setDate(days(newDate));
  };

  const events: AppointmentEventListItem[] = (data ?? []).map(
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
      chair: chairsMap.get(appointment.chair ?? ""),
      assistant: assistantMap.get(appointment?.assistant ?? ""),
    })
  );

  const resources = cabinetSummary.reduce((acc, { _id, name }) => {
    const chairs = chairSummary.filter((chair) => chair.cabinet === _id);
    if (!chairs.length) {
      return [...acc, { resourceId: _id, resourceTitle: name }];
    }
    return [
      ...acc,
      ...chairs.map(({ _id: chairId, name: chairName }) => ({
        resourceId: _id + "_" + chairId,
        resourceTitle: `${name} - ${chairName}`,
      })),
    ];
  }, [] as { resourceId: string; resourceTitle: string }[]);

  return (
    <div>
      <CalendarResource
        onNavigate={onNavigate}
        onViewChange={setView}
        events={events ?? []}
        resources={resources}
        eventResources={{
          cabinetsMap,
          patientsMap,
          usersMap,
          chairsMap,
          assistantMap,
        }}
      />
    </div>
  );
};
