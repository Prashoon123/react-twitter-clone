import "./Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption/SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link style={{ textDecoration: "none", color: "white" }} to="/home">
        <TwitterIcon className="sidebar__icon" />
      </Link>

      <Link style={{ textDecoration: "none" }} to="/home">
        <SidebarOption active Icon={HomeIcon} text="Home" />
      </Link>
      {/* <Link style={{ textDecoration: "none", color: "white" }} to="/explore"> */}
        <SidebarOption Icon={ExploreIcon} text="Explore" />
      {/* </Link> */}
      {/* <Link
        style={{ textDecoration: "none", color: "white" }}
        to="/notifications"
      > */}
        <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
      {/* </Link> */}
      {/* <Link style={{ textDecoration: "none", color: "white" }} to="/messages"> */}
        <SidebarOption Icon={MailOutlineIcon} text="Messages" />
      {/* </Link> */}
      {/* <Link style={{ textDecoration: "none", color: "white" }} to="/bookmarks"> */}
        <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
      {/* </Link> */}
      {/* <Link style={{ textDecoration: "none", color: "white" }} to="/lists"> */}
        <SidebarOption Icon={ListAltIcon} text="Lists" />
      {/* </Link> */}
      {/* <Link style={{ textDecoration: "none", color: "white" }} to="/profile"> */}
        <SidebarOption Icon={PermIdentityIcon} text="Profile" />
      {/* </Link> */}
      {/* <Link style={{ textDecoration: "none", color: "white" }} to="/more"> */}
        <SidebarOption Icon={MoreHorizIcon} text="More" />
      {/* </Link> */}

      <Button variant="outlined" className="sidebar__tweetButton" fullWidth>
        Tweet
      </Button>
    </div>
  );
}

export default Sidebar;
