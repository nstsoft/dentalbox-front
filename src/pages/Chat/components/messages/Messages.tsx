import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { ChangeEvent, FC, useState } from "react";
import { useTranslation } from "react-i18next";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, VisuallyHiddenInput } from "@elements";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { useGetMessagesQuery } from "@api";
import { Room } from "@types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import { isMobile } from "react-device-detect";

import "../../chat.scss";

type Props = {
  room: Room;
  setSelectedRoom: (room?: Room) => void;
};

export const Messages: FC<Props> = ({ room, setSelectedRoom }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.chat" });
  const { data: mesages } = useGetMessagesQuery(room.id);
  const [messages, setMessages] = useState([
    { id: 1, text: "Привіт! Як справи?", createdAt: "13/11/20024 12:00" },
    {
      id: 2,
      text: "Усе добре, дякую! А в тебе?",
      createdAt: "13/11/20024 12:00",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: input,
          createdAt: new Date().toLocaleString(),
        },
      ]);
      setInput("");
    }
  };

  return (
    <Box className="room-item-messages">
      <Box className="room-item-messages__header">
        {isMobile && (
          <IconButton onClick={() => setSelectedRoom(undefined)}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h3">{room.name}</Typography>
      </Box>
      <Paper className="room-item-messages__list" elevation={0}>
        <List>
          {messages.map((message) => (
            <Box key={message.id} sx={{ display: "flex" }}>
              <ListItem className="message-item">
                <ListItemText primary={message.text} />
              </ListItem>
              <ListItemText
                secondary={message.createdAt}
                sx={{ fontSize: 12 }}
              />
            </Box>
          ))}
        </List>
      </Paper>

      <Box className="room-item-messages__input">
        <TextField
          fullWidth
          variant="outlined"
          placeholder={t("writeMessage")}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    component="label"
                    role={undefined}
                    variant="text"
                    tabIndex={-1}
                    sx={{ minWidth: "30px", p: 0 }}
                  >
                    <AttachFileIcon />
                    <VisuallyHiddenInput
                      id="messageFile"
                      name="messageFile"
                      type="file"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0];
                        console.log(file);
                      }}
                    />
                  </Button>
                </InputAdornment>
              ),
            },
          }}
          sx={{ marginRight: 1 }}
        />
        <IconButton onClick={handleSendMessage} sx={{ ml: 1, mr: 1 }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
