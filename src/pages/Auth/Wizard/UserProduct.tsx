import { useGetProductsQuery } from "@api";
import { StepWizardChildProps } from "react-step-wizard";
import {
  Box,
  Paper,
  Grid2,
  Typography,
  Button,
  Switch,
  ButtonGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Card } from "@components";
import { Product } from "@types";
import { ProductItem } from "../components";
import { useState } from "react";

import "../auth.scss";

interface IUserWorkspaceStepProps {
  onUpdate: (product: Product) => void;
}

export const UserProduct = (
  props: IUserWorkspaceStepProps & Partial<StepWizardChildProps>
) => {
  const { onUpdate, previousStep, nextStep } = props;
  const { data } = useGetProductsQuery();
  const { t } = useTranslation();
  const [interval, setInterval] = useState<"week" | "month" | "year">("week");

  const filteredProductList =
    data?.map((product) => ({
      ...product,
      prices: product.prices.filter((price) => price.interval === interval),
    })) ?? [];

  if (!data) return null;
  return (
    <>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={() => setInterval("week")}>Week</Button>
        <Button onClick={() => setInterval("month")}>Month</Button>
        <Button onClick={() => setInterval("year")}>Year</Button>
      </ButtonGroup>
      <Grid2
        container
        spacing={2}
        justifyContent={"center"}
        alignContent={"center"}
        alignItems={"center"}
      >
        {filteredProductList.map((product) => (
          <Grid2
            key={product.productId}
            size={4}
            alignItems="center"
            justifyContent="space-around"
            alignContent="center"
            minWidth={250}
            flexGrow={1}
          >
            <ProductItem
              key={product.productId}
              nextStep={nextStep}
              product={product}
              onUpdate={onUpdate}
            />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};
