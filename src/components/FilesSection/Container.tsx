import "./styles.scss";
import { type FC, useState } from "react";
import { PatientFile } from "@types";
import ImageList from "@mui/material/ImageList";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Typography } from "@mui/material";
import { shortenString } from "@utils";

type Props = {
  files: PatientFile[];
};

export const Files: FC<Props> = ({ files }) => {
  const images = files.filter((file) => file.mimeType.includes("image"));
  const rest = files.filter((file) => !file.mimeType.includes("image"));
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<PatientFile | undefined>();

  const handleClickOpen = (image: PatientFile) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(undefined);
  };

  return (
    <Box className="files-section">
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
        sx={{ width: "100%" }}
        variant="quilted"
        cols={3}
        gap={8}
        rowHeight={200}
      >
        {images.map((item) => (
          <ImageListItem
            key={item.url}
            sx={{ cursor: "pointer" }}
            onClick={() => handleClickOpen(item)}
          >
            <img src={item.url} loading="lazy" />
            <ImageListItemBar
              title={shortenString(item.notes ?? "", 30)}
              subtitle={item._id}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {selectedImage && (
            <Box>
              <img
                src={selectedImage.url}
                style={{ width: "100%", height: "auto" }}
              />
              <Typography variant="body1">{selectedImage.notes}</Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};
