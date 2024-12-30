import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  menuAnchor: { x: number; y: number } | undefined;
  handleClose: () => void;
  onReply: () => void;
};

export const ContextMenu: FC<Props> = ({
  menuAnchor,
  handleClose,
  onReply,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.chat" });

  return (
    <Menu
      className="message-context-menu"
      open={Boolean(menuAnchor)}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        menuAnchor ? { top: menuAnchor.y, left: menuAnchor.x } : undefined
      }
    >
      <MenuItem
        onClick={() => {
          onReply();
          handleClose();
        }}
      >
        {t("reply")}
      </MenuItem>
    </Menu>
  );
};
