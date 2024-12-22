import { type FC } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";

type Props = { attachments: string[] };

const IMAGES_ENDINGS = [".jpeg", ".png", ".jpg"];

const ImageGallery: FC<Props> = ({ attachments }) => {
  const images = attachments.filter((img) =>
    IMAGES_ENDINGS.some((ext) => img.endsWith(ext))
  );

  const files = attachments.filter(
    (img) => !IMAGES_ENDINGS.some((ext) => img.endsWith(ext))
  );

  const getGalleryCols = (attachmentsCount: number) =>
    [0, 1, 2, 2][attachmentsCount] ?? 3;

  if (attachments.length === 0) return null;

  return (
    <>
      {images.length > 0 && (
        <ImageList
          sx={{ maxWidth: 400, mb: 0 }}
          variant="masonry"
          cols={getGalleryCols(images.length)}
          gap={8}
        >
          {images.map((img) => (
            <ImageListItem key={img}>
              <img
                srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${img}?w=248&fit=crop&auto=format`}
                alt="attachment"
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
      {files.length > 0 && (
        <Box className="file-list">
          {files.map((file) => (
            <a key={file} href={file}>
              {file.split("/").pop()}
            </a>
          ))}
        </Box>
      )}
    </>
  );
};

export default ImageGallery;
