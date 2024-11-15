import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton } from "@elements";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Service, PlanItem, TreatmentPlan } from "@types";
import { type FC, type Dispatch, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";

type Props = {
  options: (Service & { value: string; label: string })[];
  selectedPlanItem: PlanItem | null;
  setSelectedPlan: Dispatch<SetStateAction<TreatmentPlan | null>>;
  setSelectedPlanItem: Dispatch<SetStateAction<PlanItem | null>>;
  setShowAddPlanItem: Dispatch<SetStateAction<boolean>>;
};

export const EditItem: FC<Props> = ({
  options,
  setSelectedPlanItem,
  selectedPlanItem,
  setSelectedPlan,
  setShowAddPlanItem,
}) => {
  const { t } = useTranslation("", {
    keyPrefix: "pages.patientCard.treatmentPlan",
  });
  return (
    <Box className={`treatment-history-item-info edit ${ isMobile ? "mobile" : "" }`}>
      <Autocomplete
        disablePortal
        options={options}
        sx={{ width: isMobile ? 200 : 300 }}
        onChange={(_, value) => {
          if (!value) return;
          setSelectedPlanItem({
            name: value.name,
            price: value?.price,
            _id: value._id,
            quantity: 1,
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t("service", { keyPrefix: "common" })}
          />
        )}
      />
      <Box
        className={`add-treatment-history-item-control-panel ${
          isMobile ? "mobile" : ""
        }`}
      >
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
          sx={{ maxWidth: "unset" }}
          onClick={() => {
            setSelectedPlan(
              (prev) =>
                prev && {
                  ...prev,
                  items: prev.items.concat(selectedPlanItem ?? []),
                }
            );
            setShowAddPlanItem(false);
          }}
        >
          <SaveIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
