import "../auth.scss";
import { useGetProductsQuery } from "@api";
import { StepWizardChildProps } from "react-step-wizard";
import { Grid2, Tabs, Tab } from "@mui/material";
import { Product } from "@types";
import { ProductItem } from "../components";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface IUserWorkspaceStepProps {
  onProductSelect: (product: Product) => void;
}

type Interval = "week" | "month" | "year";
const intervals: Interval[] = ["week", "month", "year"];
const colors = ["#9fcced", "#009688", "#870050", "#8a4af3"];

export const UserProduct = (
  props: IUserWorkspaceStepProps & Partial<StepWizardChildProps>
) => {
  const [tabValue, setTabValue] = useState(0);
  const { onProductSelect, nextStep } = props;
  const { data } = useGetProductsQuery();
  const [interval, setInterval] = useState<Interval>("week");
  const { t } = useTranslation("", { keyPrefix: "signUpWizard" });

  const filteredProductList =
    data?.map((product) => ({
      ...product,
      prices: product.prices.filter((price) => price.interval === interval),
    })) ?? [];

  const sortedProducts = filteredProductList.sort(
    (a, b) => a.prices[0].amount - b.prices[0].amount
  );

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setInterval(intervals[newValue]);
  };

  if (!data) return null;
  return (
    <>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label={t("packageIntervals.week")} />
        <Tab label={t("packageIntervals.month")} />
        <Tab label={t("packageIntervals.year")} />
      </Tabs>
      <Grid2
        container
        spacing={2}
        justifyContent={"center"}
        alignContent={"center"}
        alignItems={"center"}
      >
        {sortedProducts.map((product, index) => (
          <Grid2
            key={product.productId}
            size={1}
            alignItems="center"
            justifyContent="space-around"
            alignContent="center"
            width={300}
            height={700}
            flexGrow={1}
          >
            <ProductItem
              key={product.productId}
              nextStep={nextStep}
              product={product}
              interval={interval}
              onProductSelect={onProductSelect}
              color={colors[index]}
            />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};
