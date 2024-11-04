import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@elements";
import { useRef, type Dispatch, type SetStateAction } from "react";
import { FileWithDescription } from "@types";

type Props = {
  files: FileWithDescription[];
  setFiles: Dispatch<SetStateAction<FileWithDescription[]>>;
};

export const MultipleFileUploadWithDescriptions: React.FC<Props> = ({
  files,
  setFiles,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map((file) => ({
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

  return (
    <Box className="file-input">
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
      <Typography variant="h6">Upload Files with Descriptions</Typography>
      {files.length <= 5 && (
        <Button variant="contained" component="label">
          Select Files
          <input
            ref={fileInputRef}
            type="file"
            hidden
            multiple
            onChange={handleFileChange}
          />
        </Button>
      )}
    </Box>
  );
};
