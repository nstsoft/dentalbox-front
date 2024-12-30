import "./style.scss";
import "../../chat.scss";
import { type FC, useEffect, useState, useRef, MouseEvent } from "react";
import Box from "@mui/material/Box";
import { isMobile } from "react-device-detect";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import { IconButton } from "@elements";
import {
  useGetUserSummaryQuery,
  useLazyGetMessagesQuery,
  useLazyReadMessagesInGroupQuery,
} from "@api";
import { Message, Room } from "@types";
import { useWebsocket, useAuth } from "@hooks";
import { WS_EVENTS } from "@types";
import InfiniteScroll from "react-infinite-scroll-component";
import { MessageInput } from "./MessageInput";
import days from "dayjs";
import ImageGallery from "./ImageGallery";
import Avatar from "@mui/material/Avatar";
import { generateColor } from "../../utils";
import Divider from "@mui/material/Divider";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { ContextMenu } from "./ContextMenu";
import ReplyIcon from "@mui/icons-material/Reply";
import Link from "@mui/material/Link";

type Props = { room: Room; setSelectedRoom: (room?: Room) => void };

export const Messages: FC<Props> = ({ room, setSelectedRoom }) => {
  const [readMessagesInGroup] = useLazyReadMessagesInGroupQuery();
  const { message } = useWebsocket();
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [fetchMessages, { data, isUninitialized }] = useLazyGetMessagesQuery();
  const [messages, setMessages] = useState<
    (Message & { reply?: string; replyId?: string })[]
  >(data?.Items ?? []);
  const [lastMessageId, setLastMessageId] = useState("");

  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { data: usersSummary } = useGetUserSummaryQuery();
  const contact = usersSummary?.find(
    (u) => u._id === messages.find((m) => m.author !== user?._id)?.author
  );
  const isPrivateRoom = room.name === "private__";
  const [menuAnchor, setMenuAnchor] = useState<{ x: number; y: number }>();
  const [selectedMessage, setSelectedMessage] = useState<Message>();
  const [isReply, setIsReply] = useState(false);

  const massageValidator = (message: Message) => {
    const isReply = message.message.includes("@@@");

    if (!isReply) return message;

    const lastReplyIndex = message.message.lastIndexOf("@@@");

    return {
      ...message,
      message: message.message.slice(lastReplyIndex + 3),
      reply: message.message.slice(0, lastReplyIndex).split("!!!")[1],
      replyId: message.message.slice(3, lastReplyIndex).split("!!!")[0],
    };
  };

  useEffect(() => {
    fetchMessages({ room: room.id });
  }, [fetchMessages, room.id]);

  useEffect(() => {
    if (
      message?.action === WS_EVENTS.NEW_MESSAGE &&
      message.data.room === room.id
    ) {
      console.log("NEW MESSAGE", message.data);
      setMessages((prev) =>
        [message.data as Message, ...prev].map(massageValidator)
      );
      if (message.data.author !== user?._id) {
        readMessagesInGroup({ room: room.id, messageids: [message.data.id] });
      }
      setLastMessageId(message.data.id);
    }
  }, [message, readMessagesInGroup, room.id, user?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [lastMessageId]);

  useEffect(() => {
    if (data?.Items.length) {
      setMessages((prev) => prev.concat(data.Items).map(massageValidator));
    }
  }, [data]);

  const handleContextMenu = (
    e: MouseEvent<HTMLDivElement>,
    message: Message
  ) => {
    e.preventDefault();
    setMenuAnchor({ x: e.clientX, y: e.clientY });
    setSelectedMessage(message);
  };

  return (
    <Box className="room-item-messages">
      <Box className="room-item-messages__header">
        {isMobile && (
          <IconButton onClick={() => setSelectedRoom(undefined)}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h3">
          {isPrivateRoom ? `${contact?.name} ${contact?.surname}` : room.name}
        </Typography>
      </Box>
      <Paper className="room-item-messages__list" elevation={0}>
        <div className="scrollable-div">
          <InfiniteScroll
            inverse={true}
            className="scrollable-div__scroller"
            dataLength={messages.length}
            next={() =>
              fetchMessages({ room: room.id, exclusiveKey: data?.ExclusiveKey })
            }
            hasMore={isUninitialized || !!data?.ExclusiveKey}
            height={"calc(100vh - 230px)"}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>The end</b>
              </p>
            }
            loader={<h4>Loading...</h4>}
          >
            <div ref={messagesEndRef} />
            {messages.map((message, index) => {
              const currentMessageDate = days(message.createdAt).format(
                "YYYY-MM-DD"
              );
              const nextMessageDate = days(
                messages[index + 1]?.createdAt
              ).format("YYYY-MM-DD");
              const isNewDate = currentMessageDate !== nextMessageDate;

              return (
                <Box key={message.id}>
                  {isNewDate && (
                    <Divider sx={{ my: 2 }}>
                      <Typography variant="caption" color="textSecondary">
                        {days(message.createdAt).format("DD MMMM YYYY")}
                      </Typography>
                    </Divider>
                  )}
                  <Box
                    className={`message-item-container ${
                      message.author === user?._id ? "me" : ""
                    }`}
                    ref={index === 0 ? lastMessageRef : null}
                    key={message.id}
                  >
                    <Box
                      id={message.id}
                      sx={{ display: "flex", gap: "6px" }}
                      onContextMenu={(e) => handleContextMenu(e, message)}
                    >
                      {message.author !== user?._id && (
                        <Avatar
                          sx={{ background: generateColor(room.id) }}
                          src={contact?.image}
                        >
                          {contact?.name[0]}
                        </Avatar>
                      )}
                      <ListItem
                        className={`message-item ${
                          message.author === user?._id ? "me" : ""
                        }`}
                      >
                        {message.reply && (
                          <Link href={`#${message.replyId}`}>
                            <Box
                              className="reply"
                              sx={{
                                backgroundColor:
                                  message.author === user?._id
                                    ? "rgba(60, 95, 209, 0.172)"
                                    : "transparent",
                              }}
                            >
                              <ReplyIcon />
                              {message.replyId &&
                                messages.find((m) => m.id === message.replyId)
                                  ?.attachments && (
                                  <img
                                    src={""}
                                    alt="attachment"
                                    loading="lazy"
                                  />
                                )}
                              <Typography variant="body1">
                                <ListItemText primary={message.reply} />
                              </Typography>
                            </Box>
                          </Link>
                        )}
                        {message.message && (
                          <ListItemText primary={message.message} />
                        )}
                        <ImageGallery attachments={message.attachments} />
                      </ListItem>
                    </Box>
                    {message.author === user?._id && (
                      <DoneAllIcon
                        color={`${
                          message.readBy.includes(contact?._id ?? "")
                            ? "primary"
                            : "disabled"
                        }`}
                        sx={{ alignSelf: "flex-start" }}
                      />
                    )}
                    <ListItemText
                      className="date"
                      secondary={days(message.createdAt).format("HH:mm")}
                      sx={{ fontSize: 12 }}
                    />
                  </Box>
                </Box>
              );
            })}
            <ContextMenu
              menuAnchor={menuAnchor}
              handleClose={() => setMenuAnchor(undefined)}
              onReply={() => setIsReply(true)}
            />
          </InfiniteScroll>
        </div>
      </Paper>

      <MessageInput
        roomId={room.id}
        selectedMessage={selectedMessage}
        resetSelectedMessage={() => {
          setSelectedMessage(undefined);
          setIsReply(false);
        }}
        isReply={isReply}
      />
    </Box>
  );
};
