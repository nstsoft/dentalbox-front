import { User } from "@types";
import { type FC, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import days from "dayjs";
import {
  Box,
  Button,
  CardMedia,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import AvatarImage from "@images/patient-avatar.jpg";
import { InfoCard } from "@components";
import EditIcon from "@mui/icons-material/Edit";
import { VisuallyHiddenInput } from "@elements";

type Props = {
  user: User;
  setUser: (user: Partial<User>) => void;
  isDataChanged: boolean;
  onUpload: (file: File) => void;
  setIsDataChanged: (val: boolean) => void;
  onSubmit: () => void;
  errors: {
    [key in keyof User]?: string;
  };
};

export const UserInfo: FC<Props> = ({
  user,
  setUser,
  isDataChanged,
  onUpload,
  setIsDataChanged,
  onSubmit,
  errors,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { t } = useTranslation("", { keyPrefix: "pages.profile" });
  const [cacheDate, setCacheDate] = useState(days());

  const renderEditModeInputs = () => {
    const props = ["surname", "name", "secondName", "email"] as (keyof User)[];

    return (
      <Box className="edit-mode-props">
        {props.map((prop) => (
          <Fragment key={prop}>
            <TextField
              error={!user[prop] || !!errors?.[prop]}
              label={t(prop)}
              variant="standard"
              value={user[prop]}
              onChange={(e) => {
                setUser({ [prop]: e.target.value });
                setIsDataChanged(true);
              }}
              disabled={prop === "email"}
            />
            <FormHelperText error={!!errors?.[prop]}>
              {errors?.[prop]}
            </FormHelperText>
          </Fragment>
        ))}

        <MuiTelInput
          value={user.phone}
          onChange={(phone: string) => {
            setIsDataChanged(true);
            setUser({ phone });
          }}
          variant="filled"
          error={!user.phone || !!errors?.phone}
          placeholder={t("phone")}
          color={!user.phone || !!errors?.phone ? "error" : "primary"}
        />
        <FormHelperText error={!!errors?.phone}>{errors?.phone}</FormHelperText>
      </Box>
    );
  };

  const renderViewMode = () => {
    return (
      <Box className="view-mode-props">
        <Box className="info-block-item">
          <Typography variant="h4">{user.surname}</Typography>
        </Box>
        <Box className="info-block-item">
          <Typography variant="h5" mr={2}>
            {user.name}
          </Typography>
          <Typography variant="h5">{user.secondName}</Typography>
        </Box>
        <Box className="info-block-item">
          <Typography color="primary" variant="body1" mr={2}>
            {user.phone}
          </Typography>
        </Box>
        <Box className="info-block-item">
          <Typography variant="body1" mr={2}>
            {user.email}
          </Typography>
        </Box>
      </Box>
    );
  };

  const getAvatar = () => {
    if (!user.image) return AvatarImage;
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (urlPattern.test(user?.image)) {
      return `${user.image}?${cacheDate.format("YYYYMMDDHHmmss")}`;
    }
    return user.image;
  };

  return (
    <InfoCard
      className="profile-main-info-card"
      onSubmit={onSubmit}
      buttonLabel={t("save", { keyPrefix: "buttons" })}
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
      disabledButton={!isDataChanged}
    >
      <Box className="image-block">
        <Box>
          <CardMedia
            className="media-card"
            component="img"
            image={getAvatar()}
            alt={user.surname}
          />
          {isEditMode && (
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                p: 0,
                minWidth: "30px",
              }}
            >
              <EditIcon />
              <VisuallyHiddenInput
                id="userImage"
                name="userImage"
                type="file"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    onUpload?.(file);
                    reader.onloadend = () => {
                      setUser({ image: `${reader.result}` });
                      setCacheDate(days());
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </Button>
          )}
        </Box>
      </Box>
      <Box className={"info-block" + (isEditMode ? " edit-mode" : "")}>
        {isEditMode ? renderEditModeInputs() : renderViewMode()}
      </Box>
    </InfoCard>
  );
};
