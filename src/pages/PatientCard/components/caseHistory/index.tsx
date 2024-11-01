import Box from "@mui/material/Box";
import { useGetHistoryItemsQuery } from "@api";
import { type FC } from "react";

type Props = {
  patientId: string;
};

export const CaseHistory: FC<Props> = ({ patientId }) => {
  const { data } = useGetHistoryItemsQuery(patientId);
  console.log(data);
  return (
    <Box>
      <div>case history</div>
    </Box>
  );
};
