import { CalendarResource } from "./components";
import moment from "moment/min/moment-with-locales";
import {
  useGetAppointmentsQuery,
  useGetCabinetSummaryQuery,
  useGetPatientSummaryQuery,
  useGetUserSummaryQuery,
  useGetChairSummaryQuery,
} from "@api";
import { useState, useEffect } from "react";

export const CalendarPage = () => {
  const { data: cabinetSummary } = useGetCabinetSummaryQuery();
  const { data: patientSummary } = useGetPatientSummaryQuery();
  const { data: userSummary } = useGetUserSummaryQuery();
  const { data: chairSummary } = useGetChairSummaryQuery();

  const [view, setView] = useState<"day" | "week">("day");
  const [date, setDate] = useState(moment());

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

  const cabinetsMap = new Map();
  const chairsMap = new Map();
  const usersMap = new Map();
  const patientsMap = new Map();

  cabinetSummary.map((cabinet) => cabinetsMap.set(cabinet._id, cabinet));
  chairSummary.map((chair) => chairsMap.set(chair._id, chair));
  userSummary.map((user) => usersMap.set(user._id, user));
  patientSummary.map((patient) => patientsMap.set(patient._id, patient));

  const onNavigate = (newDate: Date) => {
    setDate(moment(newDate));
  };

  const events = (data ?? []).map((appointment) => ({
    ...appointment,
    id: appointment._id,
    title: patientsMap.get(appointment.patient)?.name ?? "",
    start: moment(appointment.start).toDate(),
    end: moment(appointment.end).toDate(),
    resourceId: cabinetsMap.get(appointment.cabinet)?._id ?? "",
    patient: patientsMap.get(appointment.patient),
    cabinet: cabinetsMap.get(appointment.cabinet),
    doctor: usersMap.get(appointment.doctor),
    chair: chairsMap.get(appointment.chair),
  }));

  const resources = cabinetSummary.map(({ _id, name }) => ({
    resourceId: _id,
    resourceTitle: name,
  }));

  return (
    <div>
      <CalendarResource
        onNavigate={onNavigate}
        onViewChange={setView}
        events={events ?? []}
        resources={resources}
      />
    </div>
  );
};
