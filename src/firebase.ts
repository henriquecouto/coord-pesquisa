import firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "./firebase-setup.json";

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
