import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { type FC, type Dispatch, type SetStateAction, useState } from "react";
import { type User } from "@types";
import days, { type Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import { InfoCard } from "@components";
import InputLabel from "@mui/material/InputLabel";
import { DatePicker } from "@mui/x-date-pickers";

type Props = {
  user: User;
  setUser: Dispatch<SetStateAction<User | null>>;
  isDataChanged: boolean;
  setIsDataChanged: (val: boolean) => void;
  onSubmit: () => void;
  errors: {
    [key in keyof User]?: string;
  };
  setDobError: Dispatch<SetStateAction<string | undefined>>;
};

export const SecondaryInfo: FC<Props> = ({
  user,
  setUser,
  isDataChanged,
  setIsDataChanged,
  onSubmit,
  errors,
  setDobError,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { t } = useTranslation("", { keyPrefix: "pages.profile" });

  const renderEditModeInputs = () => {
    return (
      <Box className="edit-mode-props">
        <Box>
          <TextField
            fullWidth
            label={t("address")}
            variant="standard"
            value={user.address}
            onChange={(e) => {
              setIsDataChanged(true);
              setUser((prev) => prev && { ...prev, address: e.target.value });
            }}
          />
        </Box>

        <Box>
          <InputLabel id="radio-label">{t("dob")}</InputLabel>
          <DatePicker
            value={user.dob ? days(user.dob) : null}
            onChange={(newValue: Dayjs | null) => {
              setIsDataChanged(true);
              setUser(
                (prev) =>
                  prev && {
                    ...prev,
                    dob: newValue?.toString() ?? "",
                  }
              );
            }}
            disableFuture
            onError={(err) => setDobError(err?.toString())}
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

  const renderViewMode = () => {
    return (
      <Box className="view-mode-props">
        <Box className="secondary-info-item">
          <Typography variant="body1">{t("address")}</Typography>
          <Typography variant="h6">{user.address}</Typography>
        </Box>
        <Box className="secondary-info-item">
          <Typography variant="body1">{t("dob")}</Typography>
          <Typography variant="h6">
            {days(user.dob).format("DD.MM.YYYY")}
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
