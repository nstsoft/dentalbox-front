import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { type FC, type Dispatch, type SetStateAction, useState } from "react";
import { type AnamnesisData } from "@types";
import { useTranslation } from "react-i18next";
import { InfoCard } from "@components";

type Props = {
  anamnesis: AnamnesisData;
  setAnamnesis: Dispatch<SetStateAction<AnamnesisData | undefined>>;
  isDataChanged: boolean;
  setIsDataChanged: (val: boolean) => void;
  onSubmit: () => void;
};

const STRING_PROPS = [
  "allergies",
  "surgeries",
  "medicationHistory",
  "immunization",
  "respiratory",
  "hypertension",
  "kidney",
  "liver",
  "autoimmune",
  "blood",
  "chronicDisorders",
  "infectionsHistory",
] as (keyof AnamnesisData)[];

const BOOL_PROPS = [
  "smoking",
  "alcohol",
  "diabetes",
] as (keyof AnamnesisData)[];

export const AnamnesisInfo: FC<Props> = ({
  isDataChanged,
  onSubmit,
  anamnesis,
  setAnamnesis,
  setIsDataChanged,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { t } = useTranslation("", {
    keyPrefix: "pages.patientCard.anamnesis",
  });

  const renderEditModeInputs = () => {
    return (
      <Box className={"edit-mode-props" + (isEditMode ? " edit-mode" : "")}>
        {STRING_PROPS.map((prop) => (
          <TextField
            key={prop}
            label={t(prop)}
            variant="standard"
            value={anamnesis[prop] ?? ""}
            onChange={(e) => {
              setAnamnesis(
                (prev) => prev && { ...prev, [prop]: e.target.value }
              );
              setIsDataChanged(true);
            }}
          />
        ))}

        {BOOL_PROPS.map((prop) => (
          <Box key={prop} className="info-block-item checkbox">
            <Typography
              key={prop}
              className="value"
              variant="body1"
              mr={2}
              sx={{
                color: anamnesis[prop] ? "red" : "green",
              }}
            >
              {t(prop)}:
            </Typography>
            <Box>
              <Checkbox
                onClick={() => {
                  setAnamnesis(
                    (prev) => prev && { ...prev, [prop]: !anamnesis[prop] }
                  );
                  setIsDataChanged(true);
                }}
                sx={{ padding: 0 }}
                checked={!!anamnesis[prop]}
              />
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  const renderViewMode = () => {
    return (
      <Box className="view-mode-props">
        {STRING_PROPS.map((prop) => (
          <Box key={prop} className="info-block-item">
            <Typography className="name" variant="body1" mr={2}>
              {t(prop)}:
            </Typography>

            <Typography className="value" variant="body1" mr={2}>
              {anamnesis[prop] ?? "-"}
            </Typography>
          </Box>
        ))}

        {BOOL_PROPS.map((prop) => (
          <Box key={prop} className="info-block-item">
            <Typography
              key={prop}
              className="value"
              variant="body1"
              mr={2}
              sx={{
                color: anamnesis[prop] ? "red" : "green",
              }}
            >
              {t(prop)}:
            </Typography>
            <Box>
              <Checkbox
                disabled={true}
                sx={{ padding: 0 }}
                checked={!!anamnesis[prop]}
              />
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <InfoCard
      className="patient-anamnesis-info-card"
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
