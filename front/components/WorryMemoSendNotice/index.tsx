import { useRecoilValue } from 'recoil';
import * as S from './styles';

import { useRouter } from 'next/router';
import { nameState } from '@/recoil/states';

const WorryMemoSendNotice = () => {
  const router = useRouter();
  const name = useRecoilValue(nameState);

  return (
    <S.Container>
      <S.Text>{`${name}의 걱정을 보관할게`}</S.Text>
      <img src="/assets/icons/envelope.svg" />
      <S.Button onClick={() => router.push('/home')}>돌아가기</S.Button>
    </S.Container>
  );
};

export default WorryMemoSendNotice;
