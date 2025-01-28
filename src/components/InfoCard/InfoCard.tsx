import "./style.scss";
import Card, { CardProps } from "@mui/material/Card";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { type FC, type Dispatch, type SetStateAction } from "react";
import { IconButton } from "@elements";
import { isMobile } from "react-device-detect";

type Props = CardProps & {
  children: React.ReactNode | React.ReactNode[];
  isEditMode?: boolean;
  setIsEditMode?: Dispatch<SetStateAction<boolean>>;
  onSubmit: () => void;
  buttonLabel: string;
  disabledButton?: boolean;
  canEdit?: boolean;
};

export const InfoCard: FC<Props> = ({
  setIsEditMode,
  isEditMode,
  children,
  onSubmit,
  buttonLabel,
  disabledButton,
  canEdit,
  ...props
}) => {
  return (
    <Card
      {...props}
      className={
        "info-card-component " +
        (props.className || "") +
        (isEditMode ?? canEdit ? " edit-mode" : "")
      }
    >
      <Box className="header">
        {!canEdit && (
          <IconButton
            onClick={() => setIsEditMode?.((prev) => !prev)}
            sx={{ m: isMobile ? "16px 24px" : 0 }}
          >
            {isEditMode ? <CloseIcon /> : <EditIcon />}
          </IconButton>
        )}
      </Box>
      <Box className="content">{children}</Box>
      <Box className="footer">
        {(isEditMode ?? canEdit) && (
          <Button
            fullWidth
            className="submit-button"
            variant={"contained"}
            disabled={disabledButton}
            onClick={() => {
              onSubmit();
            }}
          >
            {buttonLabel}
          </Button>
        )}
      </Box>
    </Card>
  );
};
