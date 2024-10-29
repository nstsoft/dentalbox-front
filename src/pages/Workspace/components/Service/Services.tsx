import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useAddServiceItemMutation, useGetServicesQuery } from "@api";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Service } from "@types";
import { AccordionItem } from "./components";

export const Services = () => {
  const [create] = useAddServiceItemMutation();
  const { data } = useGetServicesQuery();

  const groups =
    data?.reduce(
      (acc, service) => ({
        ...acc,
        [service.group]: (acc[service.group] ?? []).concat(service),
      }),
      {} as { [key: string]: Service[] }
    ) ?? {};

  return (
    <Box sx={{ maxWidth: 1000 }}>
      {Object.entries(groups).map(([group, services]) => (
        <AccordionItem key={group} title={group} services={services} />
      ))}
    </Box>
  );
};
