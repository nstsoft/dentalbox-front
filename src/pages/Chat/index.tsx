import "./chat.scss";

import { useCreateRoomMutation, useGetUserSummaryQuery } from "@api";
import Grid2 from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useTranslation } from "react-i18next";
import { Rooms, Messages, ChatDrawer } from "./components";
import { Room, UserSummaryListItem } from "@types";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useAuth } from "@hooks";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@elements";

export const ChatPage = () => {
  const { t } = useTranslation("", { keyPrefix: "pages.chat" });
  const { data: users } = useGetUserSummaryQuery();
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const filteredUsers =
    users?.filter((u) => !u.deleted && user?._id !== u._id) ?? [];
  const [createRoom] = useCreateRoomMutation();
  const [newRoom, setNewRoom] = useState<UserSummaryListItem | null>(null);

  const createNewRoom = () => {
    if (newRoom) {
      createRoom({
        userids: [newRoom._id ?? ""],
        name: `${newRoom.surname} ${newRoom.name[0]} ${newRoom.secondName[0]}`,
      });
      setNewRoom(null);
    }
  };

  return (
    <Grid2 className="chat-container" container>
      <Grid2 className="chat-sidebar" size={3}>
        <Button
          className="new-chat-button"
          onClick={() => setIsModalOpen(true)}
        >
          <AddCircleOutlineIcon />
          <Typography variant="h6">{t("newChat")}</Typography>
        </Button>
        <Box className="new-chat-input">
          <Autocomplete
            fullWidth
            disablePortal
            options={
              filteredUsers?.map((user) => ({
                label: `${user.name} ${user.surname}`,
                key: user._id,
                image: user.image,
                ...user,
              })) ?? []
            }
            value={newRoom}
            onChange={(_, value) => {
              setNewRoom(value);
            }}
            renderInput={(params) => (
              <TextField {...params} label={t("search")} />
            )}
          />
          <IconButton onClick={createNewRoom}>
            <SendIcon />
          </IconButton>
        </Box>
        <Rooms selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
        <ChatDrawer
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          users={filteredUsers}
          onSubmit={(newRoom) => createRoom(newRoom)}
        />
      </Grid2>
      <Grid2 size={9}>
        {selectedRoom ? (
          <Messages />
        ) : (
          <Box className="no-active">{t("noActive")}</Box>
        )}
      </Grid2>
    </Grid2>
  );
};
