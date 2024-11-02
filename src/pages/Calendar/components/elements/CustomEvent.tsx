import { type EventProps } from "react-big-calendar";
import { AppointmentEventListItem } from "@types";
import { getPersonNames } from "../helpers";
import { GiNurseFemale } from "react-icons/gi";
import { SvgIcon, Typography } from "@mui/material";

export const CustomEvent = (el: EventProps<object>) => {
  const event = el.event as AppointmentEventListItem;
  return (
    <div className="custom-event-container" style={{ padding: 0 }}>
      <div className="doctor-block">
        {event.doctor.image && (
          <img
            className="doctor-image"
            src={event.doctor.image}
            alt={event.doctor.name}
          />
        )}
        <Typography variant="body1">{getPersonNames(event.doctor)}</Typography>
      </div>
      <Typography variant="body1" mt={1}>
        {getPersonNames(event.patient)}
      </Typography>
      {event.assistant && (
        <Typography variant="body1" mt={1}>
          <SvgIcon>
            <GiNurseFemale />
          </SvgIcon>
          : {getPersonNames(event.assistant)}
        </Typography>
      )}

      <p className="note">{event.notes}</p>
    </div>
  );
};
