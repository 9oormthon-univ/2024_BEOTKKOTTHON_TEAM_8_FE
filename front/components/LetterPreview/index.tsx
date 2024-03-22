import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as S from './styles';
import LetterDateRangeText from '../common/LetterDateRangeText';
import LetterSVG from '../../public/assets/icons/envelope.svg';

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
    <>
      <S.Containter>
        <LetterDateRangeText
          sendDate={sendDate}
          arrivalDate={`${todayYear}-${todayMonth}-${todayDay}`}
        />
        <div>
          <LetterSVG />
        </div>
        <S.Button onClick={handleAction}>{btnText}</S.Button>
      </S.Containter>
    </>
  );
};

export default LetterPreview;
