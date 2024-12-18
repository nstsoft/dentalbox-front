import { useState, useEffect, type FC } from "react";
import { ImageList, ImageListItem } from "@mui/material";

type Props = {
  attachments: string[];
};

type ImageSize = {
  width: number;
  height: number;
};

const ImageGallery: FC<Props> = ({ attachments }) => {
  const [images, setImages] = useState<
    { url: string; rows: number; cols: number }[]
  >([]);

  const getImageSize = (url: string): Promise<ImageSize> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = () => resolve({ width: 1, height: 1 });
    });
  };

  const calculateImageSize = (size: ImageSize) => {
    const aspectRatio = size.width / size.height;

    const cols = aspectRatio > 1.5 ? 1 : 2;
    const rows = aspectRatio > 1.5 ? 2 : 1;

    return { rows, cols };
  };

  useEffect(() => {
    const fetchImageSizes = async () => {
      const imageSizes = await Promise.all(
        attachments.map(async (url) => {
          const { width, height } = await getImageSize(url);
          const { rows, cols } = calculateImageSize({ width, height });
          return { url, rows, cols };
        })
      );
      setImages(imageSizes);
    };

    fetchImageSizes();
  }, [attachments]);

  const getGalleryCols = (attachmentsCount: number) => {
    console.log(attachmentsCount);
    if (attachmentsCount === 1) return 1;
    if (attachmentsCount <= 3) return 2;
    return 3;
  };

  return (
    <>
      {attachments.length > 0 && (
        <ImageList
          sx={{ maxWidth: 300 }}
          variant="quilted"
          cols={getGalleryCols(attachments.length)}
        >
          {images.map(({ url, rows, cols }) => (
            <ImageListItem key={url} cols={cols} rows={rows}>
              <img src={url} alt="attachment" loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </>
  );
};

export default ImageGallery;
