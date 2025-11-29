import * as admin from "firebase-admin";

let firebaseApp: admin.app.App | null = null;

if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  if (privateKey && projectId && clientEmail) {
    try {
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      console.log(" Firebase Admin inicializado correctamente");
    } catch (error) {
      console.error(" Error al inicializar Firebase Admin:", error);
    }
  } else {
    console.warn(" Firebase credentials incompletas");
  }
} else {
  firebaseApp = admin.apps[0] || null;
}

export { firebaseApp };
export const messaging = firebaseApp ? admin.messaging() : null;
