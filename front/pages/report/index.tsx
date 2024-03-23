import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
// import * as R from './styles';
import Layout from '@/layout';
import { api } from '@/apis/api';
import { userIdState } from '@/recoil/states';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import ReportBubble from '@/components/ReportBubble';
import BirdMessenger from '@/components/common/BirdMessenger';

import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 2.8rem;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ReportTxt = styled.div`
  font-size: 3.2rem;
  font-weight: 400;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
`;

export const Date = styled.div`
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 12px;
  text-align: center;

  color: rgba(0, 0, 0, 0.5);
`;

export const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1.6rem;
`;

export const ReportTxtBox = styled.div`
  width: 100%;
  height: 12rem;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  padding: 0 4rem;
`;

export const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.6rem;
`;

export const ResultTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 0.8rem;

  font-weight: 400;
  font-size: 1.8rem;
  line-height: 20px;

  color: rgba(0, 0, 0, 0.46);
`;

export const AdviceBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.9rem;
`;

export const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 1.2rem;
`;

export const Goback = styled.div`
  cursor: pointer;

  width: 109px;
  height: 36px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.5);
  font-size: 1.6rem;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const LodingContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 'react-wordcloud' 컴포넌트를 동적으로 임포트하고, SSR을 비활성화합니다.
const ReactWordcloud = dynamic(() => import('react-wordcloud'), {
  ssr: false, // 서버 사이드 렌더링 비활성화
});

interface Word {
  text: string;
  value: number;
}

interface Option {
  rotations: number;
  rotationAngles: [number, number];
  spiral: string;
  scale: string;
  fontFamily: string;
  fontSizes: [number, number];
}

const Report = () => {
  const router = useRouter();
  const userId = useRecoilValue(userIdState);
  const [words, setWords] = useState<Word[]>([]);

  const [mostWord, setMostWord] = useState('');
  const [mostDay, setMostDay] = useState([]);
  const [aiAdvice, setAiAdvice] = useState('');

  // const todayYear = new Date().getFullYear();
  // const todayMonth = new Date().getMonth() + 1;

  const [maxValue, setMaxValue] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isNull, setIsNull] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    /** 레포트 api */
    api
      .get(`/cloud/${userId}/version2`)
      .then((res) => {
        if (res.data.isSuccess) {
          setWords(res.data.result.wordsList);

          const maxVal = Math.max(
            ...res.data.result.wordsList.map((word: Word) => word.value),
          );
          setMaxValue(maxVal);

          setMostWord(res.data.result.wordsList[0].text);
          setMostDay(res.data.result.maxEntry.substr(6).split('-'));
          setAiAdvice(res.data.result.answer);

          setIsLoading(false);
        } else {
          setIsNull(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const getWordColor = (word: Word) => {
    const valueRatio = word.value / maxValue;

    if (valueRatio > 0.7) {
      return 'rgba(134, 157, 170, 1)';
    } else if (valueRatio > 0.5) {
      return 'rgba(94, 115, 129, 1)';
    } else {
      return 'rgba(20, 33, 54, 1)';
    }
  };

  const callbacks = {
    getWordColor: getWordColor,
    onWordClick: console.log,
    onWordMouseOver: console.log,
  };

  return (
    <Layout isHeader={true}>
      {isNull ? (
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BirdMessenger message="지금은 걱정이 없어" />
        </div>
      ) : isLoading ? (
        <LodingContainer>
          <img src="/assets/loading.gif" alt="Loading" />;
        </LodingContainer>
      ) : (
        <Container>
          <Title>
            <ReportTxt>{`걱정레포트`}</ReportTxt>
            {/* <Date>{`${todayYear}년 ${todayMonth}월`}</Date> */}
          </Title>
          <Box>
            <ReportTxtBox>
              <ReactWordcloud
                words={words}
                callbacks={callbacks}
                options={{
                  rotations: -1000,
                  rotationAngles: [0, 0],
                  spiral: 'archimedean', // 단어들이 중앙에서 바깥으로 나선형으로 퍼지도록
                  scale: 'sqrt', // 큰 단어는 조금 더 크게, 작은 단어는 더 작게
                  fontFamily: 'chosunNM',
                  fontSizes: [10, 40], // 단어의 최소 크기와 최대 크기
                }}
              />
            </ReportTxtBox>
            <ResultBox>
              <ResultTextBox>
                <div>{`가장 많이 한 걱정 : ${mostWord}`}</div>
                <div>{`걱정이 많았던 날 : ${mostDay[0]}월 ${mostDay[1]}일`}</div>
              </ResultTextBox>
              <AdviceBox>
                <img src="./reportBird.svg" />
                <ReportBubble message={aiAdvice} />
              </AdviceBox>
            </ResultBox>
          </Box>
          <BottomContainer>
            <Goback onClick={() => router.push('/home')}>{`돌아가기`}</Goback>
          </BottomContainer>
        </Container>
      )}
    </Layout>
  );
};

export default Report;
