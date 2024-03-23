import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { isTodayLetterNoticeViewState, userIdState } from '@/recoil/states';
import Layout from '@/layout';
import { api } from '@/apis/api';
import TodayNewLetterNotice from '@/components/Past-letter/TodayNewLetterNotice';
import BirdMessenger from '@/components/common/BirdMessenger';
import PastLetters from '@/components/Past-letter/PastLetters';

interface LetterProps {
  letterId: number;
  letter: string;
  arrivalDate: string;
  sendDate: string;
  userId: number;
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PastLetter = () => {
  const userId = useRecoilValue(userIdState);

  const [letters, setLetters] = useState<LetterProps[]>([]);
  const [hasLetter, setHasLetter] = useState(false); // 그동안 쌓여있는 편지가 있는지
  const [isTodayLetterNoticeView, setIsTodayLetterNoticeView] = useRecoilState(
    isTodayLetterNoticeViewState,
  ); // 오늘 도착한 편지가 있는지

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      api.get(`/letters/${userId}`),
      api.get(`/letters/${userId}/existence`),
    ])
      .then(([lettersResponse, existenceResponse]) => {
        if (lettersResponse.data.code === 200) {
          setLetters(lettersResponse.data.result);
          setHasLetter(lettersResponse.data.result.length > 0);
          setIsLoading(false);
        }

        if (existenceResponse.data.code === 200) {
          setIsTodayLetterNoticeView(existenceResponse.data.result.isArrived);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(true);
      });
  }, [userId, setIsTodayLetterNoticeView]);

  return (
    <Layout isHeader={true} type={'과거의 내가'}>
      <Container>
        {isLoading ? (
          <div>
            <img src="../../assets/loading.gif" style={{ height: '100%' }} />
          </div>
        ) : (
          <>
            {isTodayLetterNoticeView ? (
              <TodayNewLetterNotice />
            ) : hasLetter ? (
              <PastLetters letters={letters} />
            ) : (
              <BirdMessenger isPast={true} />
            )}
          </>
        )}
      </Container>
    </Layout>
  );
};

export default PastLetter;
