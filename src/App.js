import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Feed from "./components/Feed/Feed";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Widgets from "./components/Widgets/Widgets";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    // BEM naming convention
    <div className="app">
      {!user ? (
        <>
          <Router>
            <Redirect exact from="/" to="/login" />
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
            </Switch>
          </Router>
        </>
      ) : (
        <>
          <Router>
            <Redirect exact from="/" to="/home" />
            <Switch>
              {/* <Route path="/explore">
                <Sidebar />
                <Feed />
                <Widgets />
              </Route> */}
              {/* <Route path="/notifications">
                <Sidebar />
                <Feed />
                <Widgets />
              </Route> */}
              {/* <Route path="/messages">
                <Sidebar />
                <Feed />
                <Widgets />
              </Route> */}
              {/* <Route path="/bookmarks">
                <Sidebar />
                <Feed />
                <Widgets />
              </Route> */}
              {/* <Route path="/lists">
                <Sidebar />
                <Feed />
                <Widgets />
              </Route> */}
              {/* <Route path="/profile">
                <Sidebar />
                <Feed />
                <Widgets />
              </Route> */}
              {/* <Route path="/more">
                <Sidebar />
                <Feed />
                <Widgets />
              </Route> */}
              {/* This is the default route, */}
              <Route path="/home">
                <Sidebar />
                <Feed />
                <Widgets />
              </Route>
            </Switch>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
