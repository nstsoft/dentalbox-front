import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { GrNote } from "react-icons/gr";
import { SvgIcon } from "@mui/material";

type Props = {
  notes: string;
  setNotes: (notes: string) => void;
  isEditingMode: boolean;
};
const sx = { display: "flex", alignItems: "center", gap: "10px", p: 1 };

export const AppointmentNoteInput: FC<Props> = ({
  isEditingMode,
  notes,
  setNotes,
}) => {
  if (!isEditingMode) {
    return (
      <Box sx={sx}>
        <Typography>
          <SvgIcon>
            <GrNote />
          </SvgIcon>
        </Typography>
        <Typography variant="body1">{notes}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={sx}>
      <Typography>
        <SvgIcon>
          <GrNote />
        </SvgIcon>
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </Box>
  );
};
