import "./chat.scss";

import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Rooms, Messages } from "./components";
import { Room } from "@types";

export const ChatPage = () => {
  const { t } = useTranslation("", { keyPrefix: "pages.chat" });
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();

  return (
    <Grid2 className="chat-container" container>
      <Grid2 className="chat-sidebar" size={3}>
        <Rooms selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
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
