import { CustomModal } from "@elements";
import { type FC } from "react";
import { ProductSelect } from "@components";
import { Product } from "@types";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  onClose: () => void;
  onProductSelect: (product: Product) => void;
};

export const ChangePlanModal: FC<Props> = ({
  open,
  onClose,
  onProductSelect,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.workspace" });

  return (
    <CustomModal
      sx={{ width: "100%", height: "100%", maxHeight: "100%" }}
      open={open}
      onClose={onClose}
    >
      <>
        <h3>{t("labels.change")}</h3>
        <ProductSelect onProductSelect={onProductSelect} />
      </>
    </CustomModal>
  );
};
