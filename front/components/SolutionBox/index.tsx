import Image from 'next/image';
import * as S from './styles';

const SolutionBox = ({
  input,
  setInput,
  message,
}: {
  input?: string;
  setInput?: React.Dispatch<React.SetStateAction<string>>;
  message?: string;
}) => {
  return (
    <S.Container>
      <S.SolutionAreaImg src={'./solutionBox.svg'} alt="paper" />
      <S.Input
        // value={input ? input : { message }}
        value={input}
        maxLength={20}
        disabled={!!message}
        placeholder="걱정의 원인, 해결책 등을 적어봐"
        onChange={(e) => {
          setInput && setInput(e.target.value);
        }}
      />
    </S.Container>
  );
};

export default SolutionBox;
