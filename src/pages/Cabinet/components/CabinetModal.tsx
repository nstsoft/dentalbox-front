import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
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
import { CabinetForm } from "../types";
import { AvatarUpload } from "@components";
import { CustomModal } from "@elements";

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

    if (!matchIsValidTel(cabinetForm.phone)) {
      setPhoneError("Please enter a valid phone number.");
      return false;
    }

    if ((cabinetForm._id && !cabinetForm.image) ?? !cabinetImage) {
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
    <CustomModal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={submitFormHandler}
        sx={{ maxHeight: 500 }}
      >
        <AvatarUpload image={cabinetForm.image} onUpload={setCabinetImage} />
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
          <FormControl key={index} fullWidth sx={{ mb: 2 }}>
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

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button variant="contained" type="submit" sx={{ mb: 1 }}>
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
    </CustomModal>
  );
};
