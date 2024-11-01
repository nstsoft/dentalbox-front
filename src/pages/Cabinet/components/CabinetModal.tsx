import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import Modal from "@mui/material/Modal";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useTranslation } from "react-i18next";
import { useCreateCabinetMutation, useUpdateCabinetMutation } from "@api";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { VisuallyHiddenInput } from "@elements";
import { CabinetForm } from "../types";

type CabinetModalProps = {
  cabinetForm: CabinetForm & { _id?: string };
  setCabinetForm: Dispatch<SetStateAction<CabinetForm & { _id?: string }>>;
  open: boolean;
  onClose: () => void;
};

export const CabinetModal: FC<CabinetModalProps> = ({
  open,
  onClose,
  cabinetForm,
  setCabinetForm,
}) => {
  const { t } = useTranslation();
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [responseError, setResponseError] = useState<string | string[]>();
  const [cabinetImage, setCabinetImage] = useState<File>();

  const [createCabinet, { error, isSuccess }] = useCreateCabinetMutation();
  const [updateCabinet, { error: updateError, isSuccess: updateSuccess }] =
    useUpdateCabinetMutation();

  const fieldsMap = [
    {
      id: "name",
      label: t("pages.cabinet.name"),
      value: cabinetForm.name,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setCabinetForm((prevState) => ({
          ...prevState,
          name: event.target.value,
        })),
    },
    {
      id: "phone",
      label: t("pages.cabinet.phone"),
      value: cabinetForm.phone,
    },
    {
      id: "address",
      label: t("pages.cabinet.address"),
      value: cabinetForm.address,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setCabinetForm((prevState) => ({
          ...prevState,
          address: event.target.value,
        })),
    },
    {
      id: "notes",
      label: t("pages.cabinet.notes"),
      value: cabinetForm.notes,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setCabinetForm((prevState) => ({
          ...prevState,
          notes: event.target.value,
        })),
    },
  ];

  useEffect(() => {
    if (error ?? updateError) {
      setResponseError(((error as any) ?? (updateError as any)).message);
    }
  }, [error, updateError]);

  useEffect(() => {
    if (isSuccess ?? updateSuccess) {
      onClose();
    }
  }, [isSuccess, updateSuccess, onClose]);

  const validateForm = () => {
    setPhoneError("");
    setImageError("");

    if (!matchIsValidTel(cabinetForm.phone)) {
      setPhoneError("Please enter a valid phone number.");
      return false;
    }

    if ((cabinetForm._id && !cabinetForm.image) ?? !cabinetImage) {
      setImageError("Please upload cabinet image.");
      return false;
    }

    return true;
  };

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = { ...cabinetForm, image: cabinetImage };

    if (cabinetForm._id) {
      return updateCabinet({ ...data, _id: cabinetForm._id });
    }

    return createCabinet(data);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={submitFormHandler}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          maxHeight: "90vh",
          bgcolor: "background.paper",
          overflow: "auto",
          boxShadow: 24,
          borderRadius: "8px",
          p: 4,
        }}
      >
        {fieldsMap.map((input) => (
          <FormControl key={input.id} fullWidth sx={{ mb: 2 }}>
            {input.id === "phone" ? (
              <Fragment key={input.id}>
                <MuiTelInput
                  value={input.value}
                  onChange={(newValue: string) =>
                    setCabinetForm((prevState) => ({
                      ...prevState,
                      phone: newValue,
                    }))
                  }
                  error={!!phoneError}
                  placeholder={input?.label}
                  color={phoneError ? "error" : "primary"}
                />
                <FormHelperText error={!!phoneError}>
                  {phoneError}
                </FormHelperText>
              </Fragment>
            ) : (
              <Fragment key={input.id}>
                <InputLabel htmlFor={input.id}>{input.label}</InputLabel>
                <OutlinedInput
                  id={input.id}
                  type="text"
                  required={input.id !== "notes"}
                  onChange={input.onChange}
                  value={input.value}
                  color="primary"
                  name={input.id}
                  label={input.label}
                  sx={{ ariaLabel: input.id }}
                />
              </Fragment>
            )}
          </FormControl>
        ))}
        {cabinetForm.chairs.map((chair, index) => (
          <FormControl key={index} fullWidth sx={{ mb: 1 }}>
            <InputLabel htmlFor={t("pages.cabinet.chair") + (index + 1)}>
              {t("pages.cabinet.chair") + (index + 1)}
            </InputLabel>
            <OutlinedInput
              id={t("pages.cabinet.chair") + (index + 1)}
              type="text"
              required
              endAdornment={
                index === cabinetForm.chairs.length - 1 ? (
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    <AddCircleOutlineIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        setCabinetForm((prevState) => ({
                          ...prevState,
                          chairs: [...cabinetForm.chairs, ""],
                        }))
                      }
                    />
                  </ListItemIcon>
                ) : null
              }
              onChange={(event) => {
                const newChairs = [...cabinetForm.chairs];
                newChairs[index] = event.target.value;
                setCabinetForm((prevState) => ({
                  ...prevState,
                  chairs: newChairs,
                }));
              }}
              value={chair}
              color="primary"
              name={`chair-${index}`}
              label={`chair-${index}`}
              sx={{ ariaLabel: `chair-${index}` }}
            />
          </FormControl>
        ))}
        <FormControl sx={{ mb: 2, width: "100%" }}>
          <FormLabel htmlFor="cabinetImage">
            {t("pages.cabinet.image")}
          </FormLabel>
          <Button
            fullWidth
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            {t("buttons.upload")}
            <VisuallyHiddenInput
              id="cabinetImage"
              name="cabinetImage"
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files?.[0]) {
                  setCabinetImage(e.target.files?.[0]);
                  setImageError("");
                }
              }}
            />
          </Button>
          <FormHelperText error={!!imageError}>{imageError}</FormHelperText>
        </FormControl>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button variant="contained" type="submit">
            {cabinetForm._id
              ? t("update", { keyPrefix: "buttons" })
              : t("create", { keyPrefix: "buttons" })}
          </Button>
          {Array.isArray(responseError) ? (
            responseError.map((error) => (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            ))
          ) : (
            <Typography variant="body2" color="error">
              {responseError}
            </Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};
