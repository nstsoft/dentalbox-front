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
import LinearProgress from "@mui/material/LinearProgress";
import { useGetMeQuery } from "@api";

import "../style.scss";

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
  const { data: me } = useGetMeQuery();
  console.log(patient);

  const renderEditModeInputs = () => {
    return (
      <Box className="edit-mode-props">
        <Box>
          <TextField
            fullWidth
            label={t("address")}
            variant="standard"
            value={patient.address}
            onChange={(e) => {
              setIsDataChanged(true);
              setPatient(
                (prev) => prev && { ...prev, address: e.target.value }
              );
            }}
          />
        </Box>

        <Box>
          <InputLabel id="radio-label">{t("sex")}</InputLabel>
          <Select
            fullWidth
            sx={{ height: "40px" }}
            labelId="radio-label"
            value={patient.sex}
            variant="outlined"
            onChange={({ target }) => {
              setIsDataChanged(true);
              setPatient(
                (prev) => prev && { ...prev, sex: target.value as Sex }
              );
            }}
            required
          >
            {Object.keys(Sex).map((item) => (
              <MenuItem key={item} value={item}>
                <ListItemText primary={t(`sexItems.${item}`)} sx={{ m: 0 }} />
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box>
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
              width: "100%",
              "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, & .Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: errors.dob ? "red" : "none" },
            }}
          />
        </Box>
      </Box>
    );
  };

  function formatStorage(storage: number) {
    const MB = 1024 * 1024;
    const GB = MB * 1024;

    if (storage < GB) {
      return `${(storage / MB).toFixed(2)} Mb`;
    }
    return `${(storage / GB).toFixed(2)} Gb`;
  }

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
        <Box>
          <Typography gutterBottom variant="body1">
            {t("storage")}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={
              (patient.storage * 100) / (me?.workspace?.patientMaxStorage ?? 1)
            }
          />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t("currentStorage")}: {formatStorage(patient.storage)}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t("maxStorage")}:{" "} 
            {formatStorage(me?.workspace?.patientMaxStorage ?? 0)}
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
