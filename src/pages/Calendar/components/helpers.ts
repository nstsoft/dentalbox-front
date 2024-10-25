import { TFunction } from "i18next";
import { AppointmentStatus } from "@types";

export const getPersonNames = (person?: {
  surname: string;
  name: string;
  secondName: string;
}) => {
  if (!person) return "";
  return `${person.surname} ${person.name
    .slice(0, 1)
    .toUpperCase()}.${person.secondName.slice(0, 1).toUpperCase()}.`;
};

export const getCalendarMessages = (t: TFunction) => {
  return {
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
};

export const EventColors = {
  [AppointmentStatus.pending]: "#FFA500",
  [AppointmentStatus.awaiting]: "#17A2B8",
  [AppointmentStatus.confirmed]: "#28A745",
  [AppointmentStatus.in_cabinet]: "#FFC107",
  [AppointmentStatus.finished]: "#6C757D",
};
