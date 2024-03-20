import { nameState } from '@/recoil/states';
import { useRecoilValue } from 'recoil';

import * as S from './styles';

const LetterDateRange = ({
  sendDate,
  arrivalDate,
}: {
  sendDate: string;
  arrivalDate: string;
}) => {
  const name = useRecoilValue(nameState);

  const [sendYear, sendMonth, sendDay] = sendDate.split('-');
  const [arrivalYear, arrivalMonth, arrivalDay] = arrivalDate.split('-');

  return (
    <S.Container>
      <div>
        <S.HighlightText>
          {`${sendYear}년 ${sendMonth}월 ${sendDay}일`}
        </S.HighlightText>
        {`의 ${name}(이/가),`}
      </div>
      <div>
        <S.HighlightText>{`${arrivalYear}년 ${arrivalMonth}월 ${arrivalDay}일`}</S.HighlightText>
        {`의 ${name}에게`}
      </div>
    </S.Container>
  );
};

export default LetterDateRange;
