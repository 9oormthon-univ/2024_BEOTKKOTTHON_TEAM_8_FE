import { useState, useEffect } from 'react';
import Layout from '@/layout';
import * as h from './homeStyle';
import quotesData from '@/public/json/quote.json';
import { endTimeState, startTimeState } from '@/recoil/states';
import { useRecoilValue } from 'recoil';

interface Time {
  hourDiff: number;
  minDiff: number;
  secDiff: number;
}

const Home = () => {
  const [quote, setQuote] = useState({});
  const [openRemainTime, setOpenRemainTime] = useState<Time | null>(null);
  const [isOpenTime, setIsOpenTime] = useState<Boolean>(false);
  const startTime = useRecoilValue(startTimeState);
  const endTime = useRecoilValue(endTimeState);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * quotesData.length);
      setQuote(quotesData[randomIdx]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervaltime = setInterval(() => {
      const now = new Date();
      const nowHour = now.getHours();
      const nowMin = now.getMinutes();
      const nowSec = now.getSeconds();
      const [startHour, startMin] = startTime.split(':').map(Number);
      const [endHour, endMin] = endTime.split(':').map(Number);

      //if가 true면 보관함 닫혀있는 상태
      if (
        startHour <= nowHour &&
        startMin <= nowMin &&
        endHour >= nowHour &&
        endMin >= nowMin
      ) {
        setIsOpenTime(true);
        let hourDiff = endHour - nowHour;
        let minDiff = endMin - nowMin;
        const secDiff = 60 - nowSec;
        setOpenRemainTime({
          hourDiff,
          minDiff,
          secDiff,
        });
        if (hourDiff < 0) {
          hourDiff += 24;
        }
        if (minDiff < 0) {
          hourDiff--;
          minDiff += 60;
        }
      } else {
        setIsOpenTime(false); //열리기까지 nn분 남음
        let hourDiff = startHour - nowHour;
        let minDiff = startMin - nowMin;
        const secDiff = 60 - nowSec;
        if (hourDiff < 0) {
          hourDiff += 24;
        }
        if (minDiff < 0) {
          hourDiff--;
          minDiff += 60;
        }
        setOpenRemainTime({
          hourDiff,
          minDiff,
          secDiff,
        });
      }
    }, 1000);
    return () => clearInterval(intervaltime);
  }, []);

  return (
    <Layout isHeader={true}>
      {isOpenTime ? (
        <h.SubTitle>{`보관함이 닫히기까지`}</h.SubTitle>
      ) : (
        <h.SubTitle>{`보관함이 열리기까지`}</h.SubTitle>
      )}
      <h.Time>{`${openRemainTime?.hourDiff}시간 ${openRemainTime?.minDiff}분 ${openRemainTime?.secDiff}초`}</h.Time>
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
