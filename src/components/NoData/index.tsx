import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NoDataFound from "@images/noDataFound.png";
import { useTranslation } from "react-i18next";

export const NoData = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pt: 2,
      }}
    >
      <img src={NoDataFound} />
      <Typography variant="h4">{t("noDataFound")}</Typography>
    </Box>
  );
};
