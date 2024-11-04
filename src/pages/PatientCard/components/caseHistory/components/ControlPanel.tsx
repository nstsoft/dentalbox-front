import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { type FC, type Dispatch, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { CaseHistoryModal } from "./CaseHistoryModal";
import type { HistoryData, FileWithDescription } from "@types";

type Props = {
  dateFilter: { to?: Dayjs; from?: Dayjs };
  setDateFilter: (dateFilter: { to?: Dayjs; from?: Dayjs }) => void;
  apply: () => void;
  historyItem: Partial<HistoryData>;
  setHistoryData: (data: Partial<HistoryData>) => void;
  onSubmitCreate: () => void;
  files: FileWithDescription[];
  setFiles: Dispatch<SetStateAction<FileWithDescription[]>>;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

export const ControlPanel: FC<Props> = ({
  dateFilter,
  setDateFilter,
  apply,
  historyItem,
  setHistoryData,
  onSubmitCreate,
  files,
  setFiles,
  isOpen,
  setIsOpen,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard.history" });

  return (
    <Box className="case-history-control-panel">
      <CaseHistoryModal
        data={historyItem}
        open={isOpen}
        onSubmit={onSubmitCreate}
        onClose={() => setIsOpen(false)}
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
          <Button onClick={apply}>{t("filter")}</Button>
        </Box>
      </Box>
    </Box>
  );
};
