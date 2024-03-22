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

/** 백그라운드 상태일 때 FCM에서 보낸 푸시 알림 메시지를 수신할 때 호출하는 로직 */
messaging.onBackgroundMessage(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/icons/app/64x64.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
