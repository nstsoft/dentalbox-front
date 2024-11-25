import "./style.scss";
import { useState, type FC } from "react";
import {
  useGetTreatmentPlanListQuery,
  useGetServicesQuery,
  useCreateTreatmentPlanMutation,
} from "@api";
import { Modal, TreatmentList } from "./components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { PlanItem } from "@types";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NoData } from "@components";

type Props = {
  patientId: string;
};

export const TreatmentPlan: FC<Props> = ({ patientId }) => {
  const { data } = useGetTreatmentPlanListQuery(patientId);
  const { data: services } = useGetServicesQuery();
  const [createTreatment] = useCreateTreatmentPlanMutation();
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const { t } = useTranslation("", { keyPrefix: "buttons" });

  const onCreateTreatment = (items: PlanItem[]) => {
    const updatedItems: { [key: string]: number } = {};

    items.forEach((item) => {
      updatedItems[item._id as string] = item.quantity;
    });

    if (params.patientId && items.length) {
      createTreatment({
        patient: params.patientId,
        items: updatedItems,
      });
      setShowModal(false);
    }
  };

  return (
    <Box className="treatment-plan">
      <Box mt="10px" mb="10px">
        <Button variant="contained" onClick={() => setShowModal(true)}>
          {t("addRecord", { keyPrefix: "buttons" })}
        </Button>
      </Box>
      {!data || !services?.length ? (
        <NoData />
      ) : (
        <>
          <TreatmentList services={services} items={data} />
          <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
            services={services}
            onSubmit={onCreateTreatment}
          />
        </>
      )}
    </Box>
  );
};
