import { AppointmentListItem } from "@types";
import { type Dispatch, type SetStateAction } from "react";
import { CalendarProps } from "react-big-calendar";

export type Props = {
  events: CalendarProps<AppointmentListItem>["events"];
  resources: CalendarProps["resources"];
  onViewChange: Dispatch<SetStateAction<"day" | "week">>;
  onNavigate: CalendarProps["onNavigate"];
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
