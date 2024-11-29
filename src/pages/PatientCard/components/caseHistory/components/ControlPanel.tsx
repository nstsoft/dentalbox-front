import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { type FC, type Dispatch, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { CaseHistoryModal } from "./CaseHistoryModal";
import type { HistoryData, FileWithDescription, PatientFile } from "@types";
import days from "dayjs";
import { isMobile } from "react-device-detect";
import { ChipInput } from "./ChipInput";

type Props = {
  dateFilter: { to?: Dayjs | null; from?: Dayjs | null };
  setDateFilter: (dateFilter: {
    to?: Dayjs | null;
    from?: Dayjs | null;
  }) => void;
  resetFilters: () => void;
  toothsFilter: string[];
  setToothsFilter: Dispatch<SetStateAction<string[]>>;
  selectedHistoryItem: Partial<HistoryData & { selectedFiles?: PatientFile[] }>;
  setHistoryData: (data: Partial<HistoryData>) => void;
  onSubmitModal: () => void;
  files: FileWithDescription[];
  setFiles: Dispatch<SetStateAction<FileWithDescription[]>>;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onCloseModal: () => void;
  isDataEmpty: boolean;
};

export const ControlPanel: FC<Props> = ({
  dateFilter,
  setDateFilter,
  toothsFilter,
  setToothsFilter,
  resetFilters,
  selectedHistoryItem,
  setHistoryData,
  onSubmitModal,
  files,
  setFiles,
  isOpen,
  setIsOpen,
  onCloseModal,
  isDataEmpty,
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
      <Box className={`case-history-control-segment ${isDataEmpty && "empty"}`}>
        <Button onClick={() => setIsOpen(true)} variant="contained">
          {t("addItem")}
        </Button>
      </Box>
      {!isDataEmpty && (
        <Box
          className={`case-history-control-segment filter ${
            isMobile ? "mobile" : ""
          }`}
        >
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
          <ChipInput
            value={toothsFilter || []}
            onEnter={(tooth) => setToothsFilter([...toothsFilter, tooth])}
            onDelete={(tooth) =>
              setToothsFilter(toothsFilter.filter((t) => t !== tooth))
            }
            sx={{ mt: 2 }}
          />
          <Box className="item">
            <Button onClick={resetFilters}>
              {t("reset", { keyPrefix: "buttons" })}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
