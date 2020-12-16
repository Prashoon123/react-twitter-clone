import { Avatar, Button } from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import GifOutlinedIcon from "@material-ui/icons/GifOutlined";
import PollOutlinedIcon from "@material-ui/icons/PollOutlined";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import "./TweetBox.css";
import { useState } from "react";
import { useStateValue } from "../../../StateProvider";
import db from "../../../firebase";
import firebase from "firebase";

function TweetBox() {
  const [{ user }, dispatch] = useStateValue();
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      displayName: user.displayName,
      username: user.email,
      verified: user.emailVerified,
      text: tweetMessage,
      image: tweetImage,
      avatar: user.photoURL
    });

    setTweetMessage("");
    setTweetImage("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src={user.photoURL} />
          <div className="inputTextContainer">
            <input
              className="tweetBox__inputText"
              value={tweetMessage}
              onChange={(e) => setTweetMessage(e.target.value)}
              placeholder="What's happening?"
            />
          </div>
          <div className="tweetBox__inputImageContainer">
            <input
              value={tweetImage}
              onChange={(e) => setTweetImage(e.target.value)}
              className="tweetBox__inputImage"
              placeholder="Enter image URL (optional)"
              // Enter image URL (optional)
            />
          </div>
        </div>
        <div className="tweetBox__alloptions">
          <div className="tweetBox__options">
            <ImageOutlinedIcon />
            <GifOutlinedIcon />
            <PollOutlinedIcon />
            <EmojiEmotionsOutlinedIcon />
            <CalendarTodayOutlinedIcon />
          </div>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!tweetMessage}
            className={`tweetBox__btn ${!tweetMessage && "tweetBox__btn--disabled"}`}
          >
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TweetBox;
