import { FaUserDoctor } from "react-icons/fa6";
import { type EventProps } from "react-big-calendar";
import { AppointmentEventListItem } from "@types";
import { getPersonNames } from "../helpers";
import { GiNurseFemale } from "react-icons/gi";
import { SvgIcon } from "@mui/material";

export const CustomEvent = (el: EventProps<object>) => {
  const event = el.event as AppointmentEventListItem;
  return (
    <div className="custom-event-container" style={{ padding: "10px" }}>
      <strong>{getPersonNames(event.patient)}</strong>
      <p className="name" style={{ margin: "0", color: "#555" }}>
        <FaUserDoctor />: {event.doctor.surname}
      </p>
      <p className="name" style={{ margin: "0", color: "#555" }}>
        <SvgIcon>
          <GiNurseFemale />
        </SvgIcon>
        : {event.assistant?.surname}
      </p>
      <p className="note">{event.notes}</p>
    </div>
  );
};
