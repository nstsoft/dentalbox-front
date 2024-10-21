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
import moment, { Moment } from "moment/min/moment-with-locales";
import { DatePicker } from "@mui/x-date-pickers";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import { VisuallyHiddenInput } from "@elements";
import { CardMedia } from "@mui/material";

type Props = {
  fields: {
    id: string;
    label: string;
    value?: string;
    type?: string;
    error?: string;
    setPatientData: Dispatch<SetStateAction<Patient>>;
    onError?: (error: string | Error | null) => void;
  }[];
  onSubmit: (event: FormEvent) => void;
  onChange: () => void;
  isDataChanged: boolean;
};

export const EditForm: FC<Props> = ({
  onSubmit,
  onChange,
  fields,
  isDataChanged,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.patientCard" });
  const [patientImage, setPatientImage] = useState(
    fields.find((field) => field.id === "image")?.value
  );

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      onChange={onChange}
      sx={{ width: "100%" }}
    >
      {fields.map((field) => (
        <Fragment key={field.id}>
          {field.id === "image" ? (
            <Box sx={{ position: "relative" }}>
              <CardMedia
                sx={{ width: "100%", maxHeight: "300px", mb: 2 }}
                component="img"
                image={patientImage}
                alt={patientImage}
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
                      field.setPatientData((prev) => ({
                        ...prev,
                        image: file,
                      }));
                      reader.onloadend = () => {
                        setPatientImage(`${reader.result}`);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Button>
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
                          sex: target.value,
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
                    value={field.value ? moment(field.value) : null}
                    onChange={(newValue: Moment | null) =>
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
