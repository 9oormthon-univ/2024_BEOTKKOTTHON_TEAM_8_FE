import { useState, useEffect } from 'react';
import Layout from '@/layout';
import MainIntro from '@/components/intro/mainIntro';
import TextIntro from '@/components/intro/textIntro';

const Intro = () => {
  const [showMainIntro, setShoMainIntro] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShoMainIntro(false);
    }, 2000);

    return () => clearTimeout(timer);
  });
  return (
    <Layout isHeader={false}>
      {showMainIntro ? <MainIntro /> : <TextIntro/>}
    </Layout>
  );
};

export default Intro;
