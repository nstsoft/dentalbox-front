export type Message = {
  id: string;
  createdAt: string;
  author: string;
  room: string;
  message: string;
  readBy: string[];
  attachments: string[];
  timestamp: number;
};
