import { useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  currentWorryTimeState,
  nameState,
  passwordState,
  userIdState,
} from '@/recoil/states';
import { api } from '@/apis/api';
import * as S from './styles';

import LeftBtnSVG from '../../public/assets/icons/leftBtn.svg';
import RightBtnSVG from '../../public/assets/icons/RightBtn.svg';
import TimePicker from '../TimePicker';

interface Props {
  name: string;
  password: string;
}

const WorryTimeSetter = (props: Props) => {
  const router = useRouter();

  const [worryTimeText, setWorryTimeText] = useState('시작할 시간');

  const setName = useSetRecoilState(nameState);
  const setPassword = useSetRecoilState(passwordState);
  const setUserId = useSetRecoilState(userIdState);

  const [startHour, setStartHour] = useState<number>(1);
  const [startMinute, setStartMinute] = useState<string>('00');
  const [startAmPm, setStartAmPm] = useState<string>('AM');

  const [currentWorryTime, setCurrentWorryTime] = useRecoilState(
    currentWorryTimeState,
  );

  const onPrev = () => {
    setWorryTimeText('시작할 시간');
    setCurrentWorryTime([startHour.toString(), startMinute, startAmPm]);

    router.push('/signup');
  };

  const onNext = () => {
    if (worryTimeText === '마칠 시간') {
      api
        .post('/users/join', {
          name: props.name,
          password: props.password,
          startTime: `${startHour}:${startMinute}${startAmPm}`,
          endTime: `${currentWorryTime[0]}:${currentWorryTime[1]}${currentWorryTime[2]}`,
        })
        .then((res) => {
          setUserId(res.data.result.userId);
          setName('');
          setPassword('');
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setWorryTimeText('마칠 시간');

      setStartHour(Number(currentWorryTime[0]));
      setStartMinute(currentWorryTime[1]);
      setStartAmPm(currentWorryTime[2]);

      setCurrentWorryTime(['1', '00', 'AM']);
    }
  };

  return (
    <S.Container>
      <div>
        <S.TitleContainer>
          <S.Title>걱정 시간을 정해줘</S.Title>
          <S.SubTitle>{worryTimeText}</S.SubTitle>
        </S.TitleContainer>
        <S.TimePickerWrapper>
          <TimePicker />
        </S.TimePickerWrapper>
        <S.BtnContainer>
          <div onClick={onPrev} style={{ cursor: 'pointer' }}>
            <LeftBtnSVG />
          </div>
          <div onClick={onNext} style={{ cursor: 'pointer' }}>
            <RightBtnSVG />
          </div>
        </S.BtnContainer>
      </div>
    </S.Container>
  );
};

export default WorryTimeSetter;
