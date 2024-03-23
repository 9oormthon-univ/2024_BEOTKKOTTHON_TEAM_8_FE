import { useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  currentWorryTimeState,
  passwordState,
  userIdState,
} from '@/recoil/states';
import { api } from '@/apis/api';
import * as S from './styles';
import TimePicker from '../TimePicker';

interface Props {
  name: string;
  password: string;
}

const WorryTimeSetter = (props: Props) => {
  const router = useRouter();

  const [worryTimeText, setWorryTimeText] = useState('시작할 시간');

  const setPassword = useSetRecoilState(passwordState);
  const setUserId = useSetRecoilState(userIdState);

  const [startTime, setStartTime] = useState(['1', '00', 'AM']);

  const [currentWorryTime, setCurrentWorryTime] = useRecoilState(
    currentWorryTimeState,
  );

  const onPrev = () => {
    if (worryTimeText === '시작할 시간') {
      router.push('/signup');
    } else {
      setWorryTimeText('시작할 시간');
      setCurrentWorryTime([...startTime]);
    }
  };

  const onNext = () => {
    if (worryTimeText === '마칠 시간') {
      api
        .post('/users/join', {
          name: props.name,
          password: props.password,
          startTime: `${startTime[0]}:${startTime[1]}${startTime[2]}`,
          endTime: `${currentWorryTime[0]}:${currentWorryTime[1]}${currentWorryTime[2]}`,
        })
        .then((res) => {
          if (res.data.code === 200) {
            setUserId(res.data.result.userId);
            setPassword('');
            router.push('/home');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setWorryTimeText('마칠 시간');

      setStartTime([...currentWorryTime]);

      setCurrentWorryTime(['1', '00', 'AM']);
    }
  };

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>걱정 시간을 정해줘</S.Title>
        <S.SubTitle>{worryTimeText}</S.SubTitle>
      </S.TitleContainer>

      <TimePicker key={worryTimeText} />

      <S.BtnContainer>
        <div onClick={onPrev} style={{ cursor: 'pointer' }}>
          <img src="/assets/icons/leftBtn.svg" />
        </div>
        <div onClick={onNext} style={{ cursor: 'pointer' }}>
          <img src="/assets/icons/rightBtn.svg" />
        </div>
      </S.BtnContainer>
    </S.Container>
  );
};

export default WorryTimeSetter;
