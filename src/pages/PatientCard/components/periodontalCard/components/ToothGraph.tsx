import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { type FC } from "react";

type Props = {
  name: string;
};

export const ToothGraph: FC<Props> = ({ name }) => {
  return (
    <Box className="graph">
      <Typography className="graph-name" variant="h4">
        {name}
      </Typography>
      <Box className="graph-content">TOOTH graph</Box>
    </Box>
  );
};
