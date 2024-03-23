import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Layout from '@/layout';
import { userIdState, userSelectedDateState } from '@/recoil/states';
import { api } from '@/apis/api';
import LetterDateRange from '@/components/common/LetterDateRangeText';
import LetterPaper from '@/components/common/Paper';
import Popup from '@/components/common/Popup';
import LetterPreview from '@/components/LetterPreview';

const Contatiner = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  width: 100%;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 2.8rem;
`;

const BtnWraaper = styled.div`
  display: flex;
  gap: 1.3rem;

  position: absolute;
  right: 22%;
  bottom: -22%;

  transition:
    opacity 3s ease-out,
    visibility 3s ease-out;
`;

const Write = () => {
  const router = useRouter();
  const userId = useRecoilValue(userIdState);
  const userSelectedDate = useRecoilValue(userSelectedDateState);

  const todayYear = new Date().getFullYear();
  const todayMonth = new Date().getMonth() + 1;
  const todayDay = new Date().getDate();

  const [input, setInput] = useState('');

  const today = `${todayYear}-${todayMonth}-${todayDay}`;
  const arrivalDate = `${userSelectedDate[0]}-${userSelectedDate[1]}-${userSelectedDate[2]}`;

  const [message, setMessage] = useState('');

  const [isSend, setIsSend] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  /** GIF 끝나기까지의 추정시간 */
  setTimeout(() => {
    setIsAnimationFinished(true);
  }, 10000);

  const handleSend = () => {
    if (input.length === 0) return setMessage('내용을 입력해줘');

    if (input.length > 0) {
      api
        .post(`/letters/${userId}`, {
          arrivalDate: arrivalDate,
          letter: input,
        })
        .then((res) => {
          console.log(res);
          setIsSend(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Layout isHeader={true} type="보관함으로">
      <Contatiner>
        {isSend ? (
          isAnimationFinished ? (
            <LetterPreview
              isSent={true}
              sendDate={today}
              arrivalDate={arrivalDate}
            />
          ) : (
            <img src="/assets/mailToMe.gif" />
          )
        ) : (
          <Box>
            {message && <Popup text={message} onClose={() => setMessage('')} />}
            <LetterDateRange sendDate={today} arrivalDate={arrivalDate} />
            <LetterPaper input={input} setInput={setInput} />

            <BtnWraaper>
              <div
                onClick={() => router.push('/future-letter/dateSetup')}
                style={{ cursor: 'pointer' }}>
                <img src="/assets/icons/leftBtn.svg" />
              </div>
              <div onClick={handleSend} style={{ cursor: 'pointer' }}>
                <img src="/assets/icons/rightBtn.svg" />
              </div>
            </BtnWraaper>
          </Box>
        )}
      </Contatiner>
    </Layout>
  );
};

export default Write;
