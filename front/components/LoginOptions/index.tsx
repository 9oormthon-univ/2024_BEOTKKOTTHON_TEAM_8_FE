import * as S from './styles';
import { useRouter } from 'next/router';

const LoginOptions = () => {
  const router = useRouter();

  return (
    <S.Container>
      <S.OptionWrapper onClick={() => router.push('/signup')}>
        보관함 만들기
      </S.OptionWrapper>
      <S.OptionWrapper onClick={() => router.push('/login')}>
        내 보관함으로
      </S.OptionWrapper>
    </S.Container>
  );
};

export default LoginOptions;
