import "./styles.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  useLazyGetHistoryItemsQuery,
  useCreateHistoryItemMutation,
  useUpdateHistoryItemMutation,
  useDeleteHistoryItemMutation,
} from "@api";
import { type FC, useEffect, useState } from "react";
import { ControlPanel, AccordionItem } from "./components";
import { Dayjs } from "dayjs";
import days from "dayjs";
import {
  HistoryData,
  FileWithDescription,
  HistoryResponse,
  PatientFile,
} from "@types";
import { CustomModal } from "@elements";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = { patientId: string };

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

type SelectedItem = HistoryData & {
  selectedFiles?: PatientFile[];
};

export const CaseHistory: FC<Props> = ({ patientId }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard.history" });
  const [dateFilter, setDateFilter] = useState<{
    to?: Dayjs | null;
    from?: Dayjs | null;
  }>({
    from: null,
    to: null,
  });

  const [isOpenAddUpdateModal, setIsOpenAddUpdateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState<string | undefined>();

  const [fetchHistory, { data }] = useLazyGetHistoryItemsQuery();
  const [create, { isSuccess }] = useCreateHistoryItemMutation();
  const [deleteItem] = useDeleteHistoryItemMutation();
  const [update, { isSuccess: isSuccessUpdate }] =
    useUpdateHistoryItemMutation();
  const [historyData, setHistoryData] = useState<HistoryResponse[]>([]);

  const [selectedHistoryItem, setSelectedHistoryItem] =
    useState<SelectedItem>(initialData);

  const [files, setFiles] = useState<FileWithDescription[]>([]);

  const onSubmitModal = () => {
    const descriptions = files.reduce(
      (acc, fileElem) => ({
        ...acc,
        [fileElem.file.name]: fileElem.description,
      }),
      {} as { [key: string]: string }
    );

    const { selectedFiles, ...item } = {
      ...selectedHistoryItem,
      patient: patientId,
      date: (selectedHistoryItem.date ?? days()).toISOString(),
      files: files.map((file) => file.file),
      selectedFiles: selectedHistoryItem.selectedFiles?.map((file) => ({
        _id: file._id,
        notes: file.notes,
      })),
      ...descriptions,
    };

    if (selectedHistoryItem._id) {
      update({ selectedFiles, ...item });
    } else {
      create(item);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchHistory({ patientId });
    }
  }, [fetchHistory, patientId]);

  useEffect(() => {
    if (data?.length) {
      const dateFiltered = data.filter(({ date }) => {
        let withinRange = true;
        if (
          dateFilter.from &&
          days(date).isBefore(dateFilter.from.startOf("day"))
        ) {
          withinRange = false;
        }
        if (dateFilter.to && days(date).isAfter(dateFilter.to.endOf("day"))) {
          withinRange = false;
        }
        return withinRange;
      });
      setHistoryData(dateFiltered);
    }
  }, [data, dateFilter.from, dateFilter.to]);

  useEffect(() => {
    if (isSuccess || isSuccessUpdate) {
      setIsOpenAddUpdateModal(false);
      setSelectedHistoryItem(initialData);
      setFiles([]);
    }
  }, [isSuccess, isSuccessUpdate]);

  return (
    <Box className="case-history">
      <CustomModal
        open={isOpenDeleteModal}
        onClose={() => {
          setItemIdToDelete(undefined);
          setIsOpenDeleteModal(false);
        }}
      >
        <Box>
          <Box>
            <Typography variant="h4"> {t("confirmDelete")}</Typography>
          </Box>
          <Box mt={2}>
            <Button
              onClick={() => {
                setItemIdToDelete(undefined);
                setIsOpenDeleteModal(false);
              }}
              sx={{ marginRight: "10px" }}
              variant="contained"
            >
              {t("cancel", { keyPrefix: "buttons" })}
            </Button>
            <Button
              onClick={() => {
                if (itemIdToDelete) {
                  deleteItem(itemIdToDelete);
                  setItemIdToDelete(undefined);
                  setIsOpenDeleteModal(false);
                }
              }}
              variant="outlined"
            >
              {t("delete", { keyPrefix: "buttons" })}
            </Button>
          </Box>
        </Box>
      </CustomModal>
      <ControlPanel
        isOpen={isOpenAddUpdateModal}
        setIsOpen={setIsOpenAddUpdateModal}
        onSubmitModal={onSubmitModal}
        setHistoryData={(data) => {
          setSelectedHistoryItem((prev) => ({ ...prev, ...data }));
        }}
        onCloseModal={() => {
          setSelectedHistoryItem(initialData);
          setFiles([]);
          setIsOpenAddUpdateModal(false);
        }}
        files={files}
        setFiles={setFiles}
        selectedHistoryItem={selectedHistoryItem}
        resetDates={() => setDateFilter({ from: null, to: null })}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
      <Box className="history-container">
        {historyData?.map((item) => (
          <AccordionItem
            onSelectDeleteItem={(id: string) => {
              setItemIdToDelete(id);
              setIsOpenDeleteModal(true);
            }}
            onEdit={(item) => {
              setSelectedHistoryItem({
                ...item,
                date: days(item.date),
                selectedFiles: item.files,
                files: [],
              });
              setIsOpenAddUpdateModal(true);
            }}
            key={item._id}
            item={item}
          />
        ))}
      </Box>
    </Box>
  );
};
