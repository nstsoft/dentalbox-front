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
import { CustomModal, IconButton } from "@elements";
import {
  useGetWorkspaceMetadataQuery,
  useUpdateServiceItemMutation,
  useDeleteServiceItemMutation,
} from "@api";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = { title: string; services: Service[] };

export const AccordionItem: FC<Props> = ({ title, services }) => {
  const { data } = useGetWorkspaceMetadataQuery();
  const [updateServiceItem] = useUpdateServiceItemMutation();
  const [deleteServiceItem] = useDeleteServiceItemMutation();
  const [selectedService, setSelectedService] = useState<Service | undefined>();
  const [iseDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteService, setDeleteService] = useState<
    { _id: string; paragraph: string } | undefined
  >();
  const { t } = useTranslation("", { keyPrefix: "pages.workspace.services" });

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
        <IconButton
          onClick={() => {
            setDeleteService({
              _id: service._id,
              paragraph: service.paragraph,
            });
            setIsDeleteModalOpen(true);
          }}
          variant="outlined"
          color="primary"
        >
          <DeleteIcon />
        </IconButton>
      </Fragment>
    );
  };
  return (
    <>
      {" "}
      <CustomModal
        open={iseDeleteModalOpen}
        onClose={() => {
          setDeleteService(undefined);
          setIsDeleteModalOpen(false);
        }}
      >
        <Box>
          <Box>
            <Typography variant="h6">
              {t("deleteService")} {deleteService?.paragraph}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button sx={{ marginRight: "15px" }} onClick={() => {}}>
              cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setDeleteService(undefined);
                setIsDeleteModalOpen(false);
                deleteServiceItem(deleteService?._id ?? "");
              }}
            >
              Ok
            </Button>
          </Box>
        </Box>
      </CustomModal>
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
    </>
  );
};
