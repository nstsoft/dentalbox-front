import "../auth.scss";
import Box from "@mui/material/Box";
import { Product } from "@types";
import { type FC } from "react";
import RegisterBg from "@images/register-bg.webp";
import { ProductSelect } from "@components";

type IUserWorkspaceStepProps = {
  onProductSelect: (product: Product) => void;
};

export const UserProduct: FC<IUserWorkspaceStepProps> = ({
  onProductSelect,
}) => {
  return (
    <>
      <Box className="register-bg" component="img" src={RegisterBg} />
      <ProductSelect onProductSelect={onProductSelect} />
    </>
  );
};
