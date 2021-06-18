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
import { Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

function Sidebar({ input }) {
  const [user] = useAuthState(auth);

  const userEmail = user?.email || user?.providerData[0].email;

  return (
    <div className="sidebar">
      <Link style={{ textDecoration: "none", color: "white" }} to="/">
        <TwitterIcon className="sidebar__icon" />
      </Link>

      <Link style={{ textDecoration: "none" }} to="/">
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

      <div
        variant="outlined"
        className="sidebar__tweetButton"
        onClick={() => input.current.focus()}
      >
        {/* <AddIcon /> */}
        <svg
          viewBox="0 0 24 24"
          height="22"
          width="22"
          fill="#fff"
          aria-hidden="true"
          class="r-jwli3a r-4qtqp9 r-yyyyoo r-1q142lx r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1srniue"
        >
          <g>
            <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"></path>
          </g>
        </svg>
      </div>

      <Button
        variant="outlined"
        className="sidebar__tweetButtonBig"
        fullWidth
        onClick={() => input.current.focus()}
      >
        Tweet
      </Button>

      <div className="sidebar__user">
        <Avatar
          onClick={() => auth.signOut()}
          src={user?.photoURL}
          height="40"
          width="40"
        />
        <div className="sidebar__userMore">
          <p>
            {user?.displayName.length > 16
              ? `${user?.displayName.substring(0, 16)}...`
              : user?.displayName}
          </p>
          <p className="sidebar__username">
            {userEmail?.length > 16
              ? `@${userEmail?.substring(0, 16)}...`
              : user?.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
