import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import avatar from "../../../../assets/svg/avatar.svg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import chat from "../../../../assets/svg/chat.svg";
import ForumIcon from "@mui/icons-material/Forum";
import classes from "../Navbar.module.css";
import { useState } from "react";
import AddIcon from "@mui/icons-material/EventOutlined";
import { logoutUser } from "../../../../redux/userSlice";
import Image from "next/image";
import MenuBookIcon from "@mui/icons-material/BookmarkAddOutlined";
import { useRouter } from "next/router";
import Badge from "@mui/material/Badge";
const UserAvatar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="notification">
          <Badge
            badgeContent={4}
            color="primary"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <NotificationsActiveRoundedIcon
              className={classes.notificationUser}
              style={{ fontSize: "30px", marginTop: "-1px" }}
            />
          </Badge>
        </Tooltip>
        <Tooltip title="Messages">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 1 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <ForumIcon className={classes.user} style={{ fontSize: "30px" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 1 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
             {user.avatar ?
            <Image className={classes.user}
             style={{ borderRadius: "50%" }}
              width={"43"}
              height={"43"}
              alt={user.email} 
             src={require(`../../../../../5theyear/img/${user.avatar}`)} />
             : <Avatar className={classes.user} alt={user.email}  src={avatar} />
             }
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem 
        onClick={() => {
          router.push("/profile");
      }}>
          <Avatar /> Profile
        </MenuItem>

        <Divider />
        <MenuItem
          onClick={() => {
            router.push("/mycourses");
          }}
        >
          <MenuBookIcon /> My Courses
        </MenuItem>

       {user.role === "admin" && <MenuItem onClick={() => {
            router.push("/addnewmeeting");
          }}>
          <AddIcon /> New Meetings
        </MenuItem> }

        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(logoutUser({ email: "" }));
            router.replace("/");
            console.log(user);
            // localStorage.removeItem("educativeUser");
            // dispatch(loginUser(null));
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserAvatar;
