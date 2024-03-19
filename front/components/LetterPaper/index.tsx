import Image from 'next/image';
import * as S from './styles';
import LetterArea from '../../public/assets/imgs/letterArea.png';

const LetterPaper = ({ message }: { message?: string }) => {
  return (
    <S.Container>
      <Image src={LetterArea} alt="letter" />
      <S.Input maxLength={80} value={message} disabled={!!message} />
    </S.Container>
  );
};

export default LetterPaper;
