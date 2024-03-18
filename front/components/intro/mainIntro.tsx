import { MainIntroTotal, SubTitle, MainTitle, MainImg } from './mainIntroStyle';

const MainIntro = () => {
  return (
    <MainIntroTotal>
      <SubTitle>{`불쑥 찾아오는 걱정이 당신을 방해하지 못하도록.`}</SubTitle>
      <MainTitle>{`걱정보관함`}</MainTitle>
      <MainImg src="/birdBox.svg" />
    </MainIntroTotal>
  );
};

export default MainIntro;
