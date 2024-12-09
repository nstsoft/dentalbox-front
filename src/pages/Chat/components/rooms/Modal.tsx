import { CustomModal } from "@elements";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { UserSummaryListItem } from "@types";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

type ModalType = "addUsers" | "delete" | "leave" | "transferOwnership";
type Props = {
  open: boolean;
  onClose: () => void;
  users: UserSummaryListItem[];
  onSubmit: (userids: string[]) => void;
  type?: ModalType;
};

export const RoomModal: FC<Props> = ({
  open,
  onClose,
  users,
  onSubmit,
  type,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<UserSummaryListItem[]>([]);
  const { t } = useTranslation("", { keyPrefix: "pages.chat" });

  return (
    <CustomModal open={open} onClose={onClose}>
      <>
        <Typography variant="h5">{t(`modal.${type}`)}</Typography>

        {type === "leave" || type === "delete" ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{ width: "250px", textAlign: "center" }}
            >
              {t("modal.confirm")}
            </Typography>
          </Box>
        ) : (
          <Autocomplete
            multiple={type === "addUsers"}
            fullWidth
            disablePortal
            options={
              users?.map((user) => ({
                label: `${user.name} ${user.surname}`,
                key: user._id,
                image: user.image,
                ...user,
              })) ?? []
            }
            value={type === "addUsers" ? selectedUsers : selectedUsers[0] || ""}
            onChange={(_, value) => {
              setSelectedUsers(
                value ? ([] as UserSummaryListItem[]).concat(value) : []
              );
            }}
            renderInput={(params) => <TextField {...params} label="" />}
            sx={{ mt: 2 }}
          />
        )}

        <Button
          variant="contained"
          onClick={() => {
            onSubmit(selectedUsers.map((u) => u._id));
            onClose();
          }}
          sx={{ mt: 4 }}
        >
          {t("submit", { keyPrefix: "buttons" })}
        </Button>
      </>
    </CustomModal>
  );
};
