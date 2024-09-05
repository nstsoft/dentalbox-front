import { useGetProductsQuery } from "../../../store/api";
import { StepWizardChildProps } from "react-step-wizard";
import { Box, Paper, Grid2, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Card } from "@components";
import { Product } from "@types";

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
  product: Product | null;
  onUpdate: (product: Product) => void;
}

export const UserProduct = (
  props: IUserWorkspaceStepProps & Partial<StepWizardChildProps>
) => {
  const { product, onUpdate, previousStep, nextStep } = props;
  const { data } = useGetProductsQuery();
  const { t } = useTranslation();

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        {t("signUpWizard.userProduct.title")}
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
            {data?.map((availableProduct) => (
              <Grid2 key={availableProduct.id} size={4}>
                <Item onClick={() => onUpdate(availableProduct)}>
                  <div>{availableProduct.name}</div>
                  <div>{availableProduct.amount}</div>
                  <div>{availableProduct.currency}</div>
                  <div>{availableProduct.interval}</div>
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
            {t("buttons.back")}
          </Button>
          <Button variant="contained" onClick={nextStep}>
            {t("buttons.next")}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
