import { Card, Textarea } from "@elements";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { FC, FormEvent, useEffect, useState } from "react";
import { FormControl, Typography } from "@mui/material";
import { Patient } from "@types";
import { useTranslation } from "react-i18next";
import { useUpdatePatientMutation } from "@api";

type NotesProps = {
  patient: Patient;
};

export const PatientNotes: FC<NotesProps> = ({ patient }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard" });
  const [isEdit, setIsEdit] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [notes, setNotes] = useState(patient?.notes ?? "");
  const [updatePatient, { isSuccess }] = useUpdatePatientMutation();

  const editToggle = () => {
    if (isEdit) {
      setIsDataChanged(false);
    }

    setIsEdit(!isEdit);
  };

  const onEditPatientInfo = (event: FormEvent) => {
    event.preventDefault();

    updatePatient({ ...patient, notes });
  };

  useEffect(() => {
    setIsEdit(false);
    setIsDataChanged(false);
  }, [isSuccess]);

  return (
    <Card sx={{ m: 0, position: "relative", gap: 0, alignSelf: "flex-start" }}>
      <Button
        sx={{ position: "absolute", top: 0, right: 0 }}
        onClick={editToggle}
      >
        {isEdit ? <CloseIcon /> : <EditIcon />}
      </Button>
      <Typography variant="h3" sx={{ mb: 1 }}>
        {t("notes")}
      </Typography>
      <form onSubmit={onEditPatientInfo}>
        <FormControl sx={{ width: "100%" }}>
          {isEdit ? (
            <Textarea
              id="patientNotes"
              value={notes}
              onChange={({ target }) => {
                setIsDataChanged(true);
                setNotes(target.value);
              }}
            />
          ) : (
            <Typography>{notes}</Typography>
          )}
        </FormControl>

        <Button
          type="submit"
          variant={"contained"}
          disabled={!isDataChanged}
          sx={{ mt: 2 }}
        >
          {t("save", { keyPrefix: "buttons" })}
        </Button>
      </form>
    </Card>
  );
};
