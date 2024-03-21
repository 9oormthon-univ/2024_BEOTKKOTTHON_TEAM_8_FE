import Image from 'next/image';
import DatePicker from '../DatePicker';
import * as S from './styles';

import BirdSVG from '../../public/assets/icons/bird.svg';

const LetterDateSetter = () => {
  return (
    <>
      <S.Container>
        <S.Bubble>편지가 도착할 날짜를 알려줘</S.Bubble>
        <Image src={BirdSVG} alt="bird" />
      </S.Container>
      <DatePicker />
    </>
  );
};

export default LetterDateSetter;
