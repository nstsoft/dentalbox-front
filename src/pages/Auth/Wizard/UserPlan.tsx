import { useGetPlansQuery } from "@api";
import { StepWizardChildProps } from "react-step-wizard";
import { Box, Paper, Grid2, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Card } from "@components";

import "../auth.scss";

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
  const { plan, onUpdate, onSubmit, previousStep } = props;
  const { data } = useGetPlansQuery();
  const { t } = useTranslation();

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        {t("signUpWizard.userPlan.title")}
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button variant="contained" onClick={previousStep}>
            {t("signUpWizard.previousButton")}
          </Button>
          <Button variant="contained" onClick={() => plan && onSubmit()}>
            {t("signUpWizard.userPlan.createAccount")}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
