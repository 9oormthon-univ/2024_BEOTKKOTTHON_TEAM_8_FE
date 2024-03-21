import { useState } from 'react';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Layout from '@/layout';
import { userIdState, userSelectedDateState } from '@/recoil/states';

import LeftBtnSVG from '../../../public/assets/icons/leftBtn.svg';
import RightBtnSVG from '../../../public/assets/icons/rightBtn.svg';

import LetterDateRange from '@/components/common/LetterDateRangeText';
import LetterPaper from '@/components/common/Paper';
import { api } from '@/apis/api';
import Popup from '@/components/common/Popup';

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
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 1.3rem;
  margin-right: 16rem;
`;

const Write = () => {
  const router = useRouter();
  const userId = useRecoilValue(userIdState);

  const todayYear = new Date().getFullYear();
  const todayMonth = new Date().getMonth() + 1;
  const todayDay = new Date().getDate();

  const [input, setInput] = useState('');

  const today = `${todayYear}-${todayMonth}-${todayDay}`;

  const userSelectedDate = useRecoilValue(userSelectedDateState);

  const arrivalDate = `${userSelectedDate[0]}-${userSelectedDate[1]}-${userSelectedDate[2]}`;

  const [message, setMessage] = useState('');

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
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Layout isHeader={true}>
      <Contatiner>
        <Box>
          {message && <Popup text={message} onClose={() => setMessage('')} />}
          <LetterDateRange sendDate={today} arrivalDate={arrivalDate} />
          <LetterPaper input={input} setInput={setInput} />
          <BtnWraaper>
            <div
              onClick={() => router.push('/future-letter/dateSetup')}
              style={{ cursor: 'pointer' }}>
              <Image src={LeftBtnSVG} alt="leftBtn" />
            </div>
            <div onClick={handleSend} style={{ cursor: 'pointer' }}>
              <Image src={RightBtnSVG} alt="rightBtn" />
            </div>
          </BtnWraaper>
        </Box>
      </Contatiner>
    </Layout>
  );
};

export default Write;
