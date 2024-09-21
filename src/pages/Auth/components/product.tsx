import { StepWizardChildProps } from "react-step-wizard";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";

import GroupsIcon from "@mui/icons-material/Groups";

import { useTranslation } from "react-i18next";
import { Card } from "@elements";
import { Product } from "@types";

import icons from "currency-icons";
import "../auth.scss";

interface IUserWorkspaceStepProps {
  product: Product;
  interval: "week" | "month" | "year";
  color: string;
  onProductSelect: (product: Product) => void;
}

export const ProductItem = (
  props: IUserWorkspaceStepProps & Partial<StepWizardChildProps>
) => {
  const { product, onProductSelect, nextStep, interval, color } = props;
  const { t, i18n } = useTranslation();

  return (
    <Card
      sx={{
        padding: 0,
        backfaceVisibility: "",
        backgroundClip: "border-box",
        backgroundSize: "contain",
        backgroundPosition: "center",
        height: "100%",
        position: "relative",
        zIndex: 1,
        maxWidth: "300px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${product.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: "0.2",
          zIndex: -10,
        }}
      ></div>
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
            fontWeight: "900",
            padding: 1,
            background: color,
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
        ></Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">
            {product.prices[0].amount / 100}
            {icons[product.prices[0].currency?.toUpperCase()]?.symbol} /{" "}
            {t(`signUpWizard.userProduct.intervals.${interval}`).toLowerCase()}
          </Typography>
          <GroupsIcon />
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            {product.metadata.team > 0 ? product.metadata.team : "~"}{" "}
            {t("signUpWizard.userProduct.people")}
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
      <CardContent>
        <Box>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", textAlign: "center" }}
          >
            {i18n.language === "ua"
              ? product.metadata.ua_description
              : product.metadata.en_description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
