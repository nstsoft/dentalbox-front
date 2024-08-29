import { useGetPlansQuery } from "@api";
import { StepWizardChildProps } from "react-step-wizard";
import { Box, Paper, Grid2 } from "@mui/material";
import { styled } from "@mui/material/styles";

import "../auth.scss";
import { useTranslation } from "react-i18next";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

interface IUserWorkspaceStepProps {
  plan: string;
  onUpdate: (value: string) => void;
  onSubmit: () => void;
}

export const UserPlan = (
  props: IUserWorkspaceStepProps & Partial<StepWizardChildProps>
) => {
  const { plan, onUpdate, onSubmit, previousStep, isActive } = props;
  const { data, status } = useGetPlansQuery();
  const { t } = useTranslation();

  return (
    <form className="auth__form__cabinet" onSubmit={onSubmit}>
      <div className="form-row">
        <h3>{t("signUpWizard.userPlan.title")}</h3>
        <Box style={{ maxWidth: "900px" }} sx={{ flexGrow: 1 }}>
          <Grid2 container spacing={2}>
            {data?.map((availablePlan) => (
              <Grid2 key={availablePlan._id} size={4}>
                <Item onClick={() => onUpdate(availablePlan._id)}>
                  <div>{availablePlan.name}</div>
                  <div>{availablePlan.price}</div>
                  <div>{availablePlan.totalMembers}</div>
                  <div>{availablePlan.type}</div>
                </Item>
              </Grid2>
            ))}
          </Grid2>
        </Box>

        <div className="col-sm-12 mt-4 d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-info auth__form__cabinet__submit"
            onClick={previousStep}
          >
            {t("signUpWizard.previousButton")}
          </button>
          <button
            type="button"
            className="btn btn-info auth__form__cabinet__submit"
            onClick={() => plan && onSubmit()}
          >
            {t("signUpWizard.userPlan.createAccount")}
          </button>
        </div>
      </div>
    </form>
  );
};
