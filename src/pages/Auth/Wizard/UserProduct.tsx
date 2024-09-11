import { useGetProductsQuery } from "@api";
import { StepWizardChildProps } from "react-step-wizard";
import { Grid2, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
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
      <Button variant="contained" onClick={previousStep} sx={{ mb: 2 }}>
        {t("buttons.back")}
      </Button>
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
              interval={interval}
              onSetInterval={setInterval}
            />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};
