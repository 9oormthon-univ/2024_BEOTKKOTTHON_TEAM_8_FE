import { useState, useEffect } from 'react';
import Layout from '@/layout';
import MainIntro from '@/components/intro/mainIntro';
import TextIntro from '@/components/intro/textIntro';
import LoginOption from '@/components/LoginOptions';

const Intro = () => {
  const [showMainIntro, setShoMainIntro] = useState(true);
  const [showLoginOption, setShowLoginOption] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShoMainIntro(false);
    }, 2000);

    return () => clearTimeout(timer);
  });
  return (
    <Layout isHeader={false}>
      {showMainIntro ? (
        <MainIntro />
      ) : (
        <TextIntro onAnimationFinish={() => setShowLoginOption(true)} />
      )}
      {showLoginOption && <LoginOption />}
    </Layout>
  );
};

export default Intro;
