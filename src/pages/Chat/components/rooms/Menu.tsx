import {
  useAddUsersToRoomMutation,
  useDeleteTheRoomMutation,
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
import { useAuth } from "@hooks";

type Props = {
  room: Room;
  open: boolean;
  onClose: () => void;
  anchorPosition: PopoverProps["anchorPosition"];
};

type ModalType = "addUsers" | "delete" | "leave" | "transferOwnership";

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
  const { user } = useAuth();
  const { data: users } = useGetUserSummaryQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType | undefined>();
  const isOwner = room?.owner === user?._id;
  const userList =
    users?.filter((u) => !u.deleted && user?._id !== u._id) ?? [];

  const usersToAdd = userList.filter(
    (u) => !room?.users.some((r) => r._id === u._id)
  );
  const usersToTransferOwnership =
    room?.users.filter(({ _id }) => _id !== user?._id) ?? [];

  const submitHandler = (userids: string[]) => {
    if (modalType === "transferOwnership") {
      transferOwnership({ roomId: room.id, owner: userids[0] });
      return;
    }
    if (modalType === "delete") {
      deleteTheRoom(room.id);
      return;
    }
    if (modalType === "leave") {
      leaveTheRoom(room.id);
      return;
    }
    addUsers({ roomId: room.id, userids });
  };

  const onActionHandler = (type: ModalType) => {
    setModalType(type);
    setIsModalOpen(true);
    onClose();
  };

  let usersFormModal: UserSummaryListItem[] = [];
  if (modalType === "addUsers") {
    usersFormModal = usersToAdd;
  } else if (modalType === "transferOwnership") {
    usersFormModal = usersToTransferOwnership;
  }

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
        users={usersFormModal}
        onSubmit={submitHandler}
        type={modalType}
      />
    </>
  );
};
