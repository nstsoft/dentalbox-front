import "./style.scss";
import { ChangeEvent, FC, useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import { isMobile } from "react-device-detect";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import { IconButton, VisuallyHiddenInput } from "@elements";
import { useLazyGetMessagesQuery, useLazyReadMessagesInGroupQuery } from "@api";
import { Message, Room } from "@types";
import { useWebsocket, useAuth } from "@hooks";
import { WS_EVENTS } from "@types";

import "../../chat.scss";

type ExclusiveKey = { id?: string; room?: string; timestamp?: number };
type Props = { room: Room; setSelectedRoom: (room?: Room) => void };

export const Messages: FC<Props> = ({ room, setSelectedRoom }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.chat" });

  const [input, setInput] = useState("");
  const [readMessagesInGroup] = useLazyReadMessagesInGroupQuery();
  const { message } = useWebsocket();
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [exclusiveKey, setExclusiveKey] = useState<ExclusiveKey | undefined>();
  const [fetchMessages, { data }] = useLazyGetMessagesQuery();
  const [messages, setMessages] = useState(data?.Items ?? []);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages({ room: room.id });
  }, [fetchMessages, room.id]);

  useEffect(() => {
    if (exclusiveKey) {
      setIsLoading(true);
      fetchMessages({ room: room.id, exclusiveKey });
    }
  }, [exclusiveKey, fetchMessages, room.id]);

  useEffect(() => {
    if (
      message?.action === WS_EVENTS.NEW_MESSAGE &&
      message.data.room === room.id
    ) {
      console.log("NEW MESSAGE", message.data);
      setMessages((prev) => prev.concat(message.data as Message));
      if (message.data.author !== user?._id) {
        readMessagesInGroup({ room: room.id, messageids: [message.data.id] });
      }
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [message, readMessagesInGroup, room.id, user?._id]);

  useEffect(() => {
    if (data?.Items.length) {
      setMessages((prev) => data.Items.concat(prev));
    }

    setIsLoading(false);
  }, [data]);

  useEffect(() => {
    const current = loaderRef.current;
    if (!current) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          console.log("LOAD MORE");
          setTimeout(() => {
            setExclusiveKey(data?.ExclusiveKey);
          }, 0);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(current);
    return () => observer.unobserve(current);
  }, [data?.ExclusiveKey, isLoading]);

  const handleSendMessage = () => {};

  useEffect(() => {
    if (containerRef.current) {
      const handleWheel = (event: HTMLElementEventMap["wheel"]) => {
        event.preventDefault();
        if (containerRef.current) {
          containerRef.current.scrollTop -= event.deltaY;
        }
      };
      containerRef.current.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }
  }, []);

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
      <Paper
        ref={containerRef}
        className="room-item-messages__list"
        elevation={0}
      >
        <Box className="room-item-messages__list-container">
          <List className="messages-list">
            {messages.map((message, index) => (
              <Box
                className="message-item-container"
                ref={index === 0 ? lastMessageRef : null}
                key={message.id}
                sx={{ display: "flex" }}
              >
                <ListItem className="message-item">
                  <ListItemText primary={message.message} />
                </ListItem>
                <ListItemText
                  secondary={message.createdAt}
                  sx={{ fontSize: 12 }}
                />
              </Box>
            ))}
          </List>

          <div ref={messagesEndRef} />
          <div ref={loaderRef} style={{ textAlign: "center", padding: "10px" }}>
            {isLoading && <div>Loading...</div>}
            {!exclusiveKey && (
              <div style={{ textAlign: "center", padding: "10px" }}>
                no messages
              </div>
            )}
          </div>
        </Box>
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
