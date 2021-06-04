import { useHistory, useParams } from "react-router";
import "./SinglePost.css";
import { useDocument } from "react-firebase-hooks/firestore";
import db from "../../firebase";
import Post from "../Feed/Post/Post";
import { ArrowBack } from "@material-ui/icons";

function SinglePost() {
  const { id } = useParams();
  const history = useHistory();
  const [post, loading] = useDocument(db.doc(`posts/${id}`));

  return (
    <>
      <div className="singlePost">
        <div className="singlePost__header">
          <div onClick={() => history.push("/")}>
            <ArrowBack />
          </div>
          <h2>Tweet</h2>
        </div>

        <div className="singlePost__container">
          {post && !loading && post.exists !== false ? (
            <Post
              key={post?.id}
              id={post?.id}
              timestamp={post?.data().timestamp}
              displayName={post?.data().displayName}
              username={post?.data().username}
              verified={post?.data().verified}
              text={post?.data().text}
              avatar={post?.data().avatar}
              image={post?.data().image}
              uid={post?.data().uid}
              likes={post?.data().likes}
              singlePost
            />
          ) : (
            <>
              {post?.exists === false && (
                <h1>Sorry we are unable to show the tweet!</h1>
              )}
              {loading && ""}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SinglePost;
