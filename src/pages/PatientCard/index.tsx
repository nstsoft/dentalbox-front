import { useGetPatientByIdQuery } from "@api";
import { useParams } from "react-router-dom";
import { DentalMap } from "./components";

export const PatientCardPage = () => {
  const { patientId } = useParams();
  const { data } = useGetPatientByIdQuery(patientId!);

  if (!patientId || !data) return null;
  return (
    <div>
      PatientCard
      <DentalMap patientId={patientId} />
    </div>
  );
};
