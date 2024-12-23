import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

export const EmptyData: FC = () => {
  const { t } = useTranslation("", { keyPrefix: "pages.calendar.empty" });

  return (
    <Box className="empty">
      <EventBusyIcon className="empty-icon" width={50} height={50} />
      <Typography variant="h5">{t("title")}</Typography>
      <Typography variant="body1">{t("description")}</Typography>
    </Box>
  );
};
