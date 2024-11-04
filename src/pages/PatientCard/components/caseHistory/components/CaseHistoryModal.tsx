import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { CustomModal } from "@elements";
import { type FC, type Dispatch, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { HistoryData } from "@types";
import { Textarea } from "@elements";
import { isMobile } from "react-device-detect";
import { MultipleFileUploadWithDescriptions } from "./FileInput";
import type { FileWithDescription, PatientFile } from "@types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: HistoryData) => void;
  setHistoryData: (
    data: Partial<HistoryData & { selectedFiles?: PatientFile[] }>
  ) => void;
  data: HistoryData & { selectedFiles?: PatientFile[] };
  files: FileWithDescription[];
  setFiles: Dispatch<SetStateAction<FileWithDescription[]>>;
};

export const CaseHistoryModal: FC<Props> = ({
  open,
  onClose,
  onSubmit,
  data,
  setHistoryData,
  files,
  setFiles,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard.history" });

  return (
    <CustomModal
      sx={{
        minWidth: "300px",
        maxWidth: isMobile ? "100%" : "700px",
        width: isMobile ? "100%" : "auto",
        maxHeight: "95vh",
      }}
      open={open}
      onClose={onClose}
    >
      <Box className="history-modal">
        <Box>
          <Textarea
            placeholder={t("complaints")}
            className="input"
            value={data?.complaints}
            onChange={(e) => setHistoryData({ complaints: e.target.value })}
          />
          <Textarea
            minRows={3}
            placeholder={t("anamnesis")}
            className="input"
            value={data?.anamnesis}
            onChange={(e) => setHistoryData({ anamnesis: e.target.value })}
          />
          <Textarea
            minRows={3}
            placeholder={t("objectiveData")}
            className="input"
            value={data?.objectiveData}
            onChange={(e) => setHistoryData({ objectiveData: e.target.value })}
          />
          <Textarea
            minRows={1}
            placeholder={t("diagnosis")}
            className="input"
            value={data?.diagnosis}
            onChange={(e) => setHistoryData({ diagnosis: e.target.value })}
          />
          <Textarea
            minRows={3}
            placeholder={t("treatment")}
            className="input"
            value={data?.treatment}
            onChange={(e) => setHistoryData({ treatment: e.target.value })}
          />
          <Textarea
            minRows={1}
            placeholder={t("anesthesia")}
            className="input"
            value={data?.anesthesia}
            onChange={(e) => setHistoryData({ anesthesia: e.target.value })}
          />
          <Textarea
            placeholder={t("materials")}
            className="input"
            value={data?.materials}
            onChange={(e) => setHistoryData({ materials: e.target.value })}
          />

          <MultipleFileUploadWithDescriptions
            files={files}
            selectedFiles={data.selectedFiles}
            setFiles={setFiles}
            removeSelectedFile={(id: string) => {
              setHistoryData({
                selectedFiles: data.selectedFiles?.filter((f) => f._id !== id),
              });
            }}
          />
        </Box>

        <Box mt={2}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() => onSubmit(data)}
          >
            {t(data._id ? "submit" : "add", { keyPrefix: "buttons" })}
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};
