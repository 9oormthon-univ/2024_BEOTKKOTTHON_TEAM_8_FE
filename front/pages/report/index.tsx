import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import * as R from './styles';
import Layout from '@/layout';
import { api } from '@/apis/api';
import { userIdState } from '@/recoil/states';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

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
  layout: string;
}
const Report = () => {
  const userId = useRecoilValue(userIdState);
  const [words, setWords] = useState([]);
  const router = useRouter();
  useEffect(() => {
    async function fetchWord() {
      try {
        const res = await api.get(`/cloud/${userId}/version2`);
        if (res.data.isSuccess) {
          setWords(res.data.result);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchWord();
  }, []);
  const callbacks = {
    getWordColor: (words: Word) => (words.value > 50 ? 'back' : 'black'),
    onWordClick: console.log,
    onWordMouseOver: console.log,
  };
  const options: Option = {
    rotations: -1000,
    rotationAngles: [0, 0],
    layout: 'sacle',
  };
  return (
    <Layout isHeader={true}>
      <R.ReportTxt>{`걱정레포트`}</R.ReportTxt>
      <R.Container>
        <R.ReportTxtBox>
          <ReactWordcloud
            words={words}
            callbacks={callbacks}
            options={options}
          />
        </R.ReportTxtBox>
      </R.Container>
      <R.BottomContainer>
        <R.BirdImg src="./reportBird.svg" />
        <R.Goback onClick={() => router.push('/home')}>{`돌아가기`}</R.Goback>
      </R.BottomContainer>
    </Layout>
  );
};

export default Report;
