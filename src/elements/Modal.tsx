import Modal, { ModalProps } from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { type FC, type ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

type Props = ModalProps & {
  children: ReactNode | ReactNode[];
};

export const CustomModal: FC<Props> = ({ children, ...props }) => {
  return (
    <Modal {...props}>
      <Box
        sx={{
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
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <IconButton
            component="span"
            onClick={(e) => props?.onClose?.(e, "backdropClick")}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {children}
      </Box>
    </Modal>
  );
};
