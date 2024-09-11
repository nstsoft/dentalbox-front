import { useGetProductsQuery } from "@api";
import { StepWizardChildProps } from "react-step-wizard";
import { Grid2 } from "@mui/material";
import { Product } from "@types";
import { ProductItem } from "../components";
import { useState } from "react";

import "../auth.scss";

interface IUserWorkspaceStepProps {
  onProductSelect: (product: Product) => void;
}

export const UserProduct = (
  props: IUserWorkspaceStepProps & Partial<StepWizardChildProps>
) => {
  const { onProductSelect, nextStep } = props;
  const { data } = useGetProductsQuery();
  const [interval, setInterval] = useState<"week" | "month" | "year">("week");

  const filteredProductList =
    data?.map((product) => ({
      ...product,
      prices: product.prices.filter((price) => price.interval === interval),
    })) ?? [];

  if (!data) return null;
  return (
    <>
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
              interval={interval}
              onSetInterval={setInterval}
              onProductSelect={onProductSelect}
            />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};
