import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@elements";
import { useRef, type Dispatch, type SetStateAction } from "react";
import type { FileWithDescription, PatientFile } from "@types";
import { useTranslation } from "react-i18next";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type Props = {
  selectedFiles?: PatientFile[];
  files: FileWithDescription[];
  setFiles: Dispatch<SetStateAction<FileWithDescription[]>>;
  removeSelectedFile: (id: string) => void;
};

export const MultipleFileUploadWithDescriptions: React.FC<Props> = ({
  files,
  setFiles,
  selectedFiles,
  removeSelectedFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation("", {
    keyPrefix: "pages.patientCard.history",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files)
        .filter(
          (newFile) =>
            !files.some(
              (existingFile) =>
                existingFile.file.name === newFile.name &&
                existingFile.file.size === newFile.size
            )
        )
        .map((file) => ({
          file,
          description: "",
          id: file.name,
        }));

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDescriptionChange = (id: string, description: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === id ? { ...file, description } : file
      )
    );
  };

  const renderSelectedFile = (file: PatientFile) => {
    return (
      <Box className="exited-file-list" key={file._id}>
        <Typography>{file.name}</Typography>
        <IconButton onClick={() => removeSelectedFile(file._id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  };

  const filesLength = files.length + (selectedFiles?.length ?? 0);

  return (
    <Box className="file-input">
      <Typography variant="h6">
        {t("addFiles")} ( {files.length} )
      </Typography>
      <Box>{selectedFiles?.map(renderSelectedFile)}</Box>
      {files.map((fileWithDesc) => (
        <Box className="item" alignItems="center" key={fileWithDesc.file.name}>
          <Box className="file-name">
            <Typography>{fileWithDesc.file.name}</Typography>
            <IconButton
              onClick={() => {
                setFiles((prev) =>
                  prev.filter((f) => f.id !== fileWithDesc.id)
                );
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          <Box className="input-box">
            <TextField
              label="Description"
              fullWidth
              value={fileWithDesc.description}
              onChange={(e) =>
                handleDescriptionChange(fileWithDesc.id, e.target.value)
              }
            />
          </Box>
        </Box>
      ))}

      {filesLength < 5 && (
        <Button variant="outlined" component="label" sx={{ marginTop: "10px" }}>
          {t("select", { keyPrefix: "buttons" })}
          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="image/*,application/pdf /application/dim "
            multiple
            onChange={handleFileChange}
          />
          <CloudUploadIcon sx={{ marginLeft: "10px" }} />
        </Button>
      )}
    </Box>
  );
};
