import { type FC } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

type Props = { attachments: string[] };

const ImageGallery: FC<Props> = ({ attachments }) => {
  const getGalleryCols = (attachmentsCount: number) => {
    if (attachmentsCount === 1) return 1;
    if (attachmentsCount <= 3) return 2;
    return 3;
  };

  if (attachments.length === 0) return null;

  return (
    <ImageList
      sx={{ maxWidth: 400 }}
      variant="masonry"
      cols={getGalleryCols(attachments.length)}
      gap={8}
    >
      {attachments.map((img) => (
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
  );
};

export default ImageGallery;
