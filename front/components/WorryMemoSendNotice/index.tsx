import { useRecoilValue } from 'recoil';
import * as S from './styles';

import { useRouter } from 'next/router';
import { nameState } from '@/recoil/states';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0.6 },
  in: { opacity: 1 },
  out: { opacity: 0.4 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 1,
};

const WorryMemoSendNotice = () => {
  const router = useRouter();
  const name = useRecoilValue(nameState);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ height: '100%' }}>
      <S.Container>
        <S.Text>{`${name}의 걱정을 보관할게`}</S.Text>
        <img src="/assets/icons/envelope.svg" />
        <S.Button onClick={() => router.push('/home')}>돌아가기</S.Button>
      </S.Container>
    </motion.div>
  );
};

export default WorryMemoSendNotice;
