import { CustomMultiSelect } from "@elements";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Modal from "@mui/material/Modal";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { ChangeEvent, type FC, FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DatePicker } from "@mui/x-date-pickers";
import days, { type Dayjs } from "dayjs";
import { User, UserRole } from "@types";
import { useUpdateUserMutation } from "@api";
import { AvatarUpload } from "@components";

type StuffModalProps = {
  open: boolean;
  onClose: () => void;
  selectedUser: User | null;
};

type StuffForm = {
  _id: string;
  name: string;
  secondName: string;
  surname: string;
  dob: string;
  roles: string[];
  image?: string;
};

export const StuffModal: FC<StuffModalProps> = ({
  selectedUser,
  open,
  onClose,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.stuff" });
  const [stuffForm, setStuffForm] = useState<StuffForm>({
    _id: "",
    name: "",
    secondName: "",
    surname: "",
    dob: "",
    roles: [],
    image: "",
  });
  const [birthDateError, setBirthDateError] = useState<string>();
  const [responseError, setResponseError] = useState<string | string[]>();
  const [stuffImage, setStuffImage] = useState<File>();

  useEffect(() => {
    if (selectedUser) {
      setStuffForm({
        _id: selectedUser._id,
        name: selectedUser.name,
        secondName: selectedUser.secondName,
        surname: selectedUser.surname,
        dob: selectedUser?.dob ?? "",
        roles: selectedUser.roles.map((role) => role.role),
        image: selectedUser.image,
      });
    }
  }, [selectedUser]);

  const [updateUser, { isSuccess, error }] = useUpdateUserMutation();

  const fieldsMap = [
    {
      id: "name",
      label: t("name"),
      value: stuffForm.name,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setStuffForm((prevState) => ({
          ...prevState,
          name: event.target.value,
        })),
    },
    {
      id: "secondName",
      label: t("secondName"),
      value: stuffForm.secondName,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setStuffForm((prevState) => ({
          ...prevState,
          secondName: event.target.value,
        })),
    },
    {
      id: "surname",
      label: t("surname"),
      value: stuffForm.surname,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setStuffForm((prevState) => ({
          ...prevState,
          surname: event.target.value,
        })),
    },
    {
      id: "dob",
      label: t("dob"),
      value: stuffForm.dob,
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        setStuffForm((prev) => ({ ...prev, dob: target.value }));
      },
      error: birthDateError,
    },
    {
      id: "roles",
      label: t("roles"),
      value: stuffForm.roles,
    },
  ];

  const validateForm = () => {
    setBirthDateError(undefined);

    if (stuffForm.dob && !days(stuffForm.dob).isValid()) {
      setBirthDateError(t("enterValidDate", { keyPrefix: "errors" }));
      return false;
    }

    return true;
  };

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();

    const isFormValid = validateForm();
    if (isFormValid) {
      updateUser({ ...stuffForm, image: stuffImage });
    }
  };

  useEffect(() => {
    if (error) {
      setResponseError((error as any).message);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

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
        <AvatarUpload image={stuffForm.image ?? ""} onUpload={setStuffImage} />
        {fieldsMap.map((input) => (
          <FormControl key={input.id} fullWidth sx={{ mb: 2 }}>
            {input.id === "dob" && (
              <DatePicker
                value={input.value ? days(input.value as string) : null}
                onChange={(newValue: Dayjs | null) =>
                  setStuffForm((prev) => ({
                    ...prev,
                    dob: newValue?.toString() ?? "",
                  }))
                }
                disableFuture
                onError={(err) =>
                  setBirthDateError(
                    err
                      ? t("enterValidDate", { keyPrefix: "errors" })
                      : undefined
                  )
                }
                sx={{
                  "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, & .Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: birthDateError ? "red" : "none",
                    },
                }}
              />
            )}
            {input.id === "roles" && (
              <CustomMultiSelect
                data={Object.values(UserRole).map((role) => ({
                  value: role,
                  label: t(role, { keyPrefix: "roleItems" }),
                }))}
                selected={stuffForm.roles}
                setValue={(value: string[]) =>
                  setStuffForm((prev) => ({ ...prev, roles: value }))
                }
                label={t("roles")}
                sx={{
                  maxWidth: "unset",
                  "& .MuiInputBase-root": { height: "50px" },
                }}
              />
            )}
            {!["dob", "roles"].includes(input.id) && (
              <>
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
              </>
            )}
            <FormHelperText error={!!input.error}>{input.error}</FormHelperText>
          </FormControl>
        ))}

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button variant="contained" type="submit">
            {t("update", { keyPrefix: "buttons" })}
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
