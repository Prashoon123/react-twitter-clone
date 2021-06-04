import { Avatar } from "@material-ui/core";
import "./Post.css";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PublishIcon from "@material-ui/icons/Publish";
import db, { auth, storage } from "../../../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import IconButton from "@material-ui/core/IconButton";
import useLongPress from "../../../hooks/useLongPress";
import { useHistory } from "react-router";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: "none",
    display: "flex",
    alignItems: "start",
    color: "black",
    flexDirection: "column",
    padding: 10,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Post({
  timestamp,
  displayName,
  username,
  verified,
  uid,
  text,
  image,
  avatar,
  id,
  likes,
  singlePost,
}) {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [user] = useAuthState(auth);
  const [liked, setLiked] = useState(null);

  const LINK = `${window.location.href}`;

  const onLongPress = () => {
    if (user?.uid === uid) {
      handleOpen();
    }
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };

  const onClick = () => {};

  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  const checkIfLiked = () => {
    db.collection("users")
      .doc(user?.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setLiked(snapshot.data()[id]);
        }
      });
  };

  useEffect(() => {
    checkIfLiked();
  }, [checkIfLiked]);

  const like = (e) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    checkIfLiked();

    setTimeout(() => {
      if (liked !== true) {
        db.collection("users")
          .doc(user.uid)
          .set(
            {
              [id]: true,
            },
            { merge: true }
          );
        db.collection("posts")
          .doc(id)
          .set(
            {
              likes: likes + 1,
            },
            { merge: true }
          );
      } else if (liked === true) {
        db.collection("users")
          .doc(user.uid)
          .set(
            {
              [id]: false,
            },
            { merge: true }
          );
        db.collection("posts")
          .doc(id)
          .set(
            {
              likes: likes - 1,
            },
            { merge: true }
          );
      }
    }, 300);
  };

  const noEvent = (e) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  };

  const share = (e) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    handleOpen2();
  };

  const handleOpen = (e) => {
    e?.preventDefault();

    setOpen(true);
  };

  const handleOpen2 = (e) => {
    e?.preventDefault();

    setOpen2(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  // window.document.addEventListener("contextmenu", (event) =>
  //   event.preventDefault()
  // );

  const deletePost = () => {
    handleClose();

    const confirm = window.confirm(
      "Are you sure you want to delete this tweet?"
    );

    if (singlePost) {
      if (confirm === true) {
        history.push("/");

        setTimeout(() => {
          db.collection("posts").doc(id).delete();

          if (image) {
            storage.ref(`posts/${id}`).delete();
          }
        }, 500);
      }
    }

    if (!singlePost) {
      if (confirm === true) {
        db.collection("posts").doc(id).delete();

        if (image) {
          storage.ref(`posts/${id}`).delete();
        }
      }
    }
  };

  // const editPost = () => {
  //   const newMessage = prompt("Please enter the new tweet -");

  //   if (!newMessage || newMessage[0] === " ") {
  //     return;
  //   }

  //   db.collection("posts").doc(id).update({
  //     text: newMessage,
  //   });

  //   handleClose();
  // };

  return (
    <div
      className="post"
      onContextMenu={uid === user?.uid && handleOpen}
      {...longPressEvent}
    >
      <div className="post__avatarcontainer">
        <Avatar className="post__avatar" src={avatar} />
      </div>
      <div className="post__body" onClick={() => history.push(`/tweet/${id}`)}>
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {displayName}{" "}
              <span className="post__headerSpecial">
                {verified && <VerifiedUserIcon className="post__badge" />} @
                {username}
              </span>
            </h3>
            <p className="post__timestamp">{`${new Date(
              timestamp?.toDate()
            ).toUTCString()}`}</p>
          </div>
          <div className="post__headerDescription">
            <p>{text}</p>
          </div>
        </div>
        {image && <img src={image} alt="tweetImg" loading="lazy" />}
        <div className="post__footer">
          <IconButton onClick={noEvent}>
            <ChatBubbleOutlineIcon
              fontSize="small"
              style={{ color: "white" }}
            />
          </IconButton>
          <IconButton onClick={noEvent}>
            <RepeatIcon fontSize="small" style={{ color: "white" }} />
          </IconButton>
          <div>
            <IconButton
              className="post__likeButton"
              color="secondary"
              onClick={like}
            >
              {liked ? (
                <FavoriteIcon fontSize="small" style={{ color: "#E0245E" }} />
              ) : (
                <FavoriteBorderIcon
                  fontSize="small"
                  className="post__likeIcon"
                />
              )}
              {likes > 0 && (
                <>
                  {liked ? (
                    <p className="post__likeText">{likes}</p>
                  ) : (
                    <p className="post__unlikeText">{likes}</p>
                  )}
                </>
              )}
            </IconButton>
          </div>
          <IconButton
            color="primary"
            onClick={share}
            className="post__shareButton"
          >
            <PublishIcon className="post__shareIcon" fontSize="small" />
          </IconButton>
        </div>
      </div>
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <div className={classes.paper}>
          {user?.uid === uid && (
            <>
              <div onClick={deletePost} className="post__btn">
                <p style={{ color: "red" }}>Delete Tweet</p>
              </div>
              {/* <div onClick={editPost} className="post__btn">
                <p>Edit Tweet</p>
              </div> */}
            </>
          )}
        </div>
      </Modal>
      <Modal open={open2} onClose={handleClose2} className={classes.modal}>
        <div className={classes.paper}>
          <h2>Share</h2>
          <div className="space" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "80%",
              marginLeft: -10,
            }}
          >
            <EmailShareButton
              subject="Twitter Clone Tweet"
              body={"Hi, check out this tweet on the Twitter clone!!"}
              url={LINK}
            >
              <EmailIcon size={32} round={true} />
            </EmailShareButton>

            <TwitterShareButton
              title={"Hi, check out this tweet on the Twitter clone!!"}
              via="PrashoonB"
              url={LINK}
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>

            <FacebookShareButton
              quote="Hi, check out this tweet on the Twitter clone!"
              url={LINK}
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>

            <WhatsappShareButton
              title={"Hi, check out this tweet on the Twitter clone!!"}
              url={LINK}
            >
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>

            <TelegramShareButton
              title={"Hi, check out this tweet on the Twitter clone!!"}
              url={LINK}
            >
              <TelegramIcon size={32} round={true} />
            </TelegramShareButton>

            <RedditShareButton
              title={"Hi, check out this tweet on the Twitter clone!!"}
              url={LINK}
            >
              <RedditIcon size={32} round={true} />
            </RedditShareButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Post;
