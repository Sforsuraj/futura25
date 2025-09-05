// firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA7YlPoQLezs9JvjPXhtet53hHVT4zCWNQ",
  authDomain: "futura2025-fe459.firebaseapp.com",
  databaseURL: "https://futura2025-fe459-default-rtdb.firebaseio.com",
  projectId: "futura2025-fe459",
  storageBucket: "futura2025-fe459.firebasestorage.app",
  messagingSenderId: "1030611241958",
  appId: "1:1030611241958:web:c7ac0d75f793e0406a2427",
  measurementId: "G-PL9JB201XQ"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);