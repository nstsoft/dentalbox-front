import "./chat.scss";

import { useGetUserSummaryQuery } from "@api";
import CardMedia from "@mui/material/CardMedia";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid2 from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useTranslation } from "react-i18next";
import { Autocomplete, TextField } from "@mui/material";
import { Rooms } from "./components";

export const ChatPage = () => {
  const { t } = useTranslation("", { keyPrefix: "pages.chat" });
  const { data: users } = useGetUserSummaryQuery();
  const navigate = useNavigate();
  const params = useParams();
  const [activeUser, setActiveUser] = useState<string>(params.id ?? "");
  const [isFilterShown, setIsFilterShown] = useState(false);
  const filteredUsers = users?.filter((user) => !user.deleted);

  return (
    <Grid2 className="chat-container" container>
      <Grid2 className="chat-sidebar" size={3}>
        <Button
          className="new-chat-button"
          onClick={() => setIsFilterShown(!isFilterShown)}
        >
          <AddCircleOutlineIcon />
          <Typography variant="h6">{t("newChat")}</Typography>
        </Button>
        {isFilterShown && (
          <Autocomplete
            fullWidth
            disablePortal
            options={
              filteredUsers?.map((user) => ({
                label: `${user.name} ${user.surname}`,
                key: user._id,
              })) ?? []
            }
            onChange={(_, value) => {
              console.log(value);
              if (value && users?.find((user) => user._id === value.key)) {
                setActiveUser(value.key);
                navigate(`${value.key}`);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label={t("search")} />
            )}
          />
        )}
        <Rooms />
        {/* <List>
          {users?.map((user) => (
            <ListItem
              className={`chat-item ${
                user._id === activeUser && "Mui-selected"
              }`}
              key={user._id}
              onClick={() => {
                setActiveUser(user._id);
                navigate(`${user._id}`);
              }}
            >
              <ListItemButton sx={{ p: 0, pl: 1, height: 60 }}>
                <ListItemIcon>
                  {user.image ? (
                    <CardMedia
                      className="avatar"
                      component="img"
                      image={user.image}
                    />
                  ) : (
                    <AccountCircleIcon className="avatar" />
                  )}
                </ListItemIcon>
                <ListItemText primary={`${user.name} ${user.surname}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Grid2>
      <Grid2 size={9}>
        {activeUser ? (
          <Outlet />
        ) : (
          <Box className="no-active">{t("noActive")}</Box>
        )}
      </Grid2>
    </Grid2>
  );
};
