import { VisuallyHiddenInput } from "@elements";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { ChangeEvent, type FC, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";

type Props = {
  image: string;
  onUpload: (file: File) => void;
};

export const AvatarUpload: FC<Props> = ({ image, onUpload }) => {
  const { t } = useTranslation("", { keyPrefix: "image" });
  const [imageUrl, setImageUrl] = useState<string>(image);
  const [imageMessage, setImageMessage] = useState<string>();

  useEffect(() => {
    setImageUrl(image);
  }, [image]);

  return (
    <FormControl sx={{ mb: 2, flexDirection: "row" }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          sx={{ width: "70px", height: "70px", borderRadius: "50%" }}
          component="img"
          image={imageUrl}
          alt={imageUrl}
        />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            p: 0,
            minWidth: "30px",
          }}
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
