import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { type FC, type Dispatch, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { CaseHistoryModal } from "./CaseHistoryModal";
import type { HistoryData, FileWithDescription, PatientFile } from "@types";
import days from "dayjs";

type Props = {
  dateFilter: { to?: Dayjs | null; from?: Dayjs | null };
  setDateFilter: (dateFilter: {
    to?: Dayjs | null;
    from?: Dayjs | null;
  }) => void;
  resetDates: () => void;
  selectedHistoryItem: Partial<HistoryData & { selectedFiles?: PatientFile[] }>;
  setHistoryData: (data: Partial<HistoryData>) => void;
  onSubmitModal: () => void;
  files: FileWithDescription[];
  setFiles: Dispatch<SetStateAction<FileWithDescription[]>>;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onCloseModal: () => void;
};

export const ControlPanel: FC<Props> = ({
  dateFilter,
  setDateFilter,
  resetDates,
  selectedHistoryItem,
  setHistoryData,
  onSubmitModal,
  files,
  setFiles,
  isOpen,
  setIsOpen,
  onCloseModal,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard.history" });

  return (
    <Box className="case-history-control-panel">
      <CaseHistoryModal
        data={selectedHistoryItem}
        open={isOpen}
        onSubmit={onSubmitModal}
        onClose={onCloseModal}
        setHistoryData={setHistoryData}
        files={files}
        setFiles={setFiles}
      />
      <Box className="case-history-control-segment">
        <Button onClick={() => setIsOpen(true)} variant="contained">
          {t("addItem")}
        </Button>
      </Box>
      <Box className="case-history-control-segment filter">
        <DatePicker
          className="item"
          label={t("from")}
          value={dateFilter.from}
          onChange={(from) => {
            if (!from) return;
            setDateFilter({ from, to: dateFilter.to });
          }}
          maxDate={days().endOf("day")}
        />

        <DatePicker
          className="item"
          value={dateFilter.to}
          onChange={(to) => {
            if (!to) return;
            setDateFilter({ to, from: dateFilter.from });
          }}
          label={t("to")}
        />
        <Box className="item">
          <Button onClick={resetDates}>
            {t("reset", { keyPrefix: "buttons" })}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
