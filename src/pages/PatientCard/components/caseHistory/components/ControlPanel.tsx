import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CustomModal } from "@elements";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import days, { Dayjs } from "dayjs";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  dateFilter: { to?: Dayjs; from?: Dayjs };
  setDateFilter: (dateFilter: { to?: Dayjs; from?: Dayjs }) => void;
  apply: () => void;
};

export const ControlPanel: FC<Props> = ({
  dateFilter,
  setDateFilter,
  apply,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard.history" });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box className="case-history-control-panel">
      <CustomModal open={isOpen} onClose={() => setIsOpen(false)}>
        <Box>dckremc,rmcrekcnmrk cnrm</Box>
      </CustomModal>
      <Box className="case-history-control-segment">
        <Button variant="contained">{t("addItem")}</Button>
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
