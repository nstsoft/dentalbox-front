export enum AppointmentStatus {
  pending = "pending",
  confirmed = "confirmed",
  awaiting = "awaiting",
  in_cabinet = "in_cabinet",
  finished = "finished",
}

export type Appointment = {
  _id: string;
  start: string | Date;
  end: string | Date;
  workspace: string;
  patient: string;
  doctor: string;
  assistant?: string;
  cabinet: string;
  chair?: string;
  notes?: string;
  title?: string;
  status: AppointmentStatus;
};

export type UpsertAppointmentElement = {
  _id?: string;
  start: Date | string;
  end: Date | string;
  patient: string;
  doctor: string;
  cabinet: string;
  chair?: string;
  assistant?: string;
  notes?: string;
  status?: AppointmentStatus;
};

type Person = {
  _id: string;
  name: string;
  surname: string;
  secondName: string;
  email: string;
  phone: string;
  image?: string;
};

export type AppointmentListItem = Omit<
  Appointment,
  "patient" | "doctor" | "cabinet" | "chair" | "assistant"
> & {
  patient: Person;
  doctor: Person;
  assistant?: Person;
  cabinet: { _id: string; name: string; image?: string };
  chair?: { _id: string; name: string };
};

export type AppointmentEventListItem = AppointmentListItem & {
  id: string;
  title: string;
  resourceId: string;
};

export type AppointmentListQuery = {
  start: string;
  end: string;
  patient?: string[];
  doctor?: string[];
  cabinet?: string[];
  assistant?: string[];
};
