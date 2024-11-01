import { type FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ColorPicker } from "./ColorPicker";

type ColorItem = { name: string; color: string; id: string };

type Props = {
  editingMode: boolean;
  item: ColorItem;
  setColor: (item: ColorItem) => void;
  onDelete: (id: string) => void;
};

export const ColorItem: FC<Props> = ({
  editingMode,
  item,
  setColor,
  onDelete,
}) => {
  return (
    <Box className={"color-box-item"} key={item.id}>
      {editingMode ? (
        <ColorPicker
          color={item}
          onChange={(value) => {
            setColor({ ...value, id: item.id });
          }}
          onDelete={onDelete}
        />
      ) : (
        <>
          <Typography>{item.name}:</Typography>
          <Box
            className="color-background"
            sx={{
              bgcolor: item.color,
            }}
          />
        </>
      )}
    </Box>
  );
};
