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
import { Room } from "@types";
import { useAuth } from "@hooks";

export const ChatPage = () => {
  const { t } = useTranslation("", { keyPrefix: "pages.chat" });
  const { data: users } = useGetUserSummaryQuery();
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const filteredUsers =
    users?.filter((u) => !u.deleted && user?._id !== u._id) ?? [];
  const [createRoom] = useCreateRoomMutation();

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
