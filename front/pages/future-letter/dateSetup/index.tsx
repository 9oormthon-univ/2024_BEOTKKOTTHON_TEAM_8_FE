import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userSelectedDateState } from '@/recoil/states';
import LetterDateSetter from '@/components/LetterDateSetter';
import Layout from '@/layout';
import RightBtnSVG from '../../../public/assets/icons/rightBtn.svg';

const Contatiner = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 2.4rem;
`;

const BtnWraaper = styled.div`
  cursor: pointer;

  width: 100%;
  display: flex;
  justify-content: end;
  margin-right: 16rem;
`;

const DateSetUp = () => {
  const router = useRouter();

  const [message, setMessage] = useState('편지가 도착할 날짜를 알려줘');
  const userSelectedDate = useRecoilValue(userSelectedDateState);

  const todayYear = new Date().getFullYear();
  const todayMonth = new Date().getMonth() + 1;
  const todayDay = new Date().getDate();

  const goToWrite = () => {
    if (
      new Date(
        Number(userSelectedDate[0]),
        Number(userSelectedDate[1]),
        Number(userSelectedDate[2]),
      ) < new Date(todayYear, todayMonth, todayDay)
    ) {
      return setMessage('미래의 날짜로 입력해줘');
    }

    router.push('/future-letter/write');
  };

  return (
    <Layout isHeader={true}>
      <Contatiner>
        <LetterDateSetter message={message} />
        <BtnWraaper onClick={goToWrite}>
          <Image src={RightBtnSVG} alt="rightBtn" />
        </BtnWraaper>
      </Contatiner>
    </Layout>
  );
};

export default DateSetUp;
