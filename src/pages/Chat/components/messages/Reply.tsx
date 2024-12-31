import Box from "@mui/material/Box";
import ReplyIcon from "@mui/icons-material/Reply";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Message } from "@types";
import { useAuth } from "@hooks";
import { type FC } from "react";
import { IMAGES_ENDINGS } from "./constants";

type Props = {
  reply?: Message;
};

export const Reply: FC<Props> = ({ reply }) => {
  const { user } = useAuth();

  return (
    <>
      {reply && (
        <Link href={`#${reply.id}`}>
          <Box
            className="reply"
            sx={{
              backgroundColor:
                reply.author === user?._id
                  ? "rgba(60, 95, 209, 0.172)"
                  : "#e3e3e3",
            }}
          >
            <ReplyIcon />
            {reply.attachments.length > 0 &&
              IMAGES_ENDINGS.some((ext) =>
                reply.attachments[0].endsWith(ext)
              ) && (
                <img
                  className="reply-attachment"
                  src={reply.attachments[0]}
                  alt="attachment"
                  loading="lazy"
                />
              )}
            <Typography className="reply-message">
              {reply.message || reply.attachments[0].split("/").pop()}
            </Typography>
          </Box>
        </Link>
      )}
    </>
  );
};
