import { useGetFilesQuery } from "@api";
import { Files } from "@components";
import Box from "@mui/material/Box";
import { type FC } from "react";

type Props = {
  patientId: string;
};

export const PatientFiles: FC<Props> = ({ patientId }) => {
  const { data: files } = useGetFilesQuery(patientId);

  if (!files) return null;

  return (
    <Box sx={{ pt: 1 }}>
      <Files files={files.data ?? []} enableAddFile />
    </Box>
  );
};
