import { useEffect, useState } from 'react';
import * as S from './styles';

import LeftBtnSVG from '../../../public/assets/icons/leftBtn.svg';
import RightBtnSVG from '../../../public/assets/icons/rightBtn.svg';
import LetterDateRangeText from '../../common/LetterDateRangeText';
import LetterPaper from '../../common/Paper';

interface LetterProps {
  letterId: number;
  letter: string;
  arrivalDate: string;
  sendDate: string;
  userId: number;
}

const PastLetters = ({ letters }: { letters: LetterProps[] }) => {
  const [letter, setLetter] = useState<LetterProps>();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setLetter(letters[index]);
  }, [index]);

  return (
    <S.Containter>
      {letter && (
        <S.Box>
          <LetterDateRangeText
            sendDate={letter.sendDate}
            arrivalDate={letter.arrivalDate}
          />
          <LetterPaper message={letter.letter}></LetterPaper>
          <S.ButtonWrapper>
            {index >= 1 && (
              <S.LeftBtnWrapper>
                <LeftBtnSVG onClick={() => setIndex(index - 1)} />
              </S.LeftBtnWrapper>
            )}
            {index < letters.length - 1 && (
              <S.RightBtnWrapper>
                <RightBtnSVG onClick={() => setIndex(index + 1)} />
              </S.RightBtnWrapper>
            )}
          </S.ButtonWrapper>
        </S.Box>
      )}
    </S.Containter>
  );
};

export default PastLetters;
