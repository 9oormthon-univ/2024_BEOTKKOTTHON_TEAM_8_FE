importScripts(
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js',
);

firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
});

const messaging = firebase.messaging();

// Background Message Handler
messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );
  // 사용자에게 표시할 알림의 옵션을 사용자 정의하고 표시합니다.
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});

// const app = initializeApp(firebaseConfig);

// useEffect(() => {
//   setTokenHandler();
// }, []);

// const setTokenHandler = async () => {
//   const messaging = getMessaging(app);

//   await getToken(messaging, {
//     vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
//   })
//     .then(async (currentToken) => {
//       if (!currentToken) {
//         console.log('토큰이 없습니다.');
//       } else {
//         console.log('토큰이 있습니다.', currentToken);
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// const serviceAccount = {
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//   clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
// };

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }
