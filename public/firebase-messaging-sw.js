importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyC9-NjiiwdFUqs7jGRXerkp4XTpo-KIYAI",
  authDomain: "chamarket-10c31.firebaseapp.com",
  projectId: "chamarket-10c31",
  storageBucket: "chamarket-10c31.firebasestorage.app",
  messagingSenderId: "881220557896",
  appId: "1:881220557896:web:1a13465b593c7ca998cc7d"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handler de mensajes en background
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Background message:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/favicon.ico"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
