import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  
  apiKey: `${process.env.REACT_APP_DB_API_KEY}`,
  authDomain: `${process.env.REACT_APP_DB_AUTH_DOMAIN}`,
  databaseURL: `${process.env.REACT_APP_DB_DATABASE_URL}`,
  projectId: `${process.env.REACT_APP_DB_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_DB_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_DB_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_DB_APP_ID}`,
};

var firebaseDb = firebase.initializeApp(firebaseConfig);

export default firebaseDb.firestore();
