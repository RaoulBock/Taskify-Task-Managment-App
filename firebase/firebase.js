// firebase.js
import { initializeApp } from "firebase/app";
import auth from "@react-native-firebase/auth"; // Import from @react-native-firebase/auth
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLButpzUOPnneotrp-3PGJK19wZ6K3F84",
  authDomain: "auth-development-e9e5a.firebaseapp.com",
  projectId: "auth-development-e9e5a",
  storageBucket: "auth-development-e9e5a.appspot.com",
  messagingSenderId: "1084922291104",
  appId: "1:1084922291104:web:7bbbcb9f6316cad8233ac5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { auth, db };
