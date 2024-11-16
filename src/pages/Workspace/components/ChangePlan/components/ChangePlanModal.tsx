import { CustomModal } from "@elements";
import { type FC } from "react";
import { ProductSelect } from "@components";
import { Product } from "@types";

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
  return (
    <CustomModal sx={{ width: "100%" }} open={open} onClose={onClose}>
      <div>
        <h1>Change Plan Modal</h1>
        <ProductSelect onProductSelect={onProductSelect} />
      </div>
    </CustomModal>
  );
};
