import { type FC, useState, useEffect } from "react";
import { useAuth } from "@hooks";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  useChangeSubscriptionPlanMutation,
  workspaceApi,
} from "@api";
import { API_CONSTANTS } from "@store";
import { ChangePlanModal } from "./components";
import { UserRole, type Product } from "@types";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Toaster } from "@components";

export const ChangePlan: FC = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [changePlan, { data, isSuccess, error }] =
    useChangeSubscriptionPlanMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        workspaceApi.util.invalidateTags([
          API_CONSTANTS.WORKSPACE_TAG.WORKSPACE,
        ])
      );
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(
        <Toaster actionName="Change Plan Error" message={(error as any)?.error} />
      );
    }
  }, [error]);

  if (!user?.role || ![(UserRole.admin, UserRole.owner)].includes(user.role)) {
    return null;
  }

  const onProductSelect = (product: Product) => {
    changePlan({ priceId: product.prices[0].priceId });
    setOpen(false);
  };

  return (
    <Box>
      <ChangePlanModal
        onProductSelect={onProductSelect}
        open={open}
        onClose={() => setOpen(false)}
      />
      <Button onClick={() => setOpen(true)} variant="contained" color="primary">
        Change plan
      </Button>
    </Box>
  );
};
