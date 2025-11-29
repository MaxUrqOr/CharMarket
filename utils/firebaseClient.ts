import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

console.log("⚙️ Firebase Config:", firebaseConfig);

export const app = initializeApp(firebaseConfig);

const auth = typeof window !== "undefined" ? getAuth(app) : null;
const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

async function ensureAnonymousAuth() {
  if (!auth) return;

  return new Promise<void>((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("👤 Usuario YA autenticado:", user.uid);
        resolve();
      } else {
        console.log("🆕 Autenticando usuario anónimo...");
        await signInAnonymously(auth);
        resolve();
      }
    });
  });
}

export async function obtenerTokenFCM() {
  if (!messaging) {
    console.warn("⚠️ Messaging no está disponible (server-side?).");
    return "";
  }

  try {
    console.log("⏳ Esperando autenticación anónima...");
    await ensureAnonymousAuth();

    console.log("⏳ Esperando Service Worker READY...");
    const registration = await navigator.serviceWorker.ready;
    console.log("✔️ Service Worker READY:", registration);

    console.log("⏳ Solicitando token FCM...");
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
      serviceWorkerRegistration: registration,
    });

    console.log("🔥 TOKEN FCM OBTENIDO:", token);
    return token;

  } catch (err) {
    console.error("❌ Error en obtenerTokenFCM:", err);
    return "";
  }
}
