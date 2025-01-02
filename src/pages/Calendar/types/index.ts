import {
  AppointmentListItem,
  CabinetSummaryListItem,
  PatientSummaryListItem,
  UserSummaryListItem,
  AppointmentStatus,
} from "@types";
import { type Dispatch, type SetStateAction } from "react";
import { CalendarProps } from "react-big-calendar";
import { type Dayjs } from "dayjs";

export type AppointmentResources = {
  cabinetsMap: Map<string, CabinetSummaryListItem>;
  usersMap: Map<string, UserSummaryListItem>;
  patientsMap: Map<string, PatientSummaryListItem>;
  assistantMap: Map<string, UserSummaryListItem>;
};

export type Props = {
  events: AppointmentListItem[];
  resources: CalendarProps["resources"];
  onViewChange: Dispatch<SetStateAction<"day" | "week">>;
  onNavigate: CalendarProps["onNavigate"];
  eventResources: AppointmentResources;
};

type DefaultObject = {
  image: string;
  name: string;
  _id: string;
};

type PersonData = {
  email: string;
  name: string;
  phone: string;
  secondName: string;
  surname: string;
  _id: string;
};

export type CalendarEvent = {
  cabinet: DefaultObject;
  chair: DefaultObject;
  doctor: PersonData;
  assistant?: PersonData;
  end: Date;
  id: string;
  notes?: string;
  patient: PersonData;
  resourceId: string;
  start: Date;
  title: string;
  workspace: string;
  _id: string;
};

export type EditableProps = (
  | "patient"
  | "doctor"
  | "cabinet"
  | "chair"
  | "start"
  | "end"
  | "status"
)[];

export type UpdateEventHandler = (
  data: Partial<{
    [key in keyof Omit<CalendarEvent, "start" | "end">]: string;
  }> & {
    start?: Dayjs;
    end?: Dayjs;
    approved?: boolean;
    status?: AppointmentStatus;
  }
) => void;
