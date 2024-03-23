import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import * as R from './styles';
import Layout from '@/layout';
import { api } from '@/apis/api';
import { userIdState } from '@/recoil/states';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import ReportBubble from '@/components/ReportBubble';

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
  rotationAngles: number[];
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

  const todayYear = new Date().getFullYear();
  const todayMonth = new Date().getMonth() + 1;

  const [maxValue, setMaxValue] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    /** 레포트 api */
    api
      .get(`/cloud/${userId}/version2`)
      .then((res) => {
        console.log(res.data);
        if (res.data.isSuccess) {
          setWords(res.data.result.wordsList);

          const maxVal = Math.max(
            ...res.data.result.wordsList.map((word) => word.value),
          );
          setMaxValue(maxVal);

          setMostWord(res.data.result.wordsList[0].text);
          setMostDay(res.data.result.maxEntry.substr(6).split('-'));
          setAiAdvice(res.data.result.answer);

          setIsLoading(false);
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

  const options: Option = {
    rotations: -1000,
    rotationAngles: [0, 0],
    spiral: 'archimedean', // 단어들이 중앙에서 바깥으로 나선형으로 퍼지도록
    scale: 'sqrt', // 큰 단어는 조금 더 크게, 작은 단어는 더 작게
    fontFamily: 'chosunNM',
    fontSizes: [10, 40], // 단어의 최소 크기와 최대 크기
  };

  return (
    <Layout isHeader={true}>
      {isLoading ? (
        <R.LodingContainer>
          <img src="/assets/loading.gif" alt="Loading" />;
        </R.LodingContainer>
      ) : (
        <R.Container>
          <R.Title>
            <R.ReportTxt>{`걱정레포트`}</R.ReportTxt>
            <R.Date>{`${todayYear}년 ${todayMonth}월`}</R.Date>
          </R.Title>
          <R.Box>
            <R.ReportTxtBox>
              <ReactWordcloud
                words={words}
                callbacks={callbacks}
                options={options}
              />
            </R.ReportTxtBox>
            <R.ResultBox>
              <R.ResultTextBox>
                <div>{`가장 많이 한 걱정 : ${mostWord}`}</div>
                <div>{`걱정이 많았던 날 : ${mostDay[0]}월 ${mostDay[1]}일`}</div>
              </R.ResultTextBox>
              <R.AdviceBox>
                <img src="./reportBird.svg" />
                <ReportBubble message={aiAdvice} />
              </R.AdviceBox>
            </R.ResultBox>
          </R.Box>
          <R.BottomContainer>
            <R.Goback
              onClick={() => router.push('/home')}>{`돌아가기`}</R.Goback>
          </R.BottomContainer>
        </R.Container>
      )}
    </Layout>
  );
};

export default Report;
