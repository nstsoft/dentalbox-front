import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { RoomRequest, UserSummaryListItem } from "@types";
import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";

import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

type Props = {
  open: boolean;
  onClose: () => void;
  users: UserSummaryListItem[];
  onSubmit: (room: RoomRequest) => void;
};

export const ChatDrawer: FC<Props> = ({ open, onClose, users, onSubmit }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.chat" });
  const [selectedUsers, setSelectedUsers] = useState<UserSummaryListItem[]>([]);
  const [roomName, setRoomName] = useState("");

  const clearData = () => {
    setSelectedUsers([]);
    setRoomName("");
  };

  const createRoom = () => {
    if (selectedUsers.length > 0) {
      onSubmit({
        userids: selectedUsers.map((u) => u._id),
        name: roomName,
      });
      clearData();
    }
  };

  return (
    <Drawer
      open={open}
      onClose={() => {
        onClose();
        clearData();
      }}
      anchor="left"
    >
      <Box sx={{ width: "300px", padding: 2 }}>
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
        <Autocomplete
          multiple
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
          value={selectedUsers}
          onChange={(_, value) => {
            setSelectedUsers(
              value ? ([] as UserSummaryListItem[]).concat(value) : []
            );
          }}
          renderInput={(params) => (
            <TextField {...params} label={t("search")} />
          )}
          sx={{ mt: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" onClick={() => createRoom()}>
            {t("newRoom")}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
