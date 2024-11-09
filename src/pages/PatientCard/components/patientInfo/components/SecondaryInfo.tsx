import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { type FC, type Dispatch, type SetStateAction, useState } from "react";
import { type Patient, Sex } from "@types";
import days, { type Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import { InfoCard } from "@components";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { DatePicker } from "@mui/x-date-pickers";

type Props = {
  patient: Patient;
  setPatient: Dispatch<SetStateAction<Patient | undefined>>;
  isDataChanged: boolean;
  setIsDataChanged: (val: boolean) => void;
  onSubmit: () => void;
  errors: {
    [key in keyof Patient]?: string;
  };
  setBirthDateError: Dispatch<SetStateAction<string | undefined>>;
};

export const SecondaryInfo: FC<Props> = ({
  patient,
  setPatient,
  isDataChanged,
  setIsDataChanged,
  onSubmit,
  errors,
  setBirthDateError,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard" });

  const renderEditModeInputs = () => {
    return (
      <Box className="edit-mode-props">
        <TextField
          label={t("address")}
          variant="standard"
          value={patient.address}
          onChange={(e) => {
            setIsDataChanged(true);
            setPatient((prev) => prev && { ...prev, address: e.target.value });
          }}
        />

        <InputLabel id="radio-label">{t("sex")}</InputLabel>
        <Select
          sx={{ height: "40px", width: "150px" }}
          labelId="radio-label"
          value={patient.sex}
          variant="outlined"
          onChange={({ target }) => {
            setIsDataChanged(true);
            setPatient((prev) => prev && { ...prev, sex: target.value as Sex });
          }}
          required
        >
          {Object.keys(Sex).map((item) => (
            <MenuItem key={item} value={item}>
              <ListItemText primary={t(`sexItems.${item}`)} sx={{ m: 0 }} />
            </MenuItem>
          ))}
        </Select>
        <InputLabel id="radio-label">{t("dob")}</InputLabel>
        <DatePicker
          value={patient.dob ? days(patient.dob) : null}
          onChange={(newValue: Dayjs | null) => {
            setIsDataChanged(true);
            setPatient(
              (prev) =>
                prev && {
                  ...prev,
                  dob: newValue?.toString() ?? "",
                }
            );
          }}
          disableFuture
          onError={(err) => setBirthDateError(err?.toString())}
          sx={{
            "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, & .Mui-focused .MuiOutlinedInput-notchedOutline":
              { borderColor: errors.dob ? "red" : "none" },
          }}
        />
      </Box>
    );
  };

  const renderViewMode = () => {
    return (
      <Box className="view-mode-props">
        <Box className="secondary-info-item">
          <Typography variant="body1">{t("address")}</Typography>
          <Typography variant="h6">{patient.address}</Typography>
        </Box>
        <Box className="secondary-info-item">
          <Typography variant="body1">{t("sex")}</Typography>
          <Typography variant="h6">{t(`sexItems.${patient.sex}`)}</Typography>
        </Box>
        <Box className="secondary-info-item">
          <Typography variant="body1">{t("dob")}</Typography>
          <Typography variant="h6">
            {days(patient.dob).format("DD.MM.YYYY")}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <InfoCard
      className="patient-secondary-info-card"
      onSubmit={onSubmit}
      buttonLabel={t("save", { keyPrefix: "buttons" })}
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
      disabledButton={!isDataChanged}
    >
      <Box className={"info-block" + (isEditMode ? " edit-mode" : "")}>
        {isEditMode ? renderEditModeInputs() : renderViewMode()}
      </Box>
    </InfoCard>
  );
};
