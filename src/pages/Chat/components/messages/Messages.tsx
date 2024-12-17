import "./style.scss";
import { type FC, useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import { isMobile } from "react-device-detect";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import { IconButton } from "@elements";
import { useLazyGetMessagesQuery, useLazyReadMessagesInGroupQuery } from "@api";
import { Message, Room } from "@types";
import { useWebsocket, useAuth } from "@hooks";
import { WS_EVENTS } from "@types";
import InfiniteScroll from "react-infinite-scroll-component";
import { MessageInput } from "./MessageInput";

import "../../chat.scss";
import { Divider } from "@mui/material";

type Props = { room: Room; setSelectedRoom: (room?: Room) => void };

export const Messages: FC<Props> = ({ room, setSelectedRoom }) => {
  const [readMessagesInGroup] = useLazyReadMessagesInGroupQuery();
  const { message } = useWebsocket();
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [fetchMessages, { data, isUninitialized }] = useLazyGetMessagesQuery();
  const [messages, setMessages] = useState(data?.Items ?? []);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages({ room: room.id });
  }, [fetchMessages, room.id]);

  useEffect(() => {
    if (
      message?.action === WS_EVENTS.NEW_MESSAGE &&
      message.data.room === room.id
    ) {
      console.log("NEW MESSAGE", message.data);
      setMessages((prev) => [message.data as Message, ...prev]);
      if (message.data.author !== user?._id) {
        readMessagesInGroup({ room: room.id, messageids: [message.data.id] });
      }
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [message, readMessagesInGroup, room.id, user?._id]);

  useEffect(() => {
    if (data?.Items.length) {
      setMessages((prev) => prev.concat(data.Items));
    }
  }, [data]);

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
        <div className="scrollable-div">
          <InfiniteScroll
            inverse={true}
            style={{ display: "flex", flexDirection: "column-reverse" }}
            dataLength={messages.length}
            next={() =>
              fetchMessages({ room: room.id, exclusiveKey: data?.ExclusiveKey })
            }
            hasMore={isUninitialized || !!data?.ExclusiveKey}
            height="60vh"
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>The end</b>
              </p>
            }
            loader={<h4>Loading...</h4>}
          >
            <div ref={messagesEndRef} />
            <Box className="messages-divider"></Box>
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
          </InfiniteScroll>
        </div>
      </Paper>

      <MessageInput roomId={room.id} />
    </Box>
  );
};
