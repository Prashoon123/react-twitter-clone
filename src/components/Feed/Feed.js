import { useEffect, useState } from "react";
import "./Feed.css";
import Post from "./Post/Post";
import TweetBox from "./TweetBox/TweetBox";
import db from "../../firebase";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);

  return (
    <div className="feed">
      {/* Header */}
      <div className="feed__header">
        <h2>Latest Tweets</h2>
      </div>

      <TweetBox />

        {posts.map((post) => (
          <Post
            timestamp={post.timestamp}
            displayName={post.displayName}
            username={post.username}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
          />
        ))}
    </div>
  );
}

export default Feed;
