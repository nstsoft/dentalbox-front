import { ToothColorBox } from "@components";
import { Card } from "@elements";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { WorkspaceMetadata } from "@types";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  metadata?: WorkspaceMetadata;
};

export const MetadataInfo: FC<Props> = ({ metadata }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.workspace" });

  return (
    <Card sx={{ margin: 0, width: "100%", position: "relative", gap: 0 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="h6">{t("currency")}</Typography>
        <Typography variant="body1">{metadata?.currency}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="h6">{t("workingHours")}</Typography>
        <Typography variant="body1">
          {metadata?.workingHours.start} - {metadata?.workingHours.end}
        </Typography>
      </Box>
      <ToothColorBox dentalMapColors={metadata?.dentalMapColors} isEditable />
    </Card>
  );
};
