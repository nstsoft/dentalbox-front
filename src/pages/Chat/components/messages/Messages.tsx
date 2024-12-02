import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Messages = () => {
  const { t } = useTranslation("", { keyPrefix: "pages.chat" });
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: 2,
        }}
      >
        <List>
          {messages.map((message) => (
            <Box key={message.id} sx={{ display: "flex" }}>
              <ListItem
                sx={{
                  width: "fit-content",
                  backgroundColor: "#f5f5f5",
                  mb: 1,
                  mr: 1,
                }}
              >
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

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 1,
          borderTop: "1px solid #ccc",
        }}
      >
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
          sx={{ marginRight: 1 }}
        />
        <Button variant="contained" onClick={handleSendMessage}>
          {t("send", { keyPrefix: "buttons" })}
        </Button>
      </Box>
    </Box>
  );
};
