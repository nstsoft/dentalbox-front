import { ChangeEvent, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { StepWizardChildProps } from "react-step-wizard";
import { WorkspaceForm } from "./types";
import { Card } from "@components";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

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
          <TextField
            id="workspaceImage"
            type="file"
            name="workspaceImage"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              e.target.files?.[0] && setWorkspaceImage(e.target.files?.[0]);
            }}
            variant="outlined"
            sx={{ ariaLabel: "workspace image" }}
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button variant="outlined" onClick={previousStep}>
            {t("signUpWizard.previousButton")}
          </Button>
          <Button type="submit" variant="contained">
            {t("signUpWizard.nextButton")}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
