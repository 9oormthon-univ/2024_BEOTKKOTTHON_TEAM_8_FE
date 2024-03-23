// import { useEffect } from 'react';
// import {
//   registerServiceWorker,
//   requestNotificationPermission,
//   sendPushNotification,
// } from './serviceWorker';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// import { initializeApp } from 'firebase/app';
// import { useRecoilValue } from 'recoil';
// import { userIdState } from './recoil/states';
// import { api } from './apis/api';

// const Test = () => {
//   const userId = useRecoilValue(userIdState);

//   // 브라우저에 알림 권한을 요청합니다.
//   const onMessageFCM = async () => {
//     const permission = await Notification.requestPermission();
//     if (permission !== 'granted') return;

//     const firebaseApp = initializeApp({
//       apiKey: 'AIzaSyA3QAiGn1ViwVjx79yw0wETEARhV4_Ni_0',
//       projectId: 'worrybox-ded5a',
//       messagingSenderId: '766004840414',
//       appId: '1:766004840414:web:7e1692f6b28e6a9e5abf4f',
//     });

//     const messaging = getMessaging(firebaseApp);

//     getToken(messaging, {
//       vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
//     })
//       .then((currentToken) => {
//         if (currentToken) {
//           console.log(currentToken);

//           api
//             .post(`/notices/${userId}/token`, {
//               token: currentToken,
//             })
//             .then((res) => {
//               console.log(res);
//             })
//             .catch((err) => {});
//         } else {
//           console.log(
//             'No registration token available. Request permission to generate one.',
//           );
//         }
//       })
//       .catch((err) => {
//         console.log('An error occurred while retrieving token. ', err);
//       });

//     onMessage(messaging, (payload) => {
//       console.log('Message received. ', payload);
//     });
//   };

//   useEffect(() => {
//     onMessageFCM();
//   }, []);

//   // // 푸시 알림 테스트
//   // const clickPushHandler = () => {
//   //   sendPushNotification('알림 보내기', '알림 가나요?');
//   // };

//   useEffect(() => {
//     registerServiceWorker();
//     requestNotificationPermission();

//     sendPushNotification('테스트 알림', '테스트 알림입니다.');
//   }, []);

//   return <></>;
// };

// export default Test;
