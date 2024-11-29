import { useGetFilesQuery } from "@api";
import { Files, Loader } from "@components";
import Box from "@mui/material/Box";
import { type FC } from "react";

type Props = {
  patientId: string;
};

export const PatientFiles: FC<Props> = ({ patientId }) => {
  const { data: files, isLoading } = useGetFilesQuery(patientId);

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ pt: 1 }}>
      <Files
        files={files?.data ?? []}
        enableAddFile
        isEmptyData={!files?.data.length}
      />
    </Box>
  );
};
