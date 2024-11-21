import "./ToothColorBox.scss";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { type FC, useEffect, useState, useCallback } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Card, IconButton } from "@elements";
import { ToothColorModal, ColorItem } from "./components";
import { useUpdateMetadataMutation } from "@api";
import { useTranslation } from "react-i18next";

const generateColorId = () => {
  return `color_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

type Props = {
  isEditable: boolean;
  dentalMapColors?: {
    [key in "crown" | "root"]: { name: string; color: string }[];
  };
};

type ColorItem = { name: string; color: string; id: string };

export const ToothColorBox: FC<Props> = ({ dentalMapColors, isEditable }) => {
  const { t } = useTranslation("", {
    keyPrefix: "components.toothMapLegend",
  });
  const [isEditingMode, setIsEditingMod] = useState(false);
  const [rootColors, setRootColors] = useState<ColorItem[]>([]);
  const [crownColors, setCrownColors] = useState<ColorItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const [callUpdateMethod, setCallUpdateMethod] = useState(false);
  const [updateMetadata] = useUpdateMetadataMutation();

  const onUpdateColors = useCallback(() => {
    updateMetadata({
      dentalMapColors: {
        root: rootColors.map((color) => ({
          name: color.name,
          color: color.color,
        })),
        crown: crownColors.map((color) => ({
          name: color.name,
          color: color.color,
        })),
      },
    });
  }, [updateMetadata, rootColors, crownColors]);

  useEffect(() => {
    if (dentalMapColors) {
      setRootColors(
        dentalMapColors.root.map((color) => ({
          ...color,
          id: generateColorId(),
        }))
      );
      setCrownColors(
        dentalMapColors.crown.map((color) => ({
          ...color,
          id: generateColorId(),
        }))
      );
    }
  }, [dentalMapColors]);

  useEffect(() => {
    if (callUpdateMethod) {
      onUpdateColors();
      setCallUpdateMethod(false);
    }
  }, [callUpdateMethod, onUpdateColors]);

  const updateColorSet =
    (colorType: "crown" | "root") =>
    (newColor: { name: string; color: string; id: string }) => {
      (colorType == "root" ? setRootColors : setCrownColors)((prevState) => {
        return prevState.map((color) =>
          color.id === newColor.id ? newColor : color
        );
      });
    };

  const onAddNewColor = (color: { name: string; color: string }) => {
    (type === "root" ? setRootColors : setCrownColors)((prev) => [
      ...prev,
      { ...color, id: generateColorId() },
    ]);
  };

  const onRemoveColor = (id: string, removeType: "crown" | "root") => {
    (removeType === "root" ? setRootColors : setCrownColors)((prev) =>
      prev.filter((color) => color.id !== id)
    );
  };

  if (!dentalMapColors) return null;

  return (
    <Card className="tooth-color-box" sx={{ m: 0, gap: 0 }}>
      <Box
        className={
          "edit-btn-box" + (isEditable ? " editable" : " not-editable")
        }
      >
        <IconButton onClick={() => setIsEditingMod((prev) => !prev)}>
          {isEditingMode ? <CloseIcon /> : <EditIcon />}
        </IconButton>
      </Box>

      <Box className={"colors-container" + (isEditingMode ? " editing" : "")}>
        <Box className="colors-box root">
          <Box className="color-box-item">
            <Typography variant="h3">{t("root")}</Typography>
            <IconButton
              onClick={() => {
                setIsOpen(true);
                setType("root");
              }}
            >
              {isEditable && <AddCircleOutlineIcon />}
            </IconButton>
          </Box>
          {rootColors.map((color) => (
            <ColorItem
              key={color.id}
              item={color}
              setColor={updateColorSet("root")}
              editingMode={isEditingMode}
              onDelete={(id: string) => {
                onRemoveColor(id, "root");
                setCallUpdateMethod(true);
              }}
            />
          ))}
        </Box>
        <Box className="colors-box crown">
          <Box className="color-box-item">
            <Typography variant="h3">{t("crown")}</Typography>
            <IconButton
              onClick={() => {
                setIsOpen(true);
                setType("crown");
              }}
            >
              {isEditable && <AddCircleOutlineIcon />}
            </IconButton>
          </Box>
          {crownColors.map((color) => (
            <ColorItem
              key={color.id}
              item={color}
              setColor={updateColorSet("crown")}
              editingMode={isEditingMode}
              onDelete={(id: string) => {
                onRemoveColor(id, "crown");
                setCallUpdateMethod(true);
              }}
            />
          ))}
        </Box>
      </Box>
      {isEditingMode && (
        <Button onClick={onUpdateColors}>
          {t("save", { keyPrefix: "buttons" })}
        </Button>
      )}
      <ToothColorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreate={(color) => {
          onAddNewColor(color);
          setIsOpen(false);
          setCallUpdateMethod(true);
        }}
      />
    </Card>
  );
};
