import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBeamoq6GCAGQdAMFZ1gPpNKvCLIBSSknA",
  authDomain: "twitter-clone-abc.firebaseapp.com",
  projectId: "twitter-clone-abc",
  storageBucket: "twitter-clone-abc.appspot.com",
  messagingSenderId: "415845717957",
  appId: "1:415845717957:web:45265b31809024c5055dac",
  measurementId: "G-MLCNS850M0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
