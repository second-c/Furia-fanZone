import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDHHAJY86r8dWXPLTDpsD9XuPBCwv5QXug",
  authDomain: "furia-fanzone-6b784.firebaseapp.com",
  databaseURL: "https://furia-fanzone-6b784-default-rtdb.firebaseio.com",
  projectId: "furia-fanzone-6b784",
  storageBucket: "furia-fanzone-6b784.firebasestorage.app",
  messagingSenderId: "168773910247",
  appId: "1:168773910247:web:ed66fcf1b8c53ef0146c42",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };