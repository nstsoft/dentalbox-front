import {
  type FC,
  type FormEvent,
  type Dispatch,
  type SetStateAction,
  type ChangeEvent,
  Fragment,
  useState,
} from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { MuiTelInput } from "mui-tel-input";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Patient, Sex } from "@types";
import days, { type Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import { VisuallyHiddenInput } from "@elements";
import CardMedia from "@mui/material/CardMedia";

type Props = {
  fields: {
    id: string;
    label: string;
    value?: string;
    type?: string;
    error?: string;
    setPatientData: Dispatch<
      SetStateAction<Patient & { clearAvatarCache?: boolean }>
    >;
    onError?: (error: string | Error | null) => void;
  }[];
  onSubmit: (event: FormEvent) => void;
  onChange: () => void;
  onUpload: (file: File) => void;
  isDataChanged: boolean;
  setCacheDate: (date: Dayjs) => void;
};

export const EditForm: FC<Props> = ({
  onSubmit,
  onChange,
  onUpload,
  fields,
  isDataChanged,
  setCacheDate,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard" });
  const [imageSuccess, setImageSuccess] = useState<string>();

  return (
    <Box component="form" onSubmit={onSubmit} onChange={onChange}>
      {fields.map((field) => (
        <Fragment key={field.id}>
          {field.id === "image" ? (
            <Box sx={{ display: "flex", mb: 2, gap: 2 }}>
              <Box sx={{ position: "relative", width: "100px" }}>
                <CardMedia
                  sx={{ height: "100px", borderRadius: "50%" }}
                  component="img"
                  image={field.value}
                  alt={field.value}
                />
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
                        onUpload?.(file);
                        reader.onloadend = () => {
                          field.setPatientData((prev) => ({
                            ...prev,
                            image: `${reader.result}`,
                            clearAvatarCache: true,
                          }));
                          setCacheDate(days());
                          setImageSuccess(t("success", { keyPrefix: "image" }));
                        };
                        reader.onerror = () => {
                          field.onError?.(t("error", { keyPrefix: "image" }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </Button>
              </Box>
              {field.error && (
                <FormHelperText error={!!field.error}>
                  {field.error}
                </FormHelperText>
              )}
              {imageSuccess && <FormHelperText>{imageSuccess}</FormHelperText>}
            </Box>
          ) : (
            <Box
              key={field.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                height: "unset",
                alignItems: "flex-start",
                mb: 1,
              }}
            >
              <FormControl sx={{ width: "100%" }}>
                {field.id === "phone" && (
                  <MuiTelInput
                    key={field.id}
                    value={field.value}
                    onChange={(phone) =>
                      field.setPatientData((prev) => ({ ...prev, phone }))
                    }
                    error={!!field.error}
                    placeholder={field?.label}
                    color={field.error ? "error" : "primary"}
                  />
                )}
                {field.id === "sex" && (
                  <>
                    <InputLabel id="radio-label">{t("sex")}</InputLabel>
                    <Select
                      labelId="radio-label"
                      value={field.value ?? Sex.male}
                      onChange={({ target }) =>
                        field.setPatientData((prev) => ({
                          ...prev,
                          sex: target.value as Sex,
                        }))
                      }
                      required
                      input={<OutlinedInput label={t(`sex`)} />}
                    >
                      {Object.values(Sex).map((item) => (
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
                    value={field.value ? days(field.value) : null}
                    onChange={(newValue: Dayjs | null) =>
                      field.setPatientData((prev) => ({
                        ...prev,
                        dob: newValue?.toString() ?? "",
                      }))
                    }
                    disableFuture
                    onError={field.onError}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, & .Mui-focused .MuiOutlinedInput-notchedOutline":
                        { borderColor: field.error ? "red" : "none" },
                    }}
                  />
                )}
                {!["phone", "dob", "sex"].includes(field.id) && (
                  <>
                    <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                    <OutlinedInput
                      error={!!field.error}
                      id={field.id}
                      fullWidth
                      type={field.type}
                      required
                      onChange={({ target }) => {
                        field.setPatientData((prev) => ({
                          ...prev,
                          [field.id]: target.value,
                        }));
                      }}
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
            </Box>
          )}
        </Fragment>
      ))}

      <Button type="submit" variant={"contained"} disabled={!isDataChanged}>
        {t("save", { keyPrefix: "buttons" })}
      </Button>
    </Box>
  );
};
