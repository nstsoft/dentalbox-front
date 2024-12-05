import { CustomModal } from "@elements";
import { Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { UserSummaryListItem } from "@types";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  onClose: () => void;
  users: UserSummaryListItem[];
  onSubmit: (userids: string[]) => void;
  type: string;
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

        <Button
          variant="contained"
          onClick={() => {
            onSubmit(selectedUsers.map((u) => u._id));
            onClose();
          }}
          sx={{ mt: 6 }}
        >
          {t("submit", { keyPrefix: "buttons" })}
        </Button>
      </>
    </CustomModal>
  );
};
