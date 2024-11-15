import { Textarea } from "@elements";
import { type FC, useState } from "react";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import { useTranslation } from "react-i18next";
import { InfoCard } from "../InfoCard";

import "./style.scss";

type NotesProps = {
  label: string;
  value?: string;
  setValue: (value: string) => void;
  onConfirm: () => void;
};

export const Notes: FC<NotesProps> = ({
  label,
  value,
  setValue,
  onConfirm,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard" });
  const [isEdit, setIsEdit] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);

  return (
    <InfoCard
      buttonLabel={t("save", { keyPrefix: "buttons" })}
      onSubmit={() => {
        onConfirm();
        setIsDataChanged(false);
      }}
      disabledButton={!isDataChanged}
      isEditMode={isEdit}
      setIsEditMode={setIsEdit}
      className="patient-notes"
    >
      <Typography variant="h6">{label}</Typography>
      <FormControl sx={{ width: "100%" }}>
        {isEdit ? (
          <Textarea
            id="patientNotes"
            value={value}
            onChange={({ target }) => {
              if (target.value !== value) {
                setIsDataChanged(true);
              }
              setValue(target.value);
            }}
          />
        ) : (
          <Typography>{value ?? ""}</Typography>
        )}
      </FormControl>
    </InfoCard>
  );
};
