import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { type FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { IconButton } from "@elements";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessageMutation } from "@api";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { Toaster } from "@components";

type Props = {
  roomId: string;
};

export const MessageInput: FC<Props> = ({ roomId }) => {
  const { t } = useTranslation("", { keyPrefix: "pages.chat" });
  const [input, setInput] = useState("");
  const [messageFiles, setMessageFiles] = useState<File[]>([]);
  const [createMessage, { error }] = useCreateMessageMutation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSendMessage = () => {
    createMessage({ message: input, room: roomId, files: messageFiles });

    setInput("");
    setMessageFiles([]);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(
        <Toaster
          actionName="Send Message Error"
          message={(error as any)?.data.message}
        />
      );
    }
  }, [error]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).filter(
        (newFile) =>
          !messageFiles.some(
            (existingFile) => existingFile.name === newFile.name
          )
      );

      setMessageFiles((prevFiles) => [...prevFiles, ...newFiles]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
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
            startAdornment: (
              <InputAdornment position="start">
                <Box className="files">
                  {messageFiles.map((file) => (
                    <Box key={file.name} className="file-name">
                      <Typography>
                        {file.name.length > 15
                          ? `${file.name.slice(0, 15)}...`
                          : file.name}
                      </Typography>
                      <IconButton
                        onClick={() => {
                          setMessageFiles((prev) =>
                            prev.filter((f) => f.name !== file.name)
                          );
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  disabled={messageFiles.length > 5}
                  component="label"
                  role={undefined}
                  variant="text"
                  tabIndex={-1}
                  sx={{ minWidth: "30px", p: 0 }}
                >
                  <AttachFileIcon />
                  <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    accept="image/*,application/pdf /application/dim "
                    multiple
                    onChange={handleFileChange}
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
  );
};
