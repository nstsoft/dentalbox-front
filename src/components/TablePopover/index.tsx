import "./style.scss";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  anchorEl: null | HTMLElement;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: () => void;
};

export const TablePopover: FC<Props> = ({
  open,
  anchorEl,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const { t } = useTranslation("", { keyPrefix: "buttons" });
  return (
    <Popover
      className="table-popover-container"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Box className="popover">
        <Box className="popover__buttons">
          <Button className="popover__button" onClick={onUpdate}>
            {t("update", { keyPrefix: "buttons" })}
          </Button>
          <Button className="popover__button" onClick={onDelete}>
            {t("delete", { keyPrefix: "buttons" })}
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};
