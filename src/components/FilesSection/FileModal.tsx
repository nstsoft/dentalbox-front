import {
  CustomModal,
  IconButton,
  Textarea,
  VisuallyHiddenInput,
} from "@elements";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ChangeEvent, useEffect, useState, type FC } from "react";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { FileItem, PatientFile } from "@types";
import EditIcon from "@mui/icons-material/Edit";

import "./styles.scss";

type Props = {
  open: boolean;
  onClose: () => void;
  fileData?: PatientFile;
  onSubmit?: (data: FileItem & { patientId: string }) => void;
};

export const FileModal: FC<Props> = ({ open, onClose, fileData, onSubmit }) => {
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [isEditingMode, setIsEditingMode] = useState(true);
  const { t } = useTranslation("", {
    keyPrefix: "pages.patientCard.files",
  });

  useEffect(() => {
    if (fileData) {
      setFileUrl(fileData.url);
      setNotes(fileData.notes ?? "");
      setIsEditingMode(false);
    }
  }, [fileData]);

  const saveFile = () => {
    onSubmit?.({
      notes,
      file,
      id: fileData?._id ?? "",
      patientId: fileData?.patient ?? "",
    });
  };

  return (
    <CustomModal
      open={open}
      onClose={() => {
        onClose();
        setFileUrl("");
        setNotes("");
        setIsEditingMode(true);
      }}
      sx={{
        minWidth: isMobile ? "100%" : "500px",
        position: "relative",
      }}
    >
      <>
        {!isEditingMode && (
          <IconButton
            onClick={() => setIsEditingMode((prev) => !prev)}
            sx={{ position: "absolute", top: "15px", right: "45px" }}
          >
            <EditIcon />
          </IconButton>
        )}
        <Box
          className="file-box"
          sx={{ border: fileUrl ? "none" : "3px dashed gray" }}
        >
          {fileData ? (
            <img className="image" src={fileUrl} loading="lazy" />
          ) : (
            <Button
              className="upload-button"
              component="label"
              role={undefined}
              variant="text"
              tabIndex={-1}
              sx={{ background: `url(${fileUrl})` }}
            >
              {!fileUrl && <span>{t("select")}</span>}
              <VisuallyHiddenInput
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    setFile(file);
                    reader.onloadend = () => {
                      setFileUrl(`${reader.result}`);
                    };
                    reader.onerror = () => {};
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </Button>
          )}
        </Box>

        {isEditingMode ? (
          <Textarea
            placeholder={t("notes")}
            sx={{ width: "100%", p: 1, mb: 1 }}
            minRows={2}
            maxRows={3}
            value={notes}
            onChange={({ target }) => setNotes(target.value)}
          />
        ) : (
          <Typography variant="body1">{notes}</Typography>
        )}

        {isEditingMode && (
          <Box>
            <Button variant="contained" onClick={saveFile}>
              {t("saveFile")}
            </Button>
          </Box>
        )}
      </>
    </CustomModal>
  );
};
