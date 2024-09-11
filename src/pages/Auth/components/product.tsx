import { StepWizardChildProps } from "react-step-wizard";
import {
  Typography,
  Button,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { Card } from "@components";
import { Product } from "@types";

import icons from "currency-icons";
import "../auth.scss";
import { MouseEvent } from "react";

interface IUserWorkspaceStepProps {
  product: Product;
  interval: "week" | "month" | "year";
  onSetInterval: (interval: "week" | "month" | "year") => void;
  onProductSelect: (product: Product) => void;
}

export const ProductItem = (
  props: IUserWorkspaceStepProps & Partial<StepWizardChildProps>
) => {
  const { product, onProductSelect, nextStep, interval, onSetInterval } = props;
  const { t, i18n } = useTranslation();

  return (
    <Card
      sx={{
        padding: "10px",
        background: `url(${product.image})`,
        backgroundClip: "border-box",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <CardHeader
        disableTypography
        title={
          i18n.language === "ua"
            ? product.metadata.ua_name
            : product.metadata.en_name
        }
        sx={{
          padding: 0,
          "& .MuiCardHeader-content": {
            textAlign: "center",
            fontWeight: "bold",
          },
        }}
      />
      <CardContent sx={{ padding: "0 16px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          {product.metadata.team && (
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              {product.metadata.team} {t("signUpWizard.userProduct.people")}
            </Typography>
          )}
          <ToggleButtonGroup
            color="primary"
            value={interval}
            exclusive
            aria-label="Interval toggle button group"
            onChange={(event: MouseEvent<HTMLElement>) => {
              const value = (event.target as HTMLButtonElement).value;
              onSetInterval(value as "week" | "month" | "year");
            }}
            sx={{
              backgroundColor: "#008fba",
              "& .MuiToggleButtonGroup-grouped.Mui-selected": {
                color: "white",
              },
            }}
          >
            <ToggleButton value="week">
              {t("signUpWizard.userProduct.intervals.week")}
            </ToggleButton>
            <ToggleButton value="month">
              {t("signUpWizard.userProduct.intervals.month")}
            </ToggleButton>
            <ToggleButton value="year">
              {t("signUpWizard.userProduct.intervals.year")}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">
            {product.prices[0].amount}
            {icons[product.prices[0].currency?.toUpperCase()]?.symbol} /{" "}
            {t(`signUpWizard.userProduct.intervals.${interval}`).toLowerCase()}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {i18n.language === "ua"
              ? product.metadata.ua_description
              : product.metadata.en_description}
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            onProductSelect(product);
            nextStep?.();
          }}
        >
          {t("buttons.select")}
        </Button>
      </CardActions>
    </Card>
  );
};
