import { FirstTxt, SecondTxt, ThirdTxt, FirstSubTxt,SecondSubTxt,ThirdSubTxt } from './textIntroStyle';

const TextIntro = () => {
  return (
    <div>
      <FirstTxt>{`걱정을 보관하기`}</FirstTxt>
      <FirstSubTxt>{`지금 떠오르는 걱정이 있으신가요?\n일단 걱정 보관함에 넣어둬요`}</FirstSubTxt>
      <SecondTxt>{`현실에 집중하기`}</SecondTxt>
      <SecondSubTxt>{`걱정은 잠시 잊고, 일상에 집중하세요`}</SecondSubTxt>
      <ThirdTxt>{`걱정과 마주하기`}</ThirdTxt>
      <ThirdSubTxt>{`걱정 시간이 되면 마음껏 걱정하세요`}</ThirdSubTxt>
    </div>
  );
};

export default TextIntro;
