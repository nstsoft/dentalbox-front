import { ChangeEvent, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { StepWizardChildProps } from "react-step-wizard";
import { WorkspaceForm } from "./types";
import { Card, VisuallyHiddenInput } from "@elements";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface IUserWorkspaceStepProps {
  workspaceForm: WorkspaceForm;
  onUpdate: (data: Partial<WorkspaceForm>) => void;
  setWorkspaceImage: (file: File) => void;
}

export const Workspace = (
  props: IUserWorkspaceStepProps & Partial<StepWizardChildProps>
) => {
  const { workspaceForm, onUpdate, nextStep, previousStep, setWorkspaceImage } =
    props;
  const { t } = useTranslation();

  const signUpInputs = [
    {
      id: "workspaceName",
      label: t("signUpWizard.workspace.name"),
      type: "text",
      placeholder: t("signUpWizard.workspace.name"),
      required: true,
      value: workspaceForm.name,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate({ name: ev.target.value });
      },
    },
    {
      id: "description",
      label: t("signUpWizard.workspace.description"),
      type: "text",
      placeholder: t("signUpWizard.workspace.description"),
      required: false,
      value: workspaceForm.description,
      onChange: (ev: ChangeEvent<HTMLInputElement>) => {
        onUpdate({ description: ev.target.value });
      },
    },
  ];

  const onNext = (event: FormEvent) => {
    event.preventDefault();
    nextStep?.();
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        {t("signUpWizard.workspace.title")}
      </Typography>
      <Box
        component="form"
        onSubmit={onNext}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        {signUpInputs.map((input) => (
          <FormControl key={input.id}>
            <InputLabel htmlFor={input.id}>{input.label}</InputLabel>
            <OutlinedInput
              id={input.id}
              type={input.type}
              name={input.id}
              label={input.label}
              required={input.required}
              onChange={input.onChange}
              value={input.value}
              sx={{ ariaLabel: input.id }}
            />
          </FormControl>
        ))}
        <FormControl>
          <FormLabel htmlFor="workspaceImage">
            {t("signUpWizard.workspace.image")}
          </FormLabel>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            {t("buttons.upload")}
            <VisuallyHiddenInput
              id="workspaceImage"
              name="workspaceImage"
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.files?.[0] && setWorkspaceImage(e.target.files?.[0]);
              }}
            />
          </Button>
        </FormControl>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button variant="outlined" onClick={previousStep}>
            {t("buttons.back")}
          </Button>
          <Button type="submit" variant="contained">
            {t("buttons.next")}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
