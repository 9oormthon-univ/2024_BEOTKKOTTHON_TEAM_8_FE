import Image from 'next/image';
import * as S from './styles';
import PaperImg from '../../../public/assets/imgs/paper.png';

const Paper = ({
  input,
  setInput,
  message,
  isHidden,
  isBlur,
}: {
  input?: string;
  setInput?: React.Dispatch<React.SetStateAction<string>>;
  message?: string;
  isHidden?: boolean;
  isBlur?: boolean;
}) => {
  return (
    <S.Container isHidden={isHidden}>
      <Image src={PaperImg} alt="paper" />
      <S.Input
        value={input ? input : message}
        maxLength={80}
        disabled={!!message}
        isBlur={isBlur}
        onChange={(e) => {
          setInput && setInput(e.target.value);
        }}
      />
    </S.Container>
  );
};

export default Paper;
