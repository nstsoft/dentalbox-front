import { useState } from "react";
import { Card } from "@components";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import icons from "currency-icons";
import moment from "moment";
import { useGetMySubscriptionQuery } from "@api";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAuth } from "@hooks";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const statusColor: { [key in string]: "warning" | "primary" | "error" } = {
  active: "primary",
  canceled: "warning",
  incomplete: "error",
  incomplete_expired: "error",
  past_due: "error",
  paused: "warning",
  trialing: "primary",
  unpaid: "error",
};

export const SubscriptionInfo = () => {
  const { user } = useAuth();
  const { data: subscription } = useGetMySubscriptionQuery();
  const { t, i18n } = useTranslation("", { keyPrefix: "pages.workspace" });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!subscription || !user) return null;

  return (
    <Card sx={{ m: 0, alignSelf: "flex-start", position: "relative" }}>
      <Button
        onClick={handleClick}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          display: user.role === "admin" ? "flex" : "none",
        }}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        <MenuItem onClick={handleClose}>
          <Typography>
            <PauseCircleIcon /> {t("pause")}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography>
            <CancelIcon /> {t("cancel")}
          </Typography>
        </MenuItem>
      </Menu>
      <Box>
        <Typography
          className="highlighted"
          variant="h5"
          sx={{ marginBottom: "20px" }}
        >
          {t("subscription")}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Typography mr={1} variant="h6">
            {t("package")}:
          </Typography>
          <Typography variant="body1">
            {i18n.language === "en"
              ? subscription?.product.metadata.en_name
              : subscription?.product.metadata.ua_name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Typography mr={1} variant="h6">
            {t("status")}:
          </Typography>
          <Chip
            color={statusColor[subscription.status]}
            label={t(`subscriptionStatus.${subscription?.status}`)}
          />
        </Box>
        <Divider variant="inset" sx={{ mt: 2, mb: 2 }} />
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Typography variant="body2">
            {" "}
            {i18n.language === "en"
              ? subscription?.product.metadata.en_description
              : subscription?.product.metadata.ua_description}
          </Typography>
        </Box>
        <Divider variant="inset" sx={{ mt: 2, mb: 2 }} />
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Typography mr={1} variant="h6">
            {t("price")}:
          </Typography>
          <Typography variant="body1">
            {`${(subscription?.price.unit_amount ?? 0) / 100}${
              subscription
                ? icons[subscription?.price.currency.toUpperCase()]?.symbol
                : ""
            } / ${t("interval." + subscription?.price.recurring?.interval)}`}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Typography mr={1} variant="h6">
            {t("period")}:
          </Typography>
          <Typography variant="body1">
            {moment((subscription?.current_period_start ?? 0) * 1000).format(
              "DD.MM.YYYY"
            )}
            -
            {moment((subscription?.current_period_end ?? 0) * 1000).format(
              "DD.MM.YYYY"
            )}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
