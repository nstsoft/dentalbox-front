import "./style.scss";
import { useGetProductsQuery } from "@api";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";

import { Product } from "@types";
import { ProductItem } from "../ProductItem";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

type IUserWorkspaceStepProps = {
  onProductSelect: (product: Product) => void;
};

type Interval = "week" | "month" | "year";
const intervals: Interval[] = ["week", "month", "year"];
const colors = ["#9fcced", "#009688", "#870050", "#8a4af3"];

export const ProductSelect: FC<IUserWorkspaceStepProps> = ({
  onProductSelect,
}) => {
  const [tabValue, setTabValue] = useState(0);
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
    <Box className="product-select-section">
      <Tabs value={tabValue} onChange={handleChange}>
        <Tab label={t("packageIntervals.week")} />
        <Tab label={t("packageIntervals.month")} />
        <Tab label={t("packageIntervals.year")} />
      </Tabs>
      <Grid2
        container
        spacing={2}
        justifyContent={"center"}
        sx={{ mt: 2, mb: 2 }}
      >
        {sortedProducts.map((product, index) => (
          <Grid2 key={product.productId} width={300} flexGrow={1}>
            <ProductItem
              key={product.productId}
              product={product}
              interval={interval}
              onProductSelect={onProductSelect}
              color={colors[index]}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};
