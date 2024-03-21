import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isTodayLetterNoticeViewState, userIdState } from '@/recoil/states';
import * as S from './styles';
import LetterDateRange from '../../common/LetterDateRangeText';
import { api } from '@/apis/api';

import LetterSVG from '../../../public/assets/icons/envelope.svg';

const TodayNewLetterNotice = () => {
  const userId = useRecoilValue(userIdState);

  const todayYear = new Date().getFullYear();
  const todayMonth = new Date().getMonth() + 1;
  const todayDay = new Date().getDate();

  const [sendDate, setSendDate] = useState<string>('');

  const setIsTodayLetterNoticeView = useSetRecoilState(
    isTodayLetterNoticeViewState,
  );

  useEffect(() => {
    api
      .get(`/letters/${userId}`)
      .then((res) => {
        setSendDate(res.data.result[0].sendDate);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <S.Containter>
      <LetterDateRange
        sendDate={sendDate}
        arrivalDate={`${todayYear}-${todayMonth}-${todayDay}`}
      />
      <div>
        <LetterSVG />
      </div>
      <S.Button onClick={() => setIsTodayLetterNoticeView(false)}>
        열어보기
      </S.Button>
    </S.Containter>
  );
};

export default TodayNewLetterNotice;
