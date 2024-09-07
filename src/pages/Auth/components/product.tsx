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
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Card } from "@components";
import { Product } from "@types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
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
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

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
              {product.interval}
            </Avatar>
          }
          title={product.name}
          subheader={`${product.amount / 100} ${product.currency}`}
        />
        <CardMedia
          component="img"
          height="194"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
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
