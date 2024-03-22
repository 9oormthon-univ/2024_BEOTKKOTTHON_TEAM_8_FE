import * as S from './styles';
import Image from 'next/image';

import EnvelopeSVG from '../../public/assets/icons/envelope.svg';
import { useRouter } from 'next/router';

const WorryMemoSendNotice = () => {
  const router = useRouter();

  return (
    <S.Container>
      <S.Text>예진의 걱정을 보관할게</S.Text>
      <Image src={EnvelopeSVG} alt="btn" />
      <S.Button onClick={() => router.push('/home')}>돌아가기</S.Button>
    </S.Container>
  );
};

export default WorryMemoSendNotice;
