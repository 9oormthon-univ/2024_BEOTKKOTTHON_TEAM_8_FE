import { useEffect } from 'react';
import {
  registerServiceWorker,
  requestNotificationPermission,
  sendPushNotification,
} from './serviceWorker';

const Test = () => {
  // 푸시 알림 테스트
  const clickPushHandler = () => {
    sendPushNotification('매직포스 알림', '알림 가나요?');
  };

  useEffect(() => {
    registerServiceWorker();
    requestNotificationPermission();
    // 직접 푸시 알림 테스트
    sendPushNotification('테스트 알림', '테스트 알림입니다.');
  }, []);

  return (
    <button onClick={clickPushHandler} style={{ color: 'red' }}>
      알림 보내기
    </button>
  );
};

export default Test;
