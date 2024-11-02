import { CustomMultiSelect, VisuallyHiddenInput } from "@elements";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import Modal from "@mui/material/Modal";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { ChangeEvent, type FC, FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DatePicker } from "@mui/x-date-pickers";
import days, { type Dayjs } from "dayjs";
import { User, UserRole } from "@types";
import { useUpdateUserMutation } from "@api";

type StaffModalProps = {
  open: boolean;
  onClose: () => void;
  selectedUser: User | null;
};

type StaffForm = {
  _id: string;
  name: string;
  secondName: string;
  surname: string;
  dob: string;
  roles: string[];
};

export const StaffModal: FC<StaffModalProps> = ({
  selectedUser,
  open,
  onClose,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.staff" });
  const [staffForm, setStaffForm] = useState<StaffForm>({
    _id: selectedUser?._id ?? "",
    name: selectedUser?.name ?? "",
    secondName: selectedUser?.secondName ?? "",
    surname: selectedUser?.surname ?? "",
    dob: selectedUser?.dob?.toString() ?? "",
    roles: selectedUser?.roles.map((role) => role.role) ?? [],
  });
  const [birthDateError, setBirthDateError] = useState<string>();
  const [responseError, setResponseError] = useState<string | string[]>();
  const [staffImage, setStaffImage] = useState<File>();

  const [updateUser, { isSuccess, error }] = useUpdateUserMutation();

  const fieldsMap = [
    {
      id: "name",
      label: t("name"),
      value: staffForm.name,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setStaffForm((prevState) => ({
          ...prevState,
          name: event.target.value,
        })),
    },
    {
      id: "secondName",
      label: t("secondName"),
      value: staffForm.secondName,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setStaffForm((prevState) => ({
          ...prevState,
          secondName: event.target.value,
        })),
    },
    {
      id: "surname",
      label: t("surname"),
      value: staffForm.surname,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setStaffForm((prevState) => ({
          ...prevState,
          surname: event.target.value,
        })),
    },
    {
      id: "dob",
      label: t("dob"),
      value: staffForm.dob,
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) => {
        setStaffForm((prev) => ({ ...prev, dob: target.value }));
      },
      error: birthDateError,
    },
    {
      id: "roles",
      label: t("roles"),
      value: staffForm.roles,
    },
  ];

  const validateForm = () => {
    setBirthDateError(undefined);

    if (staffForm.dob && !days(staffForm.dob).isValid()) {
      setBirthDateError("Please enter valid date.");
      return false;
    }

    return true;
  };

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();

    const isFormValid = validateForm();
    if (isFormValid) {
      updateUser({ ...staffForm, image: staffImage });
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
        {fieldsMap.map((input) => (
          <FormControl key={input.id} fullWidth sx={{ mb: 2 }}>
            {input.id === "dob" && (
              <DatePicker
                value={input.value ? days(input.value) : null}
                onChange={(newValue: Dayjs | null) =>
                  setStaffForm((prev) => ({
                    ...prev,
                    dob: newValue?.toString() ?? "",
                  }))
                }
                disableFuture
                onError={(err) =>
                  setBirthDateError(
                    err ? "Please enter valid date." : undefined
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
                  label: t(`roleItems.${role}`),
                }))}
                selected={staffForm.roles}
                setValue={(value: string[]) =>
                  setStaffForm((prev) => ({ ...prev, roles: value }))
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
        <FormControl sx={{ mb: 2, width: "100%" }}>
          <FormLabel htmlFor="staffImage">{t("image")}</FormLabel>
          <Button
            fullWidth
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            {t("upload", { keyPrefix: "buttons" })}
            <VisuallyHiddenInput
              id="staffImage"
              name="staffImage"
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.files?.[0] && setStaffImage(e.target.files?.[0]);
              }}
            />
          </Button>
          {staffImage && <FormHelperText>{t("imageSuccess")}</FormHelperText>}
        </FormControl>

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
