import Button from "@mui/material/Button";
import { CustomModal } from "@elements";
import Box from "@mui/material/Box";
import { useAddServiceItemMutation, useGetServicesQuery } from "@api";
import { useState } from "react";
import { Service } from "@types";
import { AccordionItem, AddService } from "./components";
import { useTranslation } from "react-i18next";
import { Loader } from "@components";

export const Services = () => {
  const [create] = useAddServiceItemMutation();
  const { data, isLoading } = useGetServicesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation("", { keyPrefix: "pages.workspace.services" });

  const groups =
    data?.reduce(
      (acc, service) => ({
        ...acc,
        [service.group]: (acc[service.group] ?? []).concat(service),
      }),
      {} as { [key: string]: Service[] }
    ) ?? {};

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ maxWidth: 1000 }}>
      <CustomModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddService
          onUpdate={(serviceItem) => create(serviceItem)}
          groupItems={Object.keys(groups)}
          onClose={() => setIsModalOpen(false)}
        />
      </CustomModal>
      <Box>
        <Button onClick={() => setIsModalOpen(true)}>{t("addService")}</Button>
      </Box>
      <Box>
        {Object.entries(groups).map(([group, services]) => (
          <AccordionItem key={group} title={group} services={services} />
        ))}
      </Box>
    </Box>
  );
};
