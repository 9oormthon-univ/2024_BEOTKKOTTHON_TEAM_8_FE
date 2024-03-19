import * as S from './styles';
import { useRouter } from 'next/router';

const SupportMsg = ({
  supportMent,
  Writer,
}: {
  supportMent: string;
  Writer: string;
}) => {
  const router = useRouter();

  return (
    <S.Container>
      <S.SupportMent>{supportMent}</S.SupportMent>
      <S.Writer>{Writer}</S.Writer>
    </S.Container>
  );
};

export default SupportMsg;
