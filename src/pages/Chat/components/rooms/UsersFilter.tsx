import { IconButton } from "@elements";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { UserSummaryListItem } from "@types";
import SendIcon from "@mui/icons-material/Send";
import { type FC, useState } from "react";
import { useCreateRoomMutation } from "@api";
import { useTranslation } from "react-i18next";

import "../../chat.scss";

type Props = {
  availableUsers: UserSummaryListItem[];
};

export const UsersFilter: FC<Props> = ({ availableUsers }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.chat" });
  const [newRoom, setNewRoom] = useState<UserSummaryListItem | null>(null);
  const [createRoom] = useCreateRoomMutation();

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
    <Box className="new-chat-input">
      <Autocomplete
        fullWidth
        disablePortal
        options={
          availableUsers?.map((user) => ({
            label: `${user.name} ${user.surname}`,
            key: user._id,
            image: user.image,
            ...user,
          })) ?? []
        }
        value={newRoom}
        onChange={(_, value) => setNewRoom(value)}
        renderInput={(params) => <TextField {...params} label={t("search")} />}
      />
      <IconButton onClick={createNewRoom}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};
