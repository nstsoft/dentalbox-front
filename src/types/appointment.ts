export type Appointment = {
  _id: string;
  start: string | Date;
  end: string | Date;
  workspace: string;
  patient: string;
  doctor: string;
  cabinet: string;
  chair?: string;
  notes?: string;
  title?: string;
};

type Person = {
  _id: string;
  name: string;
  surname: string;
  secondName: string;
  email: string;
  phone: string;
};

export type AppointmentListItem = Appointment & {
  patient: Person;
  doctor: Person;
  cabinet: { _id: string; name: string; image?: string };
  chair?: { _id: string; name: string };
};

export type AppointmentEventListItem = AppointmentListItem & {
  id: string;
  title: string;
  // start: Date;
  // end: Date;
  resourceId: string;
};

export type AppointmentListQuery = {
  start: string;
  end: string;
  patient?: string[];
  doctor?: string[];
  cabinet?: string[];
};
