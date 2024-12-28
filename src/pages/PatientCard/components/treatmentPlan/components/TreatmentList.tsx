import { type FC, useState, useEffect } from "react";
import { TreatmentPlan, PlanItem, Service } from "@types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@elements";
import days from "dayjs";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { EditItem } from "./EditItem";
import {
  useDeleteTreatmentPlanMutation,
  useUpdateTreatmentPlanItemMutation,
} from "@api";
import { isMobile } from "react-device-detect";
import { DepositModal } from "./DepositModal";
import { DeleteModal } from "./DeleteModal";

type Props = { items: TreatmentPlan[]; services: Service[] };

export const TreatmentList: FC<Props> = ({ items, services }) => {
  const theme = useTheme();
  const [edited, setIsEdited] = useState<string>();
  const [itemsList, setItemsList] = useState(items);
  const [showAddPlanItem, setShowAddPlanItem] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<TreatmentPlan | null>(null);
  const [selectedPlanItem, setSelectedPlanItem] = useState<PlanItem | null>(
    null
  );
  const { t } = useTranslation("", {
    keyPrefix: "pages.patientCard.treatmentPlan",
  });
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [updateTreatmentPlanItem] = useUpdateTreatmentPlanItemMutation();
  const [deleteTreatmentPlanItem] = useDeleteTreatmentPlanMutation();

  useEffect(() => {
    if (selectedPlan) {
      setItemsList((prev) =>
        prev.map((el) => {
          return selectedPlan && el._id === selectedPlan._id
            ? selectedPlan
            : el;
        })
      );
    }
  }, [selectedPlan]);

  useEffect(() => {
    setItemsList(items);
  }, [items]);

  const renderViewMode = (plan: TreatmentPlan) => {
    return plan.items.map((item) => (
      <Box className="treatment-history-item" key={item._id}>
        <Box
          className={`treatment-history-item-info ${isMobile ? "mobile" : ""}`}
        >
          <Typography>{item.name}</Typography>
          <Box className="treatment-history-item-info-price">
            <Typography variant="h6">
              {item.price} {plan.currency}
            </Typography>
            <Typography>x {item.quantity}</Typography>
          </Box>
        </Box>
      </Box>
    ));
  };

  const renderEditMode = () => {
    if (!selectedPlan) return null;

    const existedIds = selectedPlan.items.map((item) => item._id);

    const options = services
      .filter(({ _id }) => !existedIds.includes(_id))
      .map((service) => ({
        label: service.name,
        value: service._id,
        ...service,
      }));

    return (
      <Box className="treatment-history-item add">
        <IconButton onClick={() => setShowAddPlanItem(true)}>
          <AddIcon />
        </IconButton>
        {showAddPlanItem && (
          <EditItem
            selectedPlanItem={selectedPlanItem}
            options={options}
            setSelectedPlanItem={setSelectedPlanItem}
            setSelectedPlan={setSelectedPlan}
            setShowAddPlanItem={setShowAddPlanItem}
          />
        )}
        {renderViewMode(selectedPlan)}
      </Box>
    );
  };

  const onSaveEditedItem = () => {
    if (!selectedPlan) return;

    setIsEdited(undefined);
    setSelectedPlan(null);

    updateTreatmentPlanItem({
      plan: selectedPlan._id,
      data: {
        items: selectedPlan.items,
        deposit: selectedPlan.deposit,
        currency: selectedPlan.currency,
        date: selectedPlan.date,
      },
    });
  };

  const onDeposit = (deposit: number) => {
    if (!selectedPlan) return;

    updateTreatmentPlanItem({
      plan: selectedPlan._id,
      data: {
        items: selectedPlan.items,
        deposit: deposit,
        currency: selectedPlan.currency,
        date: selectedPlan.date,
      },
    });
    setIsDepositModalOpen(false);
  };

  const onDelete = () => {
    if (!selectedPlan) return;
    setIsDeleteModalOpen(false);
    deleteTreatmentPlanItem(selectedPlan._id);
  };

  return (
    <Box className="treatment-history">
      {itemsList.map(({ items, ...treatmentItem }) => {
        const total = items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        return (
          <Accordion key={treatmentItem._id} className="history-accordion-item">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box className="history-summary">
                <Typography>
                  {days(treatmentItem.date).format("YYYY MMMM DD")}
                </Typography>
                <Box className="treatment-history-header-pricing">
                  <Box className="treatment-history-header-pricing-item">
                    <Typography>{t("total")}</Typography>
                    <Typography variant="h6">
                      {total}
                      {treatmentItem.currency}
                    </Typography>
                  </Box>
                  <Box
                    className="treatment-history-header-pricing-item"
                    color={
                      total < treatmentItem.deposit
                        ? theme.palette.error.main
                        : theme.palette.warning.main
                    }
                  >
                    <Typography>{t("deposit")}</Typography>
                    <Typography variant="h6">
                      {treatmentItem.deposit}
                      {treatmentItem.currency}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box className="treatment-history-actions">
                <Button
                  onClick={() => {
                    setSelectedPlan({ ...treatmentItem, items });
                    setIsDepositModalOpen(true);
                  }}
                >
                  {t("payed")}
                </Button>
                {edited === treatmentItem._id ? (
                  <>
                    <IconButton onClick={onSaveEditedItem}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setSelectedPlan(null);
                        setIsEdited(undefined);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    onClick={() => {
                      setSelectedPlan({ ...treatmentItem, items });
                      setIsEdited(treatmentItem._id);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                )}

                <IconButton>
                  <DeleteIcon
                    onClick={() => {
                      setSelectedPlan({ ...treatmentItem, items });
                      setIsDeleteModalOpen(true);
                    }}
                  />
                </IconButton>
              </Box>
              {edited === treatmentItem._id
                ? renderEditMode()
                : renderViewMode({ ...treatmentItem, items })}
            </AccordionDetails>
          </Accordion>
        );
      })}
      <DepositModal
        open={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        selectedPlan={selectedPlan}
        onSubmit={onDeposit}
      />
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSubmit={onDelete}
      />
    </Box>
  );
};
