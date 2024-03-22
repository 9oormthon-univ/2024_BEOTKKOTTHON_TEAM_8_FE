import DatePicker from '../DatePicker';
import * as S from './styles';

import BirdSVG from '../../public/assets/icons/bird.svg';

const LetterDateSetter = ({
  message = '편지가 도착할 날짜를 알려줘',
}: {
  message?: string;
}) => {
  return (
    <>
      <S.Container>
        <S.Bubble>{message}</S.Bubble>
        <BirdSVG />
      </S.Container>
      <DatePicker />
    </>
  );
};

export default LetterDateSetter;
