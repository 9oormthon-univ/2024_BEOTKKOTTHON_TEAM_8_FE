importScripts(
  'https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js',
);

const config = {
  apiKey: 'AIzaSyA3QAiGn1ViwVjx79yw0wETEARhV4_Ni_0',
  projectId: 'worrybox-ded5a',
  messagingSenderId: '766004840414',
  appId: '1:766004840414:web:7e1692f6b28e6a9e5abf4f',
};

firebase.initializeApp(config);

const messaging = firebase.messaging();
message.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] 배경 메시지 수신 ', payload);
  constnotificationTitle = payload.notification.title;
  constnotificationOptions = {
    body: payload.notification.body,
    icon: './logo.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
