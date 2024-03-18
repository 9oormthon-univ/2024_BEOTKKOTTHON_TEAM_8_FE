import Layout from '@/layout';
import {
  SubTitle,
  Time,
  MainImg,
  BottomMenues,
  Menu,
  LifeQuotes,
} from './homeStyle';
const Home = () => {
  return (
    <Layout isHeader={true}>
      <SubTitle>{`보관함이 열리기까지`}</SubTitle>
      <Time>{`1시간 25분 20초`}</Time>
      <MainImg src="/birdBox.svg" />
      <BottomMenues>
        <Menu>{`걱정 넣기`}</Menu>
        <Menu>{`보관함 열기`}</Menu>
      </BottomMenues>
      <LifeQuotes>
        <div>{`감정은 사실이 아니다. 생각을바꾸면 감정도 바뀐다.`}</div>
        <div>{`(데이비드 D.번스)`}</div>
      </LifeQuotes>
    </Layout>
  );
};

export default Home;
