import { useRef } from "react";
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
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SinglePost from "./components/SinglePost/SinglePost";

function App() {
  const [user] = useAuthState(auth);
  const input = useRef(null);

  console.log(user);

  if (!user) {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }

  return (
    // BEM naming convention
    <div className="app">
      <>
        <Router>
          <Switch>
            <Route path="/tweet/:id">
              <SinglePost />
            </Route>
            <Route path="/">
              <Sidebar input={input} />
              <Feed input={input} />
              <Widgets />
            </Route>
          </Switch>
        </Router>
      </>
    </div>
  );
}

export default App;
