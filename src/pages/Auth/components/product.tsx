import { useGetProductsQuery } from "@api";
import { StepWizardChildProps } from "react-step-wizard";
import {
  Box,
  Paper,
  Grid2,
  Typography,
  Button,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
  type IconButtonProps,
  Collapse,
} from "@mui/material";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import { Card } from "@components";
import { Product } from "@types";

import { red } from "@mui/material/colors";
import "../auth.scss";

interface IUserWorkspaceStepProps {
  product: Product;
  onUpdate: (product: Product) => void;
}

export const ProductItem = (
  props: IUserWorkspaceStepProps & Partial<StepWizardChildProps>
) => {
  const { product, onUpdate, previousStep, nextStep } = props;
  const { data } = useGetProductsQuery();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    // <Card variant="outlined">

    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 2,
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500], width: "100px" }}
              aria-label="recipe"
            >
              {product.prices[0].interval}
            </Avatar>
          }
          title={product.metadata.ua_name}
          subheader={`${product.prices[0].amount / 100} ${
            product.prices[0].currency
          }`}
        />
        <CardMedia
          component="img"
          height="194"
          image={product.image}
          alt={product.metadata.ua_name}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {product.metadata.en_description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="contained"
            onClick={() => {
              onUpdate(product);
              nextStep?.();
            }}
          >
            select
          </Button>
        </CardActions>
      </Card>
      {/* <Box style={{ maxWidth: "900px" }} sx={{ flexGrow: 1 }}>
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
        </Box> */}
    </Box>
  );
};
