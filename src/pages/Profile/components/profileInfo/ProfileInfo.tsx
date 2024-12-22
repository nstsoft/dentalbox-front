import { useAuth } from "@hooks";
import Box from "@mui/material/Box";
import { NewPassword, UserInfo } from "./components";
import { useState } from "react";
import { matchIsValidTel } from "mui-tel-input";
import days from "dayjs";
import { validateLogin } from "@utils";
import { SecondaryInfo } from "./components/SecondaryInfo";
import { Notes } from "@components";
import { useTranslation } from "react-i18next";
import { User } from "@types";

import "./styles.scss";

export const ProfileInfo = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(user);
  const [emailError, setEmailError] = useState<string>();
  const [phoneError, setPhoneError] = useState<string>();
  const [dobError, setDobError] = useState<string>();
  const [userImage, setUserImage] = useState<File>();
  const { t } = useTranslation("", { keyPrefix: "pages.profile" });

  const [isDataChanged, setIsDataChanged] = useState({
    primary: false,
    secondary: false,
  });

  const validateForm = () => {
    if (!userData) return;
    setPhoneError(undefined);
    setDobError(undefined);
    setEmailError(undefined);

    if (!matchIsValidTel(userData.phone)) {
      setPhoneError("Please enter a valid phone number.");
      return false;
    }

    if (userData.dob && !days(userData.dob).isValid()) {
      setDobError("Please enter valid date.");
      return false;
    }

    if (!validateLogin(userData.email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const onEditUserInfo = () => {
    if (!userData) return;
    const isFormValid = validateForm();
    if (!isFormValid) return;

    const data = userData;
    if (userData.dob) {
      data.dob = days(data.dob).toISOString();
    }
    if (userData.phone) {
      data.phone = data.phone.replace(/\s+/g, "");
    }
  };

  const userUpdateHandler = (user: Partial<User>) => {
    setUserData((prev) => ({ ...prev, ...user } as User));
  };

  if (!userData) return null;

  return (
    <Box className="profile-info-section-wrapper">
      <Box className="wrapper-item main">
        <UserInfo
          user={userData}
          setUser={userUpdateHandler}
          isDataChanged={isDataChanged.primary}
          setIsDataChanged={(primary) =>
            setIsDataChanged((prev) => ({ ...prev, primary }))
          }
          errors={{ email: emailError, phone: phoneError }}
          onSubmit={onEditUserInfo}
          onUpload={(file: File) => {
            setIsDataChanged((prev) => ({ ...prev, primary: true }));
            setUserImage(file);
          }}
        />
      </Box>
      <Box className="wrapper-item secondary">
        <SecondaryInfo
          errors={{ dob: dobError }}
          user={userData}
          setUser={userUpdateHandler}
          isDataChanged={isDataChanged.secondary}
          setIsDataChanged={(secondary) =>
            setIsDataChanged((prev) => ({ ...prev, secondary }))
          }
          onSubmit={onEditUserInfo}
          setDobError={setDobError}
        />
        <Notes
          value={user?.notes ?? ""}
          setValue={(value) => setUserData({ ...userData, notes: value })}
          label={t("notes")}
          onConfirm={() => {}}
        />
      </Box>
      <Box className="wrapper-item password">
        <NewPassword onSubmit={() => {}} />
      </Box>
    </Box>
  );
};
