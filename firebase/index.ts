import { getApps, initializeApp } from "firebase/app";
import { isSupported, getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: String(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  authDomain: String(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
  projectId: String(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  appId: String(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
  storageBucket: String(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  ),
  measurementId: String(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID),
};

// Initialize the Firebase app if it's not already initialized
const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export { firebaseApp };
