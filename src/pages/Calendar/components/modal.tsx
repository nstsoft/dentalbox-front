import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { type FC } from "react";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PersonIcon from "@mui/icons-material/Person";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import CabinIcon from "@mui/icons-material/Cabin";
import Typography from "@mui/material/Typography";
import { AppointmentListItem } from "@types";
import moment from "moment";

type CalendarModalProps = {
  open: boolean;
  event?: AppointmentListItem;
  mode?: string;
  onClose: () => void;
  onUpdate?: () => void;
};

export const CalenderModal: FC<CalendarModalProps> = ({
  open,
  event,
  onClose,
  onUpdate,
  mode,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        //   onSubmit={submitFormHandler}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          maxHeight: "90vh",
          bgcolor: "background.paper",
          overflow: "auto",
          boxShadow: 24,
          borderRadius: "8px",
          p: 2,
        }}
      >
        <Box>
          <Box>
            <Typography variant="h5">{event?.title}</Typography>
            <Typography variant="body1">
              {moment(event?.start).format("dddd")},{" "}
              {moment(event?.start).format("D MMMM")}:{""}
              {moment(event?.start).format("HH:MM")} -{" "}
              {moment(event?.end).format("HH:MM")}
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", gap: "10px", p: 1 }}
          >
            <MedicalServicesIcon />
            <Typography variant="body2">
              {event?.doctor.name} {event?.doctor.surname}
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", gap: "10px", p: 1 }}
          >
            <CabinIcon />
            <Typography variant="body2">{event?.cabinet.name}</Typography>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", gap: "10px", p: 1 }}
          >
            <ChairAltIcon />
            <Typography variant="body2">{event?.chair?.name}</Typography>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", gap: "10px", p: 1 }}
          >
            <PersonIcon />
            <Typography variant="body2">
              {event?.patient.name} {event?.patient.surname}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
