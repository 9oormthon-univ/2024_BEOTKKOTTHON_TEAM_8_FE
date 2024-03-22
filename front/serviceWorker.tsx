export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker 등록 성공:', registration);
      })
      .catch((error) => {
        console.log('Service Worker 등록 실패:', error);
      });
  }
};

export const requestNotificationPermission = () => {
  if ('Notification' in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('푸시 알림 권한이 허용됨');
      } else {
        console.log('푸시 알림 권한이 거부됨');
      }
    });
  }
};

export const sendPushNotification = (title: string, body: string) => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, {
        body,
        icon: '/assets/icons/app/64x64.png',
      });
    });
  }
};
