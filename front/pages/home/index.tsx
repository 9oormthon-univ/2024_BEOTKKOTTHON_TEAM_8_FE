import Layout from '@/layout';
import * as h from './homeStyle';

const Home = () => {
  return (
    <Layout isHeader={true}>
      <h.SubTitle>{`보관함이 열리기까지`}</h.SubTitle>
      <h.Time>{`1시간 25분 20초`}</h.Time>
      <h.MainImg src="/birdBox.svg" />
      <h.BottomMenues>
        <h.Menu>{`걱정 넣기`}</h.Menu>
        <h.Menu>{`보관함 열기`}</h.Menu>
      </h.BottomMenues>
      <h.LifeQuotes>
        <div>{`감정은 사실이 아니다. 생각을바꾸면 감정도 바뀐다.`}</div>
        <div>{`(데이비드 D.번스)`}</div>
      </h.LifeQuotes>
    </Layout>
  );
};

export default Home;
