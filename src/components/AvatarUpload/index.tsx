import { VisuallyHiddenInput } from "@elements";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { ChangeEvent, type FC, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";
import Avatar from "@mui/material/Avatar";

import "./styles.scss";

type Props = {
  image: string;
  onUpload: (file: File) => void;
  getImage?: (image: string) => void;
};

export const AvatarUpload: FC<Props> = ({ image, onUpload, getImage }) => {
  const { t } = useTranslation("", { keyPrefix: "image" });
  const [imageUrl, setImageUrl] = useState<string>(image);
  const [imageMessage, setImageMessage] = useState<string>();

  useEffect(() => {
    setImageUrl(image);
  }, [image]);

  return (
    <FormControl className="avatar-upload" sx={{ mb: 2, flexDirection: "row" }}>
      <Box sx={{ position: "relative" }}>
        <Avatar className="avatar-icon" src={imageUrl} alt={imageUrl} />
        <Button
          className="button"
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
        >
          <EditIcon />
          <VisuallyHiddenInput
            id="staffImage"
            name="staffImage"
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                onUpload(file);
                reader.onloadend = () => {
                  setImageUrl(`${reader.result}`);
                  getImage?.(`${reader.result}`);
                  setImageMessage(t("success"));
                };
                reader.onerror = () => {
                  setImageMessage(t("error"));
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </Button>
      </Box>
      {imageMessage && <FormHelperText>{imageMessage}</FormHelperText>}
    </FormControl>
  );
};
