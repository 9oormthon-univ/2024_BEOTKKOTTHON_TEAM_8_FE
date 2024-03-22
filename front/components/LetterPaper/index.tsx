import Image from 'next/image';
import * as S from './styles';
import LetterArea from '../../public/assets/imgs/letterArea.png';

const LetterPaper = ({
  message,
  isBlur,
}: {
  message?: string;
  isBlur: Boolean;
}) => {
  return (
    <S.Container>
      <Image src={LetterArea} alt="letter" />
      <S.Input
        maxLength={80}
        value={message}
        disabled={!!message}
        isBlur={isBlur}
      />
    </S.Container>
  );
};

export default LetterPaper;
