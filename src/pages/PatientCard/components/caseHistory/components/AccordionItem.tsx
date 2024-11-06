import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { type FC } from "react";
import type { HistoryResponse } from "@types";
import days from "dayjs";
import { useTranslation } from "react-i18next";
import { IconButton } from "@elements";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Files } from "@components";

type Props = {
  item: HistoryResponse;
  onEdit: (item: HistoryResponse) => void;
  onSelectDeleteItem: (id: string) => void;
};

export const AccordionItem: FC<Props> = ({
  item,
  onEdit,
  onSelectDeleteItem,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard.history" });
  return (
    <Accordion className="history-accordion-item">
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {days(item.date).format("YYYY MMMM DD")}
      </AccordionSummary>
      <AccordionDetails>
        <Box className="history-accordion-header">
          <Typography>{days(item.date).format("YYYY MMMM DD")}</Typography>
          <IconButton onClick={() => onEdit(item)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onSelectDeleteItem(item._id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <Box className="history-accordion-container">
          <Typography color="primary" variant="h6">
            {t("complaints")}
          </Typography>
          <Typography>{item.complaints}</Typography>
        </Box>
        <Box className="history-accordion-container">
          <Typography color="primary" variant="h6">
            {t("anamnesis")}
          </Typography>
          <Typography>{item.anamnesis}</Typography>
        </Box>
        <Box className="history-accordion-container">
          <Typography color="primary" variant="h6">
            {t("objectiveData")}
          </Typography>
          <Typography>{item.objectiveData}</Typography>
        </Box>
        <Box className="history-accordion-container">
          <Typography color="primary" variant="h6">
            {t("diagnosis")}
          </Typography>
          <Typography>{item.diagnosis}</Typography>
        </Box>
        <Box className="history-accordion-container">
          <Typography color="primary" variant="h6">
            {t("treatment")}
          </Typography>
          <Typography>{item.treatment}</Typography>
        </Box>
        <Box className="history-accordion-container">
          <Typography color="primary" variant="h6">
            {t("materials")}
          </Typography>
          <Typography>{item.materials}</Typography>
        </Box>
        <Box className="history-accordion-container">
          <Typography color="primary" variant="h6">
            {t("anesthesia")}
          </Typography>
          <Typography>{item.anesthesia}</Typography>
        </Box>
        <Divider sx={{ m: 3 }} />
        <Box className="history-accordion-files-container">
          <Typography variant="h6">{t("files")}</Typography>
          <Files files={item.files} />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
