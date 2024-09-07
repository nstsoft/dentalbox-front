import { useGetProductsQuery } from "../../../store/api";
import { StepWizardChildProps } from "react-step-wizard";
import { Box, Paper, Grid2, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Card } from "@components";
import { Product } from "@types";
import { ProductItem } from "../components";

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
  onUpdate: (product: Product) => void;
}

export const UserProduct = (
  props: IUserWorkspaceStepProps & Partial<StepWizardChildProps>
) => {
  const { onUpdate, previousStep, nextStep } = props;
  const { data } = useGetProductsQuery();
  const { t } = useTranslation();
  if (!data) return null;
  return (
    <Grid2
      container
      spacing={2}
      justifyContent={"center"}
      alignContent={"center"}
      alignItems={"center"}
    >
      {data.map((product) => (
        <Grid2
          key={product.id}
          size={4}
          alignItems="center"
          justifyContent="space-around"
          alignContent="center"
          minWidth={250}
          flexGrow={1}
        >
          <ProductItem
            key={product.id}
            nextStep={nextStep}
            product={product}
            onUpdate={onUpdate}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};
