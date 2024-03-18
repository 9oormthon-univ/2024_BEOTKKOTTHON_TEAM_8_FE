import {
  First,
  Second,
  Third,
  FirstTxt,
  SecondTxt,
  ThirdTxt,
  FirstSubTxt,
  SecondSubTxt,
  ThirdSubTxt,
} from './textIntroStyle';
import { useEffect } from 'react';

interface TextIntroProps {
  onAnimationFinish: () => void;
}

const TextIntro: React.FC<TextIntroProps> = ({ onAnimationFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationFinish();
    }, 9500);

    return () => clearTimeout(timer);
  }, [onAnimationFinish]);
  return (
    <div>
      <First>
        <FirstTxt>{`걱정을 보관하기`}</FirstTxt>
        <FirstSubTxt>{`지금 떠오르는 걱정이 있으신가요?\n일단 걱정 보관함에 넣어둬요`}</FirstSubTxt>
      </First>
      <Second>
        <SecondTxt>{`현실에 집중하기`}</SecondTxt>
        <SecondSubTxt>{`걱정은 잠시 잊고, 일상에 집중하세요`}</SecondSubTxt>
      </Second>
      <Third>
        <ThirdTxt>{`걱정과 마주하기`}</ThirdTxt>
        <ThirdSubTxt>{`걱정 시간이 되면 마음껏 걱정하세요`}</ThirdSubTxt>
      </Third>
    </div>
  );
};

export default TextIntro;
