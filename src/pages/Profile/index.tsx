import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ProfileInfo } from "./components";

export const ProfilePage = () => {
  const { t } = useTranslation("", { keyPrefix: "pages.profile" });

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {t("profile")}
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 1, flexFlow: "row wrap" }}>
        <ProfileInfo />
      </Box>
    </Box>
  );
};
