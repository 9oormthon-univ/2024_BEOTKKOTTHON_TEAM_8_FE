import { useState, useEffect } from 'react';
import Layout from '@/layout';
import * as h from './homeStyle';
import quotesData from '@/public/json/quote.json';
import { endTimeState, startTimeState } from '@/recoil/states';
import { useRecoilValue } from 'recoil';

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
  const [quote, setQuote] = useState<Quote | null>(null);
  const [openRemainTime, setOpenRemainTime] = useState<Time | null>(null);
  const [isOpenTime, setIsOpenTime] = useState<Boolean>(false);
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * quotesData.length);
      setQuote(quotesData[randomIdx]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervaltime = setInterval(() => {
      const currentTime = getCurrentTime();
      if (isBetween(openTime, closeTime, currentTime)) {
        //닫히기까지 nn분
        setIsOpenTime(true);
        let timeDiff = closeTime.getTime() - currentTime.getTime();
        let hours = Math.floor(timeDiff / (1000 * 60 * 60));
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        if (hours < 0) hours += 24;
        if (minutes < 0) minutes += 60;
        if (seconds < 0) seconds += 60;
        setOpenRemainTime({ hours, minutes, seconds });
      } else {
        //열리기까지 nn분
        setIsOpenTime(false);
        let timeDiff = openTime.getTime() - currentTime.getTime();
        let hours = Math.floor(timeDiff / (1000 * 60 * 60));
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        if (hours < 0) hours += 24;
        if (minutes < 0) minutes += 60;
        if (seconds < 0) seconds += 60;
        setOpenRemainTime({ hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(intervaltime);
  }, []);

  return (
    <Layout isHeader={true}>
      <h.FullImg>
        <h.ReportImg src={'/reportBtn.svg'} />
      </h.FullImg>
      {isOpenTime ? (
        <h.SubTitle>{`보관함이 닫히기까지`}</h.SubTitle>
      ) : (
        <h.SubTitle>{`보관함이 열리기까지`}</h.SubTitle>
      )}
      <h.Time>{`${openRemainTime?.hours}시간 ${openRemainTime?.minutes}분 ${openRemainTime?.seconds}초`}</h.Time>
      <h.MainImg src="/birdBox.svg" />
      <h.BottomMenues>
        <h.Menu>{`걱정 넣기`}</h.Menu>
        <h.Menu>{`보관함 열기`}</h.Menu>
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
