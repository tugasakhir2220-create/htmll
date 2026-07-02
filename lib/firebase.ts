import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import { getDatabase, type Database } from "firebase/database"

// Firebase web config is safe to expose on the client. Values fall back to the
// original TRAFFIC CARE project so the dashboard works out of the box, but can
// be overridden with NEXT_PUBLIC_* environment variables.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyC7a3dsribFp4Gre_Jojk1zkTkEzC0SYVI",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "traffic-care-a41ea.firebaseapp.com",
  databaseURL:
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ??
    "https://traffic-care-a41ea-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "traffic-care-a41ea",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "traffic-care-a41ea.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "316943309672",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:316943309672:web:29dbd63fda25947ed014dd",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-PFZTFJM9BG",
}

const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db: Database = getDatabase(app)
