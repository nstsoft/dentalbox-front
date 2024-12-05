import {
  useAddUsersToRoomMutation,
  useDeleteTheRoomMutation,
  useGetMeQuery,
  useLeaveTheRoomMutation,
  useTransferRoomOwnershipMutation,
} from "@api";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { PopoverProps } from "@mui/material/Popover";
import { Room } from "@types";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalType, setCurrentModalType] = useState<string>("");
  const isOwner = room.owner === me?.user._id;

  const submitHandler = (userids: string[]) => {
    if (currentModalType === "transferOwnership") {
      transferOwnership({ roomId: room.id, owner: userids[0] });
      return;
    }
    addUsers({ roomId: room.id, userids });
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
            <MenuItem
              key="add"
              onClick={() => {
                setCurrentModalType("addUsers");
                setIsModalOpen(true);
                onClose();
              }}
            >
              {t("menu.addUsers")}
            </MenuItem>,
            <MenuItem
              key="transfer"
              onClick={() => {
                setCurrentModalType("transferOwnership");
                setIsModalOpen(true);
                onClose();
              }}
            >
              {t("menu.transferOwnership")}
            </MenuItem>,
            <MenuItem key="delete" onClick={() => deleteTheRoom(room.id)}>
              {t("menu.delete")}
            </MenuItem>,
          ]
        ) : (
          <MenuItem key="leave" onClick={() => leaveTheRoom(room.id)}>
            {t("menu.leave")}
          </MenuItem>
        )}
      </Menu>
      <RoomModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={room.users}
        onSubmit={submitHandler}
        type={currentModalType}
      />
    </>
  );
};
