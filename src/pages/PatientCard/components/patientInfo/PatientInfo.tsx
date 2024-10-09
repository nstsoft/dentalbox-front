import { ClinicIconIcon } from "@assets";
import { Card, VisuallyHiddenInput } from "@elements";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid2 from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { Patient } from "@types";
import {
  ChangeEvent,
  type FC,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import moment, { Moment } from "moment";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { DatePicker } from "@mui/x-date-pickers";
import { validateLogin } from "@utils";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";
import { useUpdatePatientMutation } from "@api";
import { ListItemText, MenuItem, Select } from "@mui/material";
import { UserSex } from "../../../Patient/types/insex";

type PatientInfoProps = {
  patient: Patient;
};
const sx = { width: "100%", height: "100%" };

const Textarea = styled(TextareaAutosize)(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    padding: 16.5px 14px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.23);

    &:hover {
      border-color: ${theme.palette.text.primary};
    }

    &:focus, &:focus-within {
      border-color: #008fba;
      outline: 1px solid #008fba;
    }
  `
);

export const PatientInfo: FC<PatientInfoProps> = ({ patient }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard" });
  const [patientData, setPatientData] = useState(patient);
  const [isEdit, setIsEdit] = useState(false);
  const [emailError, setEmailError] = useState<string>();
  const [phoneError, setPhoneError] = useState<string>();
  const [birthDateError, setBirthDateError] = useState<string>();
  const [updatePatient, { isSuccess, error }] = useUpdatePatientMutation();
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [responseError, setResponseError] = useState<string | string[]>();
  const [patientImage, setPatientImage] = useState<File>();
  const fieldsMap = [
    {
      id: "name",
      label: t("name"),
      value: patientData.name,
    },
    {
      id: "secondName",
      label: t("secondName"),
      value: patientData.secondName,
    },
    {
      id: "surname",
      label: t("surname"),
      value: patientData.surname,
    },
    {
      id: "sex",
      label: t("sex"),
      value: patientData.sex,
    },
    {
      id: "dob",
      label: t("dob"),
      value: moment(patientData.dob).format("DD.MM.YYYY"),
      error: birthDateError,
    },
    {
      id: "phone",
      label: t("phone"),
      value: patientData.phone,
      error: phoneError,
    },
    {
      id: "email",
      label: t("email"),
      value: patientData.email,
      type: "email",
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) =>
        setPatientData((prevData) => ({
          ...prevData,
          email: target.value,
        })),
      error: emailError,
    },
    {
      id: "address",
      label: t("address"),
      value: patientData.address,
      type: "text",
      onChange: ({ target }: ChangeEvent<HTMLInputElement>) =>
        setPatientData((prevData) => ({
          ...prevData,
          address: target.value,
        })),
    },
    {
      id: "notes",
      label: t("notes"),
      value: patientData.notes,
    },
  ];

  const validateForm = () => {
    setPhoneError(undefined);
    setBirthDateError(undefined);
    setEmailError(undefined);

    if (!matchIsValidTel(patientData.phone)) {
      setPhoneError("Please enter a valid phone number.");
      return false;
    }

    if (patientData.dob && !moment(patientData.dob).isValid()) {
      setBirthDateError("Please enter valid date.");
      return false;
    }

    if (!validateLogin(patientData.email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const onEditPatientInfo = (event: FormEvent) => {
    event.preventDefault();

    const isFormValid = validateForm();
    if (isFormValid) {
      console.log(patientData);
      updatePatient({ ...patientData, image: patientImage });
    }
  };

  const editToggle = useCallback(() => {
    if (isEdit) {
      setPatientData(patient);
      setIsDataChanged(false);
    }

    setIsEdit(!isEdit);
  }, [isEdit, patient]);

  useEffect(() => {
    if (error) {
      setResponseError((error as any).message);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      editToggle();
    }
  }, [isSuccess, editToggle]);

  return (
    <Card sx={{ m: 0, width: "100%", position: "relative" }}>
      <Button
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
        onClick={editToggle}
      >
        {isEdit ? <CloseIcon /> : <EditIcon />}
      </Button>
      <Grid2 gap={1} container wrap="wrap">
        <Grid2 size={{ xs: 12, md: 4 }} sx={{ maxWidth: "200px" }}>
          <Box
            sx={{
              borderRadius: "20px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {isEdit && (
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  p: 0,
                  minWidth: "30px",
                }}
              >
                <EditIcon />
                <VisuallyHiddenInput
                  id="patientImage"
                  name="patientImage"
                  type="file"
                  onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      setPatientImage(file);

                      reader.onloadend = () => {
                        setPatientData((prev) => ({
                          ...prev,
                          image: `${reader.result}`,
                        }));
                        setIsDataChanged(true);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Button>
            )}
            {patientData.image ? (
              <CardMedia
                sx={sx}
                component="img"
                image={patientData.image as string}
                alt={patientData.name}
              />
            ) : (
              <ClinicIconIcon sx={sx} />
            )}
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 7 }}>
          <Grid2 size={12}>
            <CardContent sx={{ padding: "0 5px" }}>
              {!isEdit && (
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ mb: isEdit ? 2 : 1 }}
                >
                  {patient.name} {patient.secondName} {patient.surname}
                </Typography>
              )}
              <form
                onSubmit={onEditPatientInfo}
                onChange={() => setIsDataChanged(true)}
              >
                {fieldsMap.map((field) => (
                  <Box
                    key={field.id}
                    sx={{
                      display:
                        !isEdit &&
                        (field.id === "name" ||
                          field.id === "surname" ||
                          field.id === "secondName")
                          ? "none"
                          : "flex",
                      flexDirection: isEdit ? "column" : "row",
                      gap: 1,
                      height: isEdit ? "unset" : "30px",
                      alignItems: isEdit ? "flex-start" : "center",
                      mb: 1,
                    }}
                  >
                    {isEdit ? (
                      <>
                        <FormControl sx={{ width: "100%" }}>
                          {field.id === "phone" && (
                            <MuiTelInput
                              key={field.id}
                              value={field.value}
                              onChange={(newValue: string) =>
                                setPatientData((prev) => ({
                                  ...prev,
                                  phone: newValue.replace(/\s+/g, ""),
                                }))
                              }
                              error={!!field.error}
                              placeholder={field?.label}
                              color={field.error ? "error" : "primary"}
                            />
                          )}
                          {field.id === "notes" && (
                            <>
                              <FormLabel htmlFor={field.id}>
                                {field.label}
                              </FormLabel>
                              <Textarea
                                id={field.id}
                                value={field.value ?? ""}
                                onChange={({
                                  target,
                                }: ChangeEvent<HTMLTextAreaElement>) => {
                                  setPatientData((prevData) => ({
                                    ...prevData,
                                    notes: target.value,
                                  }));
                                }}
                              />
                            </>
                          )}
                          {field.id === "sex" && (
                            <>
                              <InputLabel id="radio-label">
                                {t("sex")}
                              </InputLabel>
                              <Select
                                labelId="radio-label"
                                value={patientData.sex}
                                onChange={({ target }) =>
                                  setPatientData((prev) => ({
                                    ...prev,
                                    sex: target.value,
                                  }))
                                }
                                required
                                input={<OutlinedInput label={t(`sex`)} />}
                              >
                                {UserSex.map((item) => (
                                  <MenuItem key={item} value={item}>
                                    <ListItemText
                                      primary={t(`sexItems.${item}`)}
                                      sx={{ m: 0 }}
                                    />
                                  </MenuItem>
                                ))}
                              </Select>
                            </>
                          )}
                          {field.id === "dob" && (
                            <DatePicker
                              key={field.id}
                              value={field.value ? moment(field.value) : null}
                              onChange={(newValue: Moment | null) =>
                                setPatientData((prev) => ({
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
                                    borderColor: birthDateError
                                      ? "red"
                                      : "none",
                                  },
                              }}
                            />
                          )}
                          {field.id !== "phone" &&
                            field.id !== "dob" &&
                            field.id !== "sex" &&
                            field.id !== "notes" && (
                              <>
                                <InputLabel htmlFor={field.id}>
                                  {field.label}
                                </InputLabel>
                                <OutlinedInput
                                  error={!!field.error}
                                  id={field.id}
                                  fullWidth
                                  type={field.type}
                                  required
                                  onChange={field.onChange}
                                  value={field.value}
                                  color={field.error ? "error" : "primary"}
                                  name={field.id}
                                  label={field.label}
                                />
                              </>
                            )}
                        </FormControl>
                        <FormHelperText error={!!field.error}>
                          {field.error}
                        </FormHelperText>
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            minWidth: "130px",
                          }}
                        >
                          {field.label}:
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {field.id === "sex" && field.value
                            ? t(`sexItems.${field.value}`)
                            : field.value}
                        </Typography>
                      </>
                    )}
                  </Box>
                ))}
                {isEdit && (
                  <Button
                    type="submit"
                    variant={"contained"}
                    disabled={!isDataChanged}
                  >
                    {t("save", { keyPrefix: "buttons" })}
                  </Button>
                )}
              </form>
            </CardContent>
          </Grid2>
        </Grid2>
      </Grid2>
    </Card>
  );
};
