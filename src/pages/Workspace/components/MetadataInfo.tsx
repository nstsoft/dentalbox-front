import "../workspace.scss";

import { Card, CustomSelect, IconButton } from "@elements";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { WorkspaceMetadata } from "@types";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useUpdateMetadataMutation } from "@api";
import Button from "@mui/material/Button";
import { MobileTimePicker } from "@mui/x-date-pickers";
import days from "dayjs";

type Props = {
  metadata?: WorkspaceMetadata;
};

const currencies = ["$", "₴"];

export const MetadataInfo: FC<Props> = ({ metadata }) => {
  const [isEditingMode, setIsEditingMode] = useState(false);
  const { t } = useTranslation("", { keyPrefix: "pages.workspace.metadata" });
  const [updateMetadata] = useUpdateMetadataMutation();
  const [currency, setCurrency] = useState(metadata?.currency ?? "$");
  const [workingHours, setWorkingHours] = useState({
    start: days(metadata?.workingHours.start ?? "08:00", "HH:mm"),
    end: days(metadata?.workingHours.end ?? "17:00", "HH:mm"),
  });

  const onUpdateMetadata = () => {
    updateMetadata({
      currency,
      workingHours: {
        start: workingHours.start.format("HH:mm"),
        end: workingHours.end.format("HH:mm"),
      },
    });
  };

  return (
    <Card className="metadata-info" sx={{ m: 0, gap: 0 }}>
      <Box className="edit-btn-box">
        <IconButton onClick={() => setIsEditingMode((prev) => !prev)}>
          {isEditingMode ? <CloseIcon /> : <EditIcon />}
        </IconButton>
      </Box>
      <Box className="metadata-container">
        <Box className="metadata-item">
          <Typography variant="h6">{t("currency")}</Typography>
          {isEditingMode ? (
            <CustomSelect
              label=""
              data={currencies.map((currency) => ({
                value: currency,
                label: currency,
              }))}
              selected={currency}
              setValue={(value) => setCurrency(value)}
            />
          ) : (
            <Typography variant="body1">{metadata?.currency}</Typography>
          )}
        </Box>
        <Box className="metadata-item">
          <Typography variant="h6">{t("workingHours")}</Typography>
          {isEditingMode ? (
            <>
              <MobileTimePicker
                className="mobile-time-picker"
                value={workingHours.start}
                ampm={false}
                localeText={{
                  cancelButtonLabel: t("cancel", { keyPrefix: "buttons" }),
                  okButtonLabel: t("select", { keyPrefix: "buttons" }),
                }}
                onChange={(newValue) =>
                  setWorkingHours((prevState) => ({
                    ...prevState,
                    start: newValue ?? days(),
                  }))
                }
              />
              -
              <MobileTimePicker
                className="mobile-time-picker"
                value={workingHours.end}
                ampm={false}
                localeText={{
                  cancelButtonLabel: t("cancel", { keyPrefix: "buttons" }),
                  okButtonLabel: t("select", { keyPrefix: "buttons" }),
                }}
                onChange={(newValue) =>
                  setWorkingHours((prevState) => ({
                    ...prevState,
                    end: newValue ?? days(),
                  }))
                }
              />
            </>
          ) : (
            <Typography variant="body1">
              {metadata?.workingHours.start} - {metadata?.workingHours.end}
            </Typography>
          )}
        </Box>
      </Box>
      {isEditingMode && (
        <Button onClick={onUpdateMetadata}>
          {t("save", { keyPrefix: "buttons" })}
        </Button>
      )}
    </Card>
  );
};
