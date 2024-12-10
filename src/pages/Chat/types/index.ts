import { UserSummaryListItem } from "@types";

export type ModalType = "addUsers" | "delete" | "leave" | "transferOwnership";

export type UsersMap = { [key: string]: UserSummaryListItem & { online: boolean } };
