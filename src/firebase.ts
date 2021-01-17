import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/auth";
import firebaseConfig from "./firebase-setup.json";

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const firestore = firebase.firestore();
export const auth = firebase.auth();
