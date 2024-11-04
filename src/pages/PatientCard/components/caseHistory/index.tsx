import "./styles.scss";
import Box from "@mui/material/Box";
import {
  useLazyGetHistoryItemsQuery,
  useCreateHistoryItemMutation,
} from "@api";
import { type FC, useEffect, useState } from "react";
import { ControlPanel } from "./components";
import { Dayjs } from "dayjs";
import days from "dayjs";
import { HistoryData, FileWithDescription } from "@types";

type Props = { patientId: string; dateFilter: { to?: Dayjs; from?: Dayjs } };

const initialData = {
  date: days(),
  diagnosis: "",
  treatment: "",
  complaints: "",
  anamnesis: "",
  materials: "",
  anesthesia: "",
  notes: "",
  objectiveData: "",
  files: [],
};

export const CaseHistory: FC<Props> = ({ patientId }) => {
  const [dateFilter, setDateFilter] = useState<{ to?: Dayjs; from?: Dayjs }>(
    {}
  );

  const [isOpen, setIsOpen] = useState(true);

  const [fetchHistory, { data, isUninitialized }] =
    useLazyGetHistoryItemsQuery();

  const [create, { isSuccess }] = useCreateHistoryItemMutation();

  const [caseHistory, setCaseHistory] = useState<HistoryData>(initialData);
  const [files, setFiles] = useState<FileWithDescription[]>([]);

  const onCreate = () => {
    const descriptions = files.reduce(
      (acc, fileElem) => ({
        ...acc,
        [fileElem.file.name]: fileElem.description,
      }),
      {} as { [key: string]: string }
    );

    create({
      ...caseHistory,
      patient: patientId,
      date: (caseHistory.date ?? days()).toISOString(),
      files: files.map((file) => file.file),
      ...descriptions,
    });
  };

  useEffect(() => {
    if (isUninitialized) {
      fetchHistory({ patientId });
    }
  }, [fetchHistory, isUninitialized, patientId]);

  const apply = () => {
    fetchHistory({
      patientId,
      from: dateFilter?.from?.toISOString(),
      to: dateFilter?.to?.toISOString(),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  return (
    <Box className="case-history">
      <ControlPanel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmitCreate={onCreate}
        setHistoryData={(data) =>
          setCaseHistory((prev) => ({ ...prev, ...data }))
        }
        files={files}
        setFiles={setFiles}
        historyItem={caseHistory}
        apply={apply}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
      <div>case history</div>
    </Box>
  );
};
