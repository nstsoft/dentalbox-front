import {
  useAddUsersToRoomMutation,
  useDeleteTheRoomMutation,
  useGetMeQuery,
  useGetUserSummaryQuery,
  useLeaveTheRoomMutation,
  useTransferRoomOwnershipMutation,
} from "@api";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { PopoverProps } from "@mui/material/Popover";
import { Room, UserSummaryListItem } from "@types";
import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { RoomModal } from "./Modal";

type Props = {
  room: Room;
  open: boolean;
  onClose: () => void;
  anchorPosition: PopoverProps["anchorPosition"];
};

export const ActionsMenu: FC<Props> = ({
  room,
  open,
  onClose,
  anchorPosition,
}) => {
  const { t } = useTranslation("", { keyPrefix: "pages.chat" });
  const [deleteTheRoom] = useDeleteTheRoomMutation();
  const [leaveTheRoom] = useLeaveTheRoomMutation();
  const [transferOwnership] = useTransferRoomOwnershipMutation();
  const [addUsers] = useAddUsersToRoomMutation();
  const { data: me } = useGetMeQuery();
  const { data: users } = useGetUserSummaryQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalType, setCurrentModalType] = useState<string>("");
  const isOwner = room.owner === me?.user._id;
  const activeUsers = users?.filter((user) => !user.deleted);
  const [usersForMenu, setUsersForMenu] = useState<UserSummaryListItem[]>([]);

  const submitHandler = (userids: string[]) => {
    if (currentModalType === "transferOwnership") {
      transferOwnership({ roomId: room.id, owner: userids[0] });
      return;
    }
    if (currentModalType === "delete") {
      deleteTheRoom(room.id);
      return;
    }
    if (currentModalType === "leave") {
      leaveTheRoom(room.id);
      return;
    }
    addUsers({ roomId: room.id, userids });
  };

  const onActionHandler = (type: string) => {
    setUsersForMenu(
      type === "addUsers"
        ? activeUsers?.filter(
            (user) =>
              ![...room.users.map((u) => u._id), me?.user._id].includes(
                user._id
              )
          ) ?? []
        : room.users
    );
    setCurrentModalType(type);
    setIsModalOpen(true);
    onClose();
  };

  return (
    <>
      <Menu
        open={open}
        onClose={onClose}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
      >
        {isOwner ? (
          [
            <MenuItem key="add" onClick={() => onActionHandler("addUsers")}>
              {t("menu.addUsers")}
            </MenuItem>,
            <MenuItem
              key="transfer"
              onClick={() => onActionHandler("transferOwnership")}
            >
              {t("menu.transferOwnership")}
            </MenuItem>,
            <MenuItem key="delete" onClick={() => onActionHandler("delete")}>
              {t("menu.delete")}
            </MenuItem>,
          ]
        ) : (
          <MenuItem key="leave" onClick={() => onActionHandler("leave")}>
            {t("menu.leave")}
          </MenuItem>
        )}
      </Menu>
      <RoomModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={usersForMenu}
        onSubmit={submitHandler}
        type={currentModalType}
      />
    </>
  );
};
