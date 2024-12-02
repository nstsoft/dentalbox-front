import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { CustomModal } from "@elements";
import { UserSummaryListItem } from "@types";
import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  users: UserSummaryListItem[];
};

export const ChatModal: FC<Props> = ({ open, onClose, users }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.chat" });
  const [isMultiple, setIsMultiple] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<UserSummaryListItem[]>([]);
  const [roomName, setRoomName] = useState("");

  const clearData = () => {
    setIsMultiple(false);
    setSelectedUsers([]);
    setRoomName("");
  };

  return (
    <CustomModal
      open={open}
      onClose={() => {
        onClose();
        clearData();
      }}
      sx={{ minHeight: "300px" }}
    >
      <>
        <Button onClick={() => setIsMultiple(true)}>New group</Button>
        <Autocomplete
          multiple={isMultiple}
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
          value={isMultiple ? selectedUsers : selectedUsers[0] || null}
          onChange={(_, value) => {
            setSelectedUsers(
              isMultiple
                ? (value as UserSummaryListItem[])
                : [value as UserSummaryListItem]
            );

            console.log(value);
          }}
          renderInput={(params) => (
            <TextField {...params} label={t("search")} />
          )}
        />

        {isMultiple && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="roomName">Room name</InputLabel>
            <OutlinedInput
              id="roomName"
              type="text"
              required
              onChange={({ target }) => setRoomName(target.value)}
              value={roomName}
              name="roomName"
              label="Room name"
              sx={{ ariaLabel: "roomName" }}
            />
          </FormControl>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button>New room</Button>
        </Box>
      </>
    </CustomModal>
  );
};
