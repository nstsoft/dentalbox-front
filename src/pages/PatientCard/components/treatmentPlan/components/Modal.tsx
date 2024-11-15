import { CustomModal, IconButton } from "@elements";
import { type FC, useState } from "react";
import { PlanItem, Service } from "@types";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import { isMobile } from "react-device-detect";

import "../style.scss";

type Props = {
  open: boolean;
  onClose: () => void;
  services: Service[];
  onSubmit: (items: PlanItem[]) => void;
};

export const Modal: FC<Props> = ({ open, onClose, services, onSubmit }) => {
  const { t } = useTranslation("", {
    keyPrefix: "pages.patientCard.treatmentPlan",
  });
  const [itemsList, setItemsList] = useState<PlanItem[]>([]);
  const [selectedPlanItem, setSelectedPlanItem] = useState<PlanItem | null>(
    null
  );
  const [searchService, setSearchService] = useState<Service | null>(null);

  const options = services
    .filter(({ _id }) => !itemsList.map((el) => el._id).includes(_id))
    .map((service) => ({
      label: service.name,
      value: service._id,
      ...service,
    }));

  const clearFields = () => {
    setItemsList([]);
    setSearchService(null);
    setSelectedPlanItem(null);
  };

  return (
    <CustomModal
      open={open}
      onClose={() => {
        onClose();
        clearFields();
      }}
      sx={{
        minWidth: isMobile ? "100%" : "500px",
        minHeight: "350px",
        maxHeight: isMobile ? "400px" : "450px",
      }}
    >
      <Box className="add-treatment-history-modal-content">
        <Typography variant="h5" sx={{ mb: 2 }}>
          {t("addRecord")}
        </Typography>
        <Box className="treatment-history-item-info">
          <Autocomplete
            disablePortal
            options={options}
            sx={{ width: 300 }}
            value={searchService}
            onChange={(_, value) => {
              if (!value) return;
              setSelectedPlanItem({
                name: value.name,
                price: value?.price,
                _id: value._id,
                quantity: 1,
              });
              setSearchService(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("service", { keyPrefix: "common" })}
              />
            )}
          />
          <Box className={`add-treatment-history-item-control-panel ${ isMobile ? "mobile" : "" }`}>
            <IconButton
              onClick={() =>
                setSelectedPlanItem(
                  (prev) =>
                    prev && {
                      ...prev,
                      quantity: Math.max(prev.quantity - 1, 0),
                    }
                )
              }
            >
              <RemoveIcon />
            </IconButton>
            <Typography className="count" variant="h6">
              {selectedPlanItem?.quantity ?? 0}
            </Typography>

            <IconButton
              onClick={() =>
                setSelectedPlanItem(
                  (prev) => prev && { ...prev, quantity: prev.quantity + 1 }
                )
              }
            >
              <AddIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setItemsList((prev) =>
                  selectedPlanItem ? [...prev, selectedPlanItem] : prev
                );
                setSelectedPlanItem(null);
                setSearchService(null);
              }}
            >
              <SaveIcon />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ mt: 2, minHeight: "150px" }}>
          {itemsList.map((item) => (
            <Box className="treatment-history-item" key={item._id}>
              <Box className="treatment-history-item-info">
                <Typography sx={{ maxWidth: "290px" }}>{item.name}</Typography>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <IconButton
                    onClick={() =>
                      setItemsList((prev) =>
                        prev.map((el) =>
                          el._id === item._id
                            ? {
                                ...el,
                                quantity: Math.max(el.quantity - 1, 1),
                              }
                            : el
                        )
                      )
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography>x {item.quantity}</Typography>
                  <IconButton
                    onClick={() =>
                      setItemsList((prev) =>
                        prev.map((el) =>
                          el._id === item._id
                            ? { ...el, quantity: el.quantity + 1 }
                            : el
                        )
                      )
                    }
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    sx={{ maxWidth: "unset" }}
                    onClick={() => {
                      setItemsList((prev) =>
                        prev.filter((el) => el._id !== item._id)
                      );
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <Box className="treatment-buttons">
          <Button
            variant="contained"
            onClick={() => {
              onSubmit(itemsList);
              clearFields();
            }}
          >
            {t("addRecord")}
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};
