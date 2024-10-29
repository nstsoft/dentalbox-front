import "./Accordion.scss";
import { Service } from "@types";
import { type FC, Fragment, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton } from "@elements";
import {
  useGetWorkspaceMetadataQuery,
  useUpdateServiceItemMutation,
} from "@api";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";

type Props = { title: string; services: Service[] };

export const AccordionItem: FC<Props> = ({ title, services }) => {
  const { data } = useGetWorkspaceMetadataQuery();
  const [updateServiceItem] = useUpdateServiceItemMutation();
  const [selectedService, setSelectedService] = useState<Service | undefined>();

  const renderServiceItem = (service: Service) => {
    const isEditing = selectedService?._id === service._id;
    return (
      <Fragment key={service._id}>
        <div className="service-prop name">
          {isEditing ? (
            <TextField
              className="input"
              onChange={(e) =>
                setSelectedService({ ...selectedService, name: e.target.value })
              }
              value={selectedService.name}
              variant="standard"
            />
          ) : (
            <Typography className="text" variant="body2">
              {service.name}
            </Typography>
          )}
        </div>
        <div className="service-prop paragraph">
          {isEditing ? (
            <TextField
              className="input"
              onChange={({ target }) =>
                setSelectedService({
                  ...selectedService,
                  paragraph: target.value,
                })
              }
              value={selectedService.paragraph}
              variant="standard"
            />
          ) : (
            <Typography className="text" variant="body2">
              {service.paragraph}
            </Typography>
          )}
        </div>
        <div className="service-prop price">
          {isEditing ? (
            <TextField
              className="input"
              type="text"
              onChange={({ target }) =>
                setSelectedService({
                  ...selectedService,
                  price: +target.value,
                })
              }
              value={selectedService.price}
              variant="standard"
            />
          ) : (
            <Typography className="text" variant="body2">
              {service.price} ({data?.currency ?? "₴"})
            </Typography>
          )}
        </div>

        <IconButton
          onClick={() => {
            if (isEditing) {
              updateServiceItem({
                _id: selectedService._id,
                service: {
                  name: selectedService.name,
                  paragraph: selectedService.paragraph,
                  price: selectedService.price,
                  group: selectedService.group,
                },
              });
              setSelectedService(undefined);
            } else {
              setSelectedService(service);
            }
          }}
          variant="outlined"
          color="primary"
        >
          {isEditing ? <SaveIcon /> : <EditIcon />}
        </IconButton>
      </Fragment>
    );
  };
  return (
    <Accordion className="accordion-item">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        {title.toUpperCase()}
      </AccordionSummary>
      <AccordionDetails>
        <Box className="services-container">
          {services.map(renderServiceItem)}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
