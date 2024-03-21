import Image from 'next/image';
import LetterDateSetter from '@/components/LetterDateSetter';
import Layout from '@/layout';
import RightBtnSVG from '../../../public/assets/icons/rightBtn.svg';
import { useRouter } from 'next/router';
import styled from 'styled-components';

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

  return (
    <Layout isHeader={true}>
      <Contatiner>
        <LetterDateSetter />
        <BtnWraaper onClick={() => router.push('/future-letter/write')}>
          <Image src={RightBtnSVG} alt="rightBtn" />
        </BtnWraaper>
      </Contatiner>
    </Layout>
  );
};

export default DateSetUp;
