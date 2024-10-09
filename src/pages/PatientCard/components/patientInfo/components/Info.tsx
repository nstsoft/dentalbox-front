import type { FC, Dispatch, SetStateAction } from "react";
import moment from "moment";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Patient } from "@types";

import { useTranslation } from "react-i18next";

type Field = {
  id: string;
  label: string;
  value?: string;
  type?: string;
  error?: string;
  setPatientData: Dispatch<SetStateAction<Patient>>;
  onError?: (error: string | Error | null) => void;
};

type Props = {
  fields: Field[];
};

export const InfoSection: FC<Props> = ({ fields }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard" });

  const renderValue = (field: Field) => {
    if (field.id === "sex" && field.value) return t(`sexItems.${field.value}`);
    if (field.id === "dob" && field.value)
      return moment(field.value).format("YYYY/MM/DD");
    return field.value;
  };
  return (
    <>
      {fields.map((field) => (
        <Box
          key={field.id}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            height: "30px",
            alignItems: "center",
            mb: 1,
          }}
        >
          <>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", minWidth: "130px" }}
            >
              {field.label}:
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {renderValue(field)}
            </Typography>
          </>
        </Box>
      ))}
    </>
  );
};
