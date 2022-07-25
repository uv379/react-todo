import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfjB192C43KfhxsnPwTves78V53W7EXtI",
  authDomain: "react-todo-list-b720a.firebaseapp.com",
  projectId: "react-todo-list-b720a",
  storageBucket: "react-todo-list-b720a.appspot.com",
  messagingSenderId: "239380069609",
  appId: "1:239380069609:web:5553c335e6572ea8c90478",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
