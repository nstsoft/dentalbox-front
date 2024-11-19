import Typography from "@mui/material/Typography";
import { type FC } from "react";

type Props = {
  actionName?: string;
  message?: string;
};

export const Toaster: FC<Props> = ({ actionName, message }) => {
  return (
    <>
      <Typography>{actionName}</Typography>
      <p>{message}</p>
    </>
  );
};
