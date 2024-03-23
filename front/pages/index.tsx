import { useState, useEffect } from 'react';
import Layout from '@/layout';
import MainIntro from '@/components/intro/mainIntro';
import TextIntro from '@/components/intro/textIntro';
import LoginOption from '@/components/LoginOptions';
import { useRecoilValue } from 'recoil';
import { nameState } from '@/recoil/states';
import { useRouter } from 'next/router';

const Intro = () => {
  const [showMainIntro, setShowMainIntro] = useState(true);
  const [showLoginOption, setShowLoginOption] = useState(false);
  const name = useRecoilValue(nameState);
  const router = useRouter();

  useEffect(() => {
    if (name) {
      router.push('/home');
    }
  }, [name]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMainIntro(false);
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
      {showLoginOption && !name && <LoginOption />}
    </Layout>
  );
};

export default Intro;
