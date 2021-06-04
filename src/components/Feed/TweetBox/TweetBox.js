import { Avatar, Button } from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import GifOutlinedIcon from "@material-ui/icons/GifOutlined";
import PollOutlinedIcon from "@material-ui/icons/PollOutlined";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import "./TweetBox.css";
import { useEffect, useRef, useState } from "react";
import db, { auth, storage } from "../../../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Picker from "emoji-picker-react";

function TweetBox({ input }) {
  const [user] = useAuthState(auth);
  const [tweetMessage, setTweetMessage] = useState("");
  const [showPicker, setShowPicker] = useState(null);
  const inputFile = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setTweetMessage(tweetMessage + emojiObject.emoji);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("posts")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        displayName: user.displayName,
        username: user.email || user.providerData[0].email,
        verified: user.emailVerified,
        text: tweetMessage,
        avatar: user.photoURL,
        uid: user.uid,
        likes: 0,
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, "data_url");

          removeImage();

          uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            null,
            (error) => console.warn(error),
            () => {
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      image: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });

    setTweetMessage("");
    setImageToPost(null);
  };

  const showEmojiPicker = (e) => {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    setShowPicker(!showPicker);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      if (e.target.files[0].type.substring(0, 5) !== "image") {
        return alert("Invalid file type uploaded!");
      }
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <>
      <div className="tweetBox" onClick={() => setShowPicker(false)}>
        <form>
          <div className="tweetBox__input">
            <Avatar src={user.photoURL} />
            <div className="tweetBox__inputs">
              <input
                className="tweetBox__inputText"
                value={tweetMessage}
                onChange={(e) => setTweetMessage(e.target.value)}
                placeholder="What's happening?"
                ref={input}
              />
              {imageToPost && (
                <div className="tweetBox__previewImgContainer">
                  <img
                    src={imageToPost}
                    loading="lazy"
                    className="tweetBox__previewImg"
                  />
                  <p className="tweetBox__remove" onClick={removeImage}>
                    Remove
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="tweetBox__alloptions">
            <div className="tweetBox__options">
              <ImageOutlinedIcon onClick={() => inputFile.current.click()} />
              <input
                type="file"
                hidden
                ref={inputFile}
                onChange={addImageToPost}
                accept="image/*"
              />
              <GifOutlinedIcon className="tweetBox__hidden" />
              <PollOutlinedIcon className="tweetBox__hidden" />
              <EmojiEmotionsOutlinedIcon onClick={showEmojiPicker} />
              <CalendarTodayOutlinedIcon className="tweetBox__hidden" />
            </div>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!tweetMessage || tweetMessage[0] === " "}
              className={`tweetBox__btn ${
                (!tweetMessage && "tweetBox__btn--disabled") ||
                (tweetMessage[0] === " " && "tweetBox__btn--disabled")
              }`}
            >
              Tweet
            </Button>
          </div>
        </form>
      </div>
      {showPicker && (
        <div className="picker">
          <Picker
            onEmojiClick={onEmojiClick}
            pickerStyle={{ boxShadow: "none" }}
            groupVisibility={{
              recently_used: false,
            }}
          />
        </div>
      )}
    </>
  );
}

export default TweetBox;
