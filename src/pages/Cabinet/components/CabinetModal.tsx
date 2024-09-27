import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemIcon,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { ChangeEvent, FC, FormEvent, Fragment, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useTranslation } from "react-i18next";
import { useLazyCreateCabinetQuery } from "@api";

type CabinetModalProps = {
  open: boolean;
  onUpdate: () => void;
  onClose: () => void;
};

export const CabinetModal: FC<CabinetModalProps> = ({ open, onUpdate, onClose }) => {
  const { t } = useTranslation();
  const [cabinetForm, setCabinetForm] = useState<{
    name: string;
    phone: string;
    address: string;
    notes: string;
    chairs: string[];
  }>({
    name: "",
    phone: "+380",
    address: "",
    notes: "",
    chairs: [""],
  });
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [responseError, setResponseError] = useState<string | string[] | null>(
    null
  );
  const [createCabinet] = useLazyCreateCabinetQuery();

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

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();

    if (matchIsValidTel(cabinetForm.phone)) {
      setPhoneError(null);
    } else {
      setPhoneError("Please enter a valid phone number.");
      return;
    }

    createCabinet(cabinetForm)
      .then((data) => {
        if (data.error) {
          setResponseError((data?.error as any).data?.message);
          return;
        }

        onUpdate();
        onClose();
      })
      .catch((error) => {
        console.log(error);
        setResponseError(error?.message);
      });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
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
                  required
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

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button variant="contained" type="submit">
            {t("buttons.create")}
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
