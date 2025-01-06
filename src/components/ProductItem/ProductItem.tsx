import "./style.scss";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import GroupsIcon from "@mui/icons-material/Groups";

import { useTranslation } from "react-i18next";
import { Card } from "@elements";
import { Product } from "@types";

import icons from "currency-icons";

interface IUserWorkspaceStepProps {
  product: Product;
  interval: "week" | "month" | "year";
  color: string;
  onProductSelect?: (product: Product) => void;
}

export const ProductItem = (props: IUserWorkspaceStepProps) => {
  const { product, onProductSelect, interval } = props;
  const { t, i18n } = useTranslation();

  return (
    <Card className="product-item">
      <CardHeader
        className="product-item__header"
        title={
          i18n.language === "uk"
            ? product.metadata.ua_name
            : product.metadata.en_name
        }
      />
      <Box sx={{ mb: 2 }}>
        <Typography sx={{ textAlign: "center", color: "#21d7fc" }}>
          {icons[product.prices[0].currency?.toUpperCase()]?.symbol}{" "}
          {product.prices[0].amount / 100} /{" "}
          {t(`signUpWizard.userProduct.intervals.${interval}`).toLowerCase()}
        </Typography>
      </Box>
      <Box sx={{ position: "relative", mb: 2 }}>
        <Box className="product-item__space left"></Box>
        <Divider className="product-item__divider" />
        <Box className="product-item__space right"></Box>
      </Box>
      <CardContent className="product-item__content">
        <Box className="quantity">
          <GroupsIcon />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {product.metadata.team > 0 ? product.metadata.team : "~"}{" "}
            {t("signUpWizard.userProduct.people")}
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ textAlign: "center" }}>
          {i18n.language === "uk"
            ? product.metadata.ua_description
            : product.metadata.en_description}
        </Typography>
      </CardContent>
      {onProductSelect && (
        <CardActions className="actions">
          <Button
            variant="contained"
            onClick={() => onProductSelect?.(product)}
          >
            {t("buttons.select")}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
