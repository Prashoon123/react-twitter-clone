import "./Widgets.css";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
  TwitterFollowButton,
} from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";

function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets__search">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>
      <div className="widgets__widgetContainer">
        <div className="widgets__h2">
          <h2>What’s happening</h2>
        </div>
        <div className="widgets__tweetEmbed">
          <TwitterTweetEmbed
            options={{ theme: "dark" }}
            tweetId={"1318970966014193664"}
          />
        </div>
        <div className="widgets__tweetShare">
          <TwitterShareButton
            url={"https://twitter-clone-abc.web.app/"}
            options={{
              text:
                "This #Twitter Clone is amazing, just looks like the real Twitter website!!",
              via: "PrashoonB",
            }}
          />
        </div>
        <div className="widgets__folllowButton">
          <TwitterFollowButton screenName={"PrashoonB"} />
        </div>
      </div>
    </div>
  );
}

export default Widgets;
