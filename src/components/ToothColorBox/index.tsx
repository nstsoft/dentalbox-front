import { Card } from "@elements";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FC, Fragment, useEffect, useState } from "react";
import { ColorPicker } from "./ColorPicker";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ToothColorModal } from "./ToothColorModal";
import { useUpdateMetadataMutation } from "@api";
import { useTranslation } from "react-i18next";

type Props = {
  isEditable: boolean;
  dentalMapColors?: {
    [key: string]: {
      name: string;
      color: string;
    }[];
  };
};

export const ToothColorBox: FC<Props> = ({ dentalMapColors, isEditable }) => {
  const { t } = useTranslation("", {
    keyPrefix: "pages.patientCard.dentalMap",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [rootColors, setRootColors] = useState(dentalMapColors?.root ?? []);
  const [crownColors, setCrownColors] = useState(dentalMapColors?.crown ?? []);
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const [updateMetadata, { error }] = useUpdateMetadataMutation();

  useEffect(() => {
    if (dentalMapColors) {
      setRootColors((prevState) =>
        (dentalMapColors.root ?? []).map(
          (color) => prevState.find(({ name }) => name === color.name) ?? color
        )
      );
      setCrownColors((prevState) =>
        (dentalMapColors.crown ?? []).map(
          (color) => prevState.find(({ name }) => name === color.name) ?? color
        )
      );
    }
  }, [dentalMapColors]);

  const onCreateHandler = (newColor: { name: string; color: string }) => {
    const isNameExists =
      type === "root"
        ? rootColors.some((color) => color.name === newColor.name)
        : crownColors.some((color) => color.name === newColor.name);
    if (!isNameExists) {
      setIsOpen(false);
      setType("");
      updateMetadata({
        dentalMapColors: {
          root:
            type === "root"
              ? [...(dentalMapColors?.root ?? []), newColor]
              : dentalMapColors?.root,
          crown:
            type === "crown"
              ? [...(dentalMapColors?.crown ?? []), newColor]
              : dentalMapColors?.crown,
        },
      });
    }
  };

  const onUpdateHandler = () => {
    updateMetadata({
      dentalMapColors: {
        root: rootColors,
        crown: crownColors,
      },
    });
    setIsEdit(false);
  };

  if (!dentalMapColors) return null;

  return (
    <>
      {isEditable && (
        <Button
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={() => setIsEdit((prev) => !prev)}
        >
          {isEdit ? <CloseIcon /> : <EditIcon />}
        </Button>
      )}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h3">{t("root")}</Typography>
            <Button
              onClick={() => {
                setIsOpen(true);
                setType("root");
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "30px",
              }}
            >
              <AddCircleOutlineIcon />
            </Button>
          </Box>
          {rootColors.map((rootColor) => (
            <Fragment key={rootColor.name}>
              {isEdit ? (
                <ColorPicker
                  color={rootColor}
                  onChange={(updatedColor) =>
                    setRootColors((prevState) =>
                      prevState.map((color) =>
                        color.name === rootColor.name ? updatedColor : color
                      )
                    )
                  }
                />
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>{rootColor.name}:</Typography>
                  <Box
                    sx={{
                      width: "10px",
                      height: "10px",
                      bgcolor: rootColor.color,
                      borderRadius: "50%",
                      ml: 1,
                    }}
                  />
                </Box>
              )}
            </Fragment>
          ))}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h3">{t("crown")}</Typography>
            <Button
              onClick={() => {
                setIsOpen(true);
                setType("crown");
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "30px",
              }}
            >
              <AddCircleOutlineIcon />
            </Button>
          </Box>
          {crownColors.map((crownColor) => (
            <Fragment key={crownColor.name}>
              {isEdit ? (
                <ColorPicker
                  color={crownColor}
                  onChange={(updatedColor) =>
                    setCrownColors((prevState) =>
                      prevState.map((color) =>
                        color.name === crownColor.name ? updatedColor : color
                      )
                    )
                  }
                />
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>{crownColor.name}:</Typography>
                  <Box
                    sx={{
                      width: "10px",
                      height: "10px",
                      bgcolor: crownColor.color,
                      borderRadius: "50%",
                      ml: 1,
                    }}
                  />
                </Box>
              )}
            </Fragment>
          ))}
        </Box>
      </Box>
      {isEdit && (
        <Button onClick={onUpdateHandler}>
          {t("save", { keyPrefix: "buttons" })}
        </Button>
      )}
      <ToothColorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreate={onCreateHandler}
      />
    </>
  );
};
