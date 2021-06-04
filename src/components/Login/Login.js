import "./Login.css";
import login__logo from "./logo-with-text.png";
import db, { auth, provider, twitterProvider } from "../../firebase";
import { useHistory } from "react-router";
import {
  TwitterLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { useAuthState } from "react-firebase-hooks/auth";
import { FadingCircle } from "better-react-spinkit";

function Login() {
  const history = useHistory();
  const [user, loading] = useAuthState(auth);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       history.push("/");
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  const signIn = () => {
    // sign in...
    auth
      .signInWithPopup(provider)
      .then((authUser) => {
        db.collection("users").doc(authUser.user.uid).set(
          {
            email: authUser.user.email,
            uid: authUser.user.uid,
            photoURL: authUser.user.photoURL,
          },
          { merge: true }
        );
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const signInWithTwitter = () => {
    auth
      .signInWithPopup(twitterProvider)
      .then((authUser) => {
        db.collection("users")
          .doc(authUser.user.uid)
          .set(
            {
              email: authUser.user.email || authUser.user.providerData[0].email,
              uid: authUser.user.uid,
              photoURL: authUser.user.photoURL,
            },
            { merge: true }
          );
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <img src={login__logo} alt="twitterLogo" className="login__logo" />
      {loading ? (
        <>
          <h2>Logging you in...</h2>
          <div className="space" />
          <FadingCircle size={80} color="white" />
        </>
      ) : (
        <div className="login__loginButtons">
          <TwitterLoginButton onClick={signInWithTwitter} />
          <div className="space" />
          <GoogleLoginButton onClick={signIn} />
        </div>
      )}
    </div>
  );
}

export default Login;
