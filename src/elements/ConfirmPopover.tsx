import { FC } from "react";

import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

type Props = {
  anchorEl?: HTMLElement;
  setAnchorEl: (el?: HTMLElement | undefined) => void;
  label: string;
  onConfirm: () => void;
};

export const ConfirmPopover: FC<Props> = ({
  anchorEl,
  setAnchorEl,

  onConfirm,
  label,
}) => {
  const { t } = useTranslation("", { keyPrefix: "buttons" });
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(undefined)}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          minWidth: 250,
          maxWidth: 300,
        }}
      >
        <Typography textAlign="center" variant="body1" m={3}>
          {label}
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={() => setAnchorEl(undefined)}>
            {t("cancel")}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setAnchorEl(undefined);
              onConfirm();
            }}
          >
            {t("submit")}
          </Button>
        </div>
      </Box>
    </Popover>
  );
};
