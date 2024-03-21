import Image from 'next/image';
import * as S from './styles';

const SolutionBox = ({ message }: { message?: string }) => {
  return (
    <S.Container>
      <S.SolutionAreaImg src={'./solutionBox.svg'} alt="letter" />
      <S.Input
        maxLength={30}
        value={message}
        disabled={!!message}
        placeholder="걱정의 원인, 해결책 등을 적어봐"
      />
    </S.Container>
  );
};

export default SolutionBox;
