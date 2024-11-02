import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/uk";
import days from "dayjs";

export const ControlPanel = () => {
  return (
    <Box>
      <Box>
        <Button>Add</Button>
      </Box>
      <Box>
        <LocalizationProvider
          adapterLocale={"uk"}
          dateAdapter={AdapterDayjs}
          // adapterLocale="uk-UA"
        >
          <DatePicker
            views={["year", "month", "day"]}
            label="Basic date picker"
          />
          <DatePicker label="Basic date picker" />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};
