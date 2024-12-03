import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { RoomRequest, UserSummaryListItem } from "@types";
import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  users: UserSummaryListItem[];
  onSubmit: (room: RoomRequest) => void;
};

export const ChatDrawer: FC<Props> = ({ open, onClose, users, onSubmit }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.chat" });
  const [isMultiple, setIsMultiple] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<UserSummaryListItem[]>([]);
  const [roomName, setRoomName] = useState("");

  const clearData = () => {
    setIsMultiple(false);
    setSelectedUsers([]);
    setRoomName("");
  };

  const createRoom = () => {
    if (selectedUsers.length > 0) {
      onSubmit({
        userids: selectedUsers.map((u) => u._id),
        name: isMultiple
          ? roomName
          : `${selectedUsers[0]?.surname} ${selectedUsers[0]?.name[0]} ${selectedUsers[0]?.secondName[0]}`,
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
        <Button
          variant="outlined"
          onClick={() => {
            setIsMultiple(!isMultiple);
            setSelectedUsers([]);
          }}
        >
          {isMultiple ? "New room" : "New group"}
        </Button>
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
          value={isMultiple ? selectedUsers : selectedUsers[0] || ""}
          onChange={(_, value) => {
            setSelectedUsers(
              isMultiple
                ? (value as UserSummaryListItem[])
                : value
                ? [value as UserSummaryListItem]
                : []
            );
          }}
          renderInput={(params) => (
            <TextField {...params} label={t("search")} />
          )}
          sx={{ mt: 2 }}
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" onClick={() => createRoom()}>
            New room
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
