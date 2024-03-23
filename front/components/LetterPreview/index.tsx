import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as S from './styles';
import LetterDateRangeText from '../common/LetterDateRangeText';

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

const LetterPreview = ({
  isSent,
  sendDate,
  arrivalDate,
  setState,
}: {
  isSent: boolean;
  sendDate: string;
  arrivalDate: string;
  setState?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const [btnText, setBtnText] = useState<string>('');
  const [todayYear, todayMonth, todayDay] = arrivalDate.split('-');

  useEffect(() => {
    isSent ? setBtnText('돌아가기') : setBtnText('열어보기');
  }, []);

  const handleAction = () => {
    if (isSent) {
      router.push('/home');
    } else {
      setState && setState(false);
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}>
      {sendDate && (
        <S.Containter>
          <LetterDateRangeText
            sendDate={sendDate}
            arrivalDate={`${todayYear}-${todayMonth}-${todayDay}`}
          />
          <div>
            <img src="/assets/icons/envelope.svg" />
          </div>
          <S.Button onClick={handleAction}>{btnText}</S.Button>
        </S.Containter>
      )}
    </motion.div>
  );
};

export default LetterPreview;
