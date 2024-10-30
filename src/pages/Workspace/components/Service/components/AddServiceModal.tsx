import "./AddServiceModal.scss";
import { type FC, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { Service } from "@types";

type Props = {
  groupItems: string[];
  onUpdate: (service: Omit<Service, "_id" | "workspace">) => void;
  onClose: () => void;
};

export const AddService: FC<Props> = ({ groupItems, onUpdate, onClose }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.workspace.services" });
  const defaultServiceValues = {
    group: "",
    price: 0,
    name: "",
    paragraph: "",
    notes: "",
  };
  const [service, setService] =
    useState<Omit<Service, "_id" | "workspace">>(defaultServiceValues);

  const [errors, setErrors] = useState<{
    [key in "group" | "price" | "name" | "paragraph"]?: string;
  }>({});

  const onAdd = () => {
    let hasError = false;
    if (!service.group) {
      hasError = true;
      setErrors((prev) => ({ ...prev, group: t("errors.group") }));
    }
    if (!service.name) {
      hasError = true;
      setErrors((prev) => ({ ...prev, name: t("errors.name") }));
    }
    if (!service.price) {
      hasError = true;
      setErrors((prev) => ({ ...prev, price: t("errors.price") }));
    }
    if (!service.paragraph) {
      hasError = true;
      setErrors((prev) => ({ ...prev, paragraph: t("errors.paragraph") }));
    }
    if (!hasError) {
      onUpdate(service);
      setService(defaultServiceValues);
      onClose();
    }
  };

  return (
    <Box className="add-service-modal">
      <Box>
        <Autocomplete
          className="input-item"
          fullWidth
          disablePortal
          freeSolo
          options={groupItems}
          onInputChange={(_, group) => {
            if (group) {
              setErrors((prev) => ({ ...prev, group: undefined }));
              setService((prev) => ({ ...prev, group }));
            }
          }}
          renderInput={(params) => (
            <TextField
              error={!!errors.group}
              helperText={errors.group}
              {...params}
              label={t("inputs.group")}
            />
          )}
        />

        <TextField
          className="input-item"
          error={!!errors.name}
          helperText={errors.name}
          value={service.name}
          sx={{ width: "100%" }}
          label={t("inputs.name")}
          onChange={(e) => {
            setErrors((prev) => ({ ...prev, name: undefined }));
            setService((prev) => ({ ...prev, name: e.target.value }));
          }}
        />

        <TextField
          className="input-item"
          value={service.notes}
          sx={{ width: "100%" }}
          label={t("inputs.notes")}
          onChange={(e) => {
            setService((prev) => ({ ...prev, notes: e.target.value }));
          }}
        />

        <Box className="input-items-container">
          <TextField
            className="input-item"
            error={!!errors.paragraph}
            helperText={errors.paragraph}
            value={service.paragraph}
            sx={{ width: "40%" }}
            label={t("inputs.paragraph")}
            onChange={(e) => {
              setErrors((prev) => ({ ...prev, paragraph: undefined }));
              setService((prev) => ({ ...prev, paragraph: e.target.value }));
            }}
          />
          <TextField
            className="input-item"
            error={!!errors.price}
            helperText={errors.price}
            value={service.price}
            sx={{ width: "40%" }}
            label={t("inputs.price")}
            type="number"
            onChange={(e) => {
              setErrors((prev) => ({ ...prev, price: undefined }));
              setService((prev) => ({ ...prev, price: +e.target.value }));
            }}
          />
        </Box>
      </Box>
      <Box>
        <Button
          onClick={() => {
            setErrors({});
            setService(defaultServiceValues);
            onClose();
          }}
        >
          {t("cancel", { keyPrefix: "buttons" })}
        </Button>
        <Button variant="contained" onClick={onAdd}>
          {t("submit", { keyPrefix: "buttons" })}
        </Button>
      </Box>
    </Box>
  );
};
