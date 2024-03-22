import { useState, useEffect } from 'react';
import Layout from '@/layout';
import { api } from '@/apis/api';
import * as h from './homeStyle';
import MainPopup from '@/components/MainPopup';
import quotesData from '@/public/json/quote.json';
import { endTimeState, startTimeState, userIdState } from '@/recoil/states';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

interface Quote {
  quote: string;
  author: string;
}

const Home = () => {
  const router = useRouter();

  const [quote, setQuote] = useState<Quote | null>(null);
  const [openRemainTime, setOpenRemainTime] = useState<Time | null>(null);
  const [isOpenTime, setIsOpenTime] = useState<Boolean>(false);
  const [worryNum, setWorryNum] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const userId = useRecoilValue(userIdState);
  const [startHour, startMin] = useRecoilValue(startTimeState)
    .split(':')
    .map(Number);
  const [endHour, endMin] = useRecoilValue(endTimeState).split(':').map(Number);

  const openTime = new Date();
  openTime.setHours(startHour, startMin, 0);
  const closeTime = new Date();
  closeTime.setHours(endHour, endMin, 0);

  const isBetween = (
    openTime: Date,
    closeTime: Date,
    currentTime: Date,
  ): boolean => {
    return currentTime >= openTime && currentTime <= closeTime;
  };
  // 현재 시간을 반환하는 함수
  const getCurrentTime = (): Date => {
    return new Date();
  };
  //3초마다 명언 랜덤 출력
  useEffect(() => {
    const setRandomQuote = () => {
      const randomIdx = Math.floor(Math.random() * quotesData.length);
      setQuote(quotesData[randomIdx]);
    };
    setRandomQuote();
    const intervalId = setInterval(setRandomQuote, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const currentTime = getCurrentTime();
    let isOpen = isBetween(openTime, closeTime, currentTime);
    const timeDiff = isOpen
      ? closeTime.getTime() - currentTime.getTime()
      : openTime.getTime() - currentTime.getTime();

    let hours = Math.floor(timeDiff / (1000 * 60 * 60));
    let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    if (hours < 0) hours += 24;
    if (minutes < 0) minutes += 60;
    if (seconds < 0) seconds += 60;

    setOpenRemainTime({ hours, minutes, seconds });
    setIsOpenTime(isOpen);
    setMessage(
      isOpen ? '보관함을 열고 걱정을 확인해 봐' : '시간이 지나 보관함이 닫혔어',
    );

    const intervalTime = setInterval(() => {
      const currentTime = getCurrentTime();
      let isOpen = isBetween(openTime, closeTime, currentTime);
      const timeDiff = isOpen
        ? closeTime.getTime() - currentTime.getTime()
        : openTime.getTime() - currentTime.getTime();

      let hours = Math.floor(timeDiff / (1000 * 60 * 60));
      let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      if (hours < 0) hours += 24;
      if (minutes < 0) minutes += 60;
      if (seconds < 0) seconds += 60;

      setOpenRemainTime({ hours, minutes, seconds });
      setIsOpenTime(isOpen);
      setMessage(
        isOpen
          ? '보관함을 열고 걱정을 확인해 봐'
          : '시간이 지나 보관함이 닫혔어',
      );
    }, 1000);

    return () => clearInterval(intervalTime);
  }, []);

  //3일지난 메시지 개수
  useEffect(() => {
    async function fetchMessageCnt() {
      try {
        const res = await api.get(`/memos/${userId}/notice`);
        setWorryNum(res.data.result.count);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMessageCnt();
  }, []);

  //보관함열기 클릭
  const handleOpenBox = () => {
    !isOpenTime && setMessage('아직 열 수 없어');
  };

  return (
    <Layout isHeader={true} type="보관함으로">
      <h.FullImg>
        <h.ReportImg src={'/reportBtn.svg'} />
      </h.FullImg>
      {isOpenTime ? (
        <h.SubTitle>{`보관함이 닫히기까지`}</h.SubTitle>
      ) : (
        <h.SubTitle>{`보관함이 열리기까지`}</h.SubTitle>
      )}
      <h.Time>{`${openRemainTime?.hours}시간 ${openRemainTime?.minutes}분 ${openRemainTime?.seconds}초`}</h.Time>
      {message && <MainPopup text={message} topSize={4} />}
      <h.MainImg src="/birdBox.svg" />
      <h.BottomMenues>
        <h.Menu
          onClick={() => router.push('/worry-write')}>{`걱정 넣기`}</h.Menu>
        <h.Menu onClick={() => handleOpenBox()}>
          {`보관함 열기`}
          {!isOpenTime && worryNum && <h.WorryCount>{worryNum}</h.WorryCount>}
        </h.Menu>
      </h.BottomMenues>
      {quote && (
        <h.LifeQuotes>
          <div>{quote.quote}</div>
          <h.Author>{quote.author}</h.Author>
        </h.LifeQuotes>
      )}
    </Layout>
  );
};

export default Home;
