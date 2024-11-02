import { type FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { useTranslation } from "react-i18next";
import days, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type Props = {
  start: Dayjs;
  end: Dayjs;
  setStart: (date: Dayjs) => void;
  setEnd: (date: Dayjs) => void;
  isEditingMode: boolean;
};

const sx = { display: "flex", alignItems: "center", gap: "10px", p: 1 };

export const AppointmentTimeRangeInput: FC<Props> = ({
  start,
  end,
  setStart,
  setEnd,
  isEditingMode,
}) => {
  const { t } = useTranslation("", { keyPrefix: "buttons" });

  const changeDate = (date: Dayjs | null) => {
    if (!date) return;
    setStart(date.clone().hour(start.hour()).minute(start.minute()));
    setEnd(date.clone().hour(end.hour()).minute(end.minute()));
  };

  if (!isEditingMode) {
    return (
      <Box sx={sx}>
        <Typography>
          <AccessAlarmsIcon />
        </Typography>
        <Typography variant="body1">
          {days(start).format("DD.MM.YYYY/HH:mm")}-{days(end).format("HH:mm")}
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={sx}>
      <DatePicker value={start} onChange={changeDate} label="Select date" />
      <MobileTimePicker
        className="mobile-time-picker"
        value={start}
        ampm={false}
        localeText={{
          cancelButtonLabel: t("cancel"),
          okButtonLabel: t("select"),
        }}
        onChange={(newValue) => setStart(newValue ?? days())}
      />
      -
      <MobileTimePicker
        className="mobile-time-picker"
        value={end}
        ampm={false}
        localeText={{
          cancelButtonLabel: t("cancel"),
          okButtonLabel: t("select"),
        }}
        onChange={(newValue) => setEnd(newValue ?? days())}
      />
    </Box>
  );
};
