import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { type FC, type Dispatch, type SetStateAction, useState } from "react";
import { Sex, type User } from "@types";
import days, { type Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import { InfoCard } from "@components";
import InputLabel from "@mui/material/InputLabel";
import { DatePicker } from "@mui/x-date-pickers";
import { Android12Switch } from "@elements";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

type Props = {
  user: User;
  setUser: (user: Partial<User>) => void;
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
  const [enableNotifications, setEnableNotifications] = useState(
    user?.enableNotifications ?? false
  );

  const renderEditModeInputs = () => {
    return (
      <>
        <Box>
          <TextField
            fullWidth
            label={t("address")}
            variant="standard"
            value={user.address}
            onChange={(e) => {
              setIsDataChanged(true);
              setUser({ ...user, address: e.target.value });
            }}
          />
        </Box>

        <Box>
          <InputLabel id="radio-label">{t("dob")}</InputLabel>
          <DatePicker
            value={user.dob ? days(user.dob) : null}
            onChange={(newValue: Dayjs | null) => {
              setIsDataChanged(true);
              setUser({ ...user, dob: newValue?.toString() ?? "" });
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

        <Box>
          <InputLabel id="radio-label">{t("sex")}</InputLabel>
          <Select
            fullWidth
            sx={{ height: "40px" }}
            labelId="radio-label"
            value={user.sex}
            variant="outlined"
            onChange={({ target }) => {
              setIsDataChanged(true);
              setUser({ ...user, sex: target.value as Sex });
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
      </>
    );
  };

  const renderViewMode = () => {
    return (
      <>
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
        <Box className="secondary-info-item">
          <Typography variant="body1">{t("sex")}</Typography>
          <Typography variant="h6">{t(`sexItems.${user.sex}`)}</Typography>
        </Box>
      </>
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
        <Box className="view-mode-props">
          {isEditMode ? renderEditModeInputs() : renderViewMode()}
          <Box className="secondary-info-item">
            <Typography className="metadata-item-title" variant="body1">
              {t("notifications")}
            </Typography>

            <Android12Switch
              className="metadata-item-value"
              checked={enableNotifications}
              onChange={({ target }) => {
                setEnableNotifications(target.checked);
                setUser({ ...user, enableNotifications: target.checked });
              }}
              disabled={!isEditMode}
            />
          </Box>
        </Box>
      </Box>
    </InfoCard>
  );
};
