import Modal, { ModalProps } from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { type FC, type ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { SxProps, Theme } from "@mui/material/styles";

type Props = ModalProps & {
  children: ReactNode | ReactNode[];
  headerButtons?: ReactNode | ReactNode[];
  width?: string;
  sx?: SxProps<Theme>;
};

export const CustomModal: FC<Props> = ({
  children,
  headerButtons,
  sx,
  ...props
}) => {
  return (
    <Modal {...props}>
      <Box
        className="modal-container"
        sx={{
          border: "none",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          maxHeight: "90vh",
          bgcolor: "background.paper",
          overflow: "auto",
          boxShadow: 24,
          borderRadius: "8px",
          ...sx,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginBottom: "5px",
            position: "relative",
            backgroundColor: "#008fba",
            padding: "15px",
          }}
        >
          <Box className="header-buttons" sx={{ color: "white !important" }}>
            {headerButtons}
          </Box>

          <IconButton
            sx={{ padding: 0, color: "#ffffff" }}
            onClick={(e) => props?.onClose?.(e, "backdropClick")}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ p: "15px" }}>{children}</Box>
      </Box>
    </Modal>
  );
};
