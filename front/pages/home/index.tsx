import { useState, useEffect } from 'react';
import Layout from '@/layout';
import * as h from './homeStyle';
import quotesData from '@/public/json/quote.json';

const Home = () => {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * quotesData.length);
      setQuote(quotesData[randomIdx]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <Layout isHeader={true}>
      <h.SubTitle>{`보관함이 열리기까지`}</h.SubTitle>
      <h.Time>{`1시간 25분 20초`}</h.Time>
      <h.MainImg src="/birdBox.svg" />
      <h.BottomMenues>
        <h.Menu>{`걱정 넣기`}</h.Menu>
        <h.Menu>{`보관함 열기`}</h.Menu>
      </h.BottomMenues>
      {quote && (
        <h.LifeQuotes>
          <div>{quote.quote}</div>
          <h.Author>{quote.author}</h.Author>
        </h.LifeQuotes>
      )}
    </Layout>
  );
};

export default Home;
