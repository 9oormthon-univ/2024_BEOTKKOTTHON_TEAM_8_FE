import { useState, useEffect } from 'react';
import Layout from '@/layout';
import { api } from '@/apis/api';
// import * as h from './homeStyle';
import { useRouter } from 'next/router';
import MainPopup from '@/components/MainPopup';
import quotesData from '@/public/json/quote.json';
import { endTimeState, startTimeState, userIdState } from '@/recoil/states';
import { useRecoilValue } from 'recoil';
import Test from '@/Test';

import styled from 'styled-components';
const breakpoints = [480, 768, 992, 1280];
const media = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export const FullImg = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
export const ReportImg = styled.img`
  margin-right: 1.2rem;
  margin-bottom: 1.5rem;
  @media (max-height: 736px) {
    margin-bottom: 0;
  }
`;
export const SubTitle = styled.div`
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.5);
  /* margin-top: 6rem; */
  margin-bottom: 1rem;
  text-align: center;
`;
export const Time = styled.div`
  font-size: 3rem;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
`;
export const ImgTotal = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const MainImg = styled.img`
  position: absolute;
  width: 100%;
  bottom: -5rem;
  @media (max-height: 736px) {
    position: fixed;
    bottom: -11rem;
  }
  ${media[1]} {
    width: 391px;
    position: fixed;
    bottom: -8rem;
  }
`;
export const TotalBottom = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  bottom: 10rem;
  @media (max-height: 736px) {
    bottom: 6.17vh;
  }
  ${media[1]} {
    bottom: 7.17vh;
  }
`;

export const BottomMenues = styled.div`
  gap: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5.6rem;
  ${media[1]} {
    margin-bottom: 3.6rem;
  }
  @media (max-height: 736px) {
    margin-bottom: 1.6rem;
  }
`;
export const Menu = styled.div`
  cursor: pointer;
  position: relative;
  width: 10.9rem;
  height: 3.7rem;
  font-size: 1.6rem;
  background-color: #d9d9d9;
  border-radius: 10px;
  color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const WorryCount = styled.div`
  position: absolute;
  padding: 0.4rem;
  border-radius: 50%;
  background: #869daa;
  font-size: 1.8rem;
  font-weight: 400;
  text-align: center;
  color: #fff;
  right: -0.8rem;
  top: -1.4rem;
`;
export const LifeQuotes = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.2rem;
  width: 100%;
  @media (max-height: 736px) {
    bottom: 3rem;
  }
`;
export const Author = styled.div`
  margin-top: 10px;
`;
export const BubbleContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  top: 6rem;
  @media (max-height: 736px) {
    top: 2rem;
  }
`;

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
  const [closePopup, setClosePopup] = useState(false);
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
    if (isOpenTime) {
      router.push('/worry-letters');
    } else {
      setMessage('아직 열 수 없어');
      setClosePopup(false);
    }
  };

  return (
    <Layout isHeader={true} type="보관함으로">
      <FullImg>
        <ReportImg
          src={'/reportBtn.svg'}
          onClick={() => router.push('/report')}
        />
      </FullImg>
      {isOpenTime ? (
        <SubTitle>{`보관함이 닫히기까지`}</SubTitle>
      ) : (
        <SubTitle>{`보관함이 열리기까지`}</SubTitle>
      )}
      <Time>{`${openRemainTime?.hours}시간 ${openRemainTime?.minutes}분 ${openRemainTime?.seconds}초`}</Time>
      {message && !closePopup && (
        <BubbleContainer>
          <MainPopup text={message} />
          <img
            src={'/xBtn.svg'}
            style={{ cursor: 'pointer' }}
            onClick={() => setClosePopup(true)}
          />
        </BubbleContainer>
      )}
      <ImgTotal>
        <MainImg src="/birdBox.svg" />
      </ImgTotal>
      <TotalBottom>
        <BottomMenues>
          <Menu onClick={() => router.push('/worry-write')}>{`걱정 넣기`}</Menu>
          <Menu onClick={() => handleOpenBox()}>
            {`보관함 열기`}
            {!isOpenTime && <WorryCount>{worryNum}</WorryCount>}
          </Menu>
        </BottomMenues>
        {quote && (
          <LifeQuotes>
            <div>{quote.quote}</div>
            <Author>{quote.author}</Author>
          </LifeQuotes>
        )}
      </TotalBottom>

      <Test />
    </Layout>
  );
};

export default Home;
