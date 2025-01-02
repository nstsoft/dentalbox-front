import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { MuiTelInput } from "mui-tel-input";
import {
  type FC,
  type Dispatch,
  type SetStateAction,
  type ChangeEvent,
  useState,
  Fragment,
} from "react";
import type { Patient } from "@types";
import EditIcon from "@mui/icons-material/Edit";
import FormHelperText from "@mui/material/FormHelperText";
import { VisuallyHiddenInput } from "@elements";
import CardMedia from "@mui/material/CardMedia";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import { InfoCard } from "@components";
import AvatarImage from "@images/patient-avatar.jpg";

type Props = {
  patient: Patient;
  setPatient: Dispatch<SetStateAction<Patient | undefined>>;
  isDataChanged: boolean;
  onUpload: (file: File) => void;
  setIsDataChanged: (val: boolean) => void;
  onSubmit: () => void;
  errors: {
    [key in keyof Patient]?: string;
  };
};

export const MainInfo: FC<Props> = ({
  patient,
  setPatient,
  onUpload,
  isDataChanged,
  setIsDataChanged,
  onSubmit,
  errors,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard" });

  const renderEditModeInputs = () => {
    const props = [
      "surname",
      "name",
      "secondName",
      "email",
    ] as (keyof Patient)[];

    return (
      <Box className="edit-mode-props">
        {props.map((prop) => (
          <Fragment key={prop}>
            <TextField
              error={!patient[prop] || !!errors?.[prop]}
              label={t(prop)}
              variant="standard"
              value={patient[prop]}
              onChange={(e) => {
                setPatient(
                  (prev) => prev && { ...prev, [prop]: e.target.value }
                );
                setIsDataChanged(true);
              }}
            />
            <FormHelperText error={!patient[prop] || !!errors?.[prop]}>
              {!patient[prop]
                ? t("required", { keyPrefix: "errors" })
                : errors?.[prop]}
            </FormHelperText>
          </Fragment>
        ))}

        <MuiTelInput
          value={patient.phone}
          onChange={(phone: string) => {
            setIsDataChanged(true);
            setPatient((prev) => prev && { ...prev, phone });
          }}
          variant="filled"
          error={!patient.phone || !!errors?.phone}
          placeholder={t("phone")}
          color={!patient.phone || !!errors?.phone ? "error" : "primary"}
        />
        <FormHelperText error={!!errors?.phone}>{errors?.phone}</FormHelperText>
      </Box>
    );
  };

  const renderViewMode = () => {
    return (
      <Box className="view-mode-props">
        <Box className="info-block-item">
          <Typography variant="h4">{patient.surname}</Typography>
        </Box>
        <Box className="info-block-item">
          <Typography variant="h5" mr={2}>
            {patient.name}
          </Typography>
          <Typography variant="h5">{patient.secondName}</Typography>
        </Box>
        <Box className="info-block-item">
          <Typography color="primary" variant="body1" mr={2}>
            {patient.phone}
          </Typography>
        </Box>
        <Box className="info-block-item">
          <Typography variant="body1" mr={2}>
            {patient.email}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <InfoCard
      className="patient-main-info-card"
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
            image={patient.image ?? AvatarImage}
            alt={patient.surname}
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
                id="patientImage"
                name="patientImage"
                type="file"
                onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    onUpload?.(file);
                    reader.onloadend = () => {
                      setPatient(
                        (prev) =>
                          prev && {
                            ...prev,
                            image: `${reader.result}`,
                          }
                      );
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
