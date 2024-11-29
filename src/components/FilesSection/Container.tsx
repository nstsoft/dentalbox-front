import "./styles.scss";
import { type FC, useEffect, useState } from "react";
import { FileItem, PatientFile } from "@types";
import ImageList from "@mui/material/ImageList";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Button, Typography } from "@mui/material";
import { shortenString } from "@utils";
import { isMobile } from "react-device-detect";
import { FileModal } from "./FileModal";
import {
  useDeletePatientFileMutation,
  useUpdatePatientFileCommentMutation,
  useUploadPatientFileMutation,
} from "@api";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Toaster } from "../Toaster";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@elements";
import { NoData } from "../NoData";

type Props = {
  files: PatientFile[];
  enableAddFile?: boolean;
  isEmptyData?: boolean;
};

export const Files: FC<Props> = ({ files, enableAddFile, isEmptyData }) => {
  const images = files.filter((file) => file.mimeType.includes("image"));
  const rest = files.filter((file) => !file.mimeType.includes("image"));
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<PatientFile | undefined>();
  const [updatePatientFileComment, { error: updateError }] =
    useUpdatePatientFileCommentMutation();
  const [uploadPatientFile, { error: uploadError }] =
    useUploadPatientFileMutation();
  const { t } = useTranslation("", {
    keyPrefix: "pages.patientCard.files",
  });
  const [deletePatientFile] = useDeletePatientFileMutation();
  const { patientId } = useParams();
  const [hoveredElementId, setHoveredElementId] = useState<string>();

  const handleClickOpen = (image: PatientFile) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(undefined);
  };

  const updateFileNotes = (fileData: FileItem) => {
    if (!selectedImage) {
      uploadPatientFile({
        notes: fileData.notes ?? "",
        file: fileData.file!,
        patientId: patientId!,
      });
    } else {
      updatePatientFileComment({ notes: fileData.notes, fileId: fileData.id });
    }
    handleClose();
  };

  const deleteFile = (fileId: string) => {
    deletePatientFile(fileId);
  };

  useEffect(() => {
    if (updateError ?? uploadError) {
      toast.error(
        <Toaster
          actionName={`${updateError ? "Update" : "Upload"} File Error`}
          message={
            (updateError as any)?.data?.message ??
            (uploadError as any)?.data?.message
          }
        />
      );
    }
  }, [updateError, uploadError]);

  return (
    <Box className="files-section">
      {enableAddFile && (
        <Box className={`${isEmptyData && "add-file-button"}`}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            {t("addFile")}
          </Button>
        </Box>
      )}
      <FileModal
        open={open}
        onClose={handleClose}
        fileData={selectedImage}
        onSubmit={updateFileNotes}
      />

      {isEmptyData ? (
        <NoData />
      ) : (
        <>
          {rest.map((file) => (
            <Box className="rest-file-item" key={file._id}>
              <Typography variant="h6">
                <a href={file.url}>{file.name}</a>
              </Typography>
              <Typography>{file.notes}</Typography>
            </Box>
          ))}
          <Divider sx={{ m: 2 }} />
          <ImageList
            variant="quilted"
            cols={isMobile ? 1 : 4}
            gap={10}
            rowHeight={200}
          >
            {images.map((item) => (
              <ImageListItem
                key={item.url}
                sx={{ cursor: "pointer" }}
                onClick={() => handleClickOpen(item)}
                onMouseOver={() => setHoveredElementId(item._id)}
                onMouseOut={() => setHoveredElementId("")}
              >
                <img src={item.url} loading="lazy" />
                {hoveredElementId === item._id && (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFile(item._id);
                    }}
                    sx={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
                <ImageListItemBar
                  title={shortenString(item.notes ?? "", 30)}
                  subtitle={item._id}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </>
      )}
    </Box>
  );
};
