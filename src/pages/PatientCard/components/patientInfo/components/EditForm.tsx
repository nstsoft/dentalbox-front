import type { FC, FormEvent, Dispatch, SetStateAction } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { MuiTelInput } from "mui-tel-input";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Patient, Sex } from "@types";
import moment, { Moment } from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import FormLabel from "@mui/material/FormLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { Textarea } from "@elements";
import { useTranslation } from "react-i18next";

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
  return (
    <form onSubmit={onSubmit} onChange={onChange}>
      {fields.map((field) => (
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
          <>
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
              {field.id === "notes" && (
                <>
                  <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
                  <Textarea
                    id={field.id}
                    value={field.value ?? ""}
                    onChange={({ target }) => {
                      field.setPatientData((prev) => ({
                        ...prev,
                        notes: target.value,
                      }));
                    }}
                  />
                </>
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
              {!["phone", "dob", "sex", "notes"].includes(field.id) && (
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
            <FormHelperText error={!!field.error}>{field.error}</FormHelperText>
          </>
        </Box>
      ))}

      <Button type="submit" variant={"contained"} disabled={!isDataChanged}>
        {t("save", { keyPrefix: "buttons" })}
      </Button>
    </form>
  );
};
