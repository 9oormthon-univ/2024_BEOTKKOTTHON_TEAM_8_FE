import { useState } from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';

import * as S from './styles';
import RightBtnSVG from '../../public/assets/icons/RightBtn.svg';
import Popup from '../Popup';

import { api } from '@/apis/api';

interface Props {
  isLogin: boolean;
  nicknameTitle: string;
  pwdTitle: string;
}

const Auth = (props: Props) => {
  const router = useRouter();

  const [nickname, setNickname] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const query: ParsedUrlQueryInput = {
    name: nickname,
    password: pwd,
  };

  /** 보관함 만들기 - (별명 중복 체크) 확인 버튼 */
  const handleCheck = () => {
    if (nickname.length > 0) {
      api
        .post('/users/name-check', { name: nickname })
        .then((res) => {
          console.log(res);

          if (res.data.code === 200) setMessage('사용 가능한 별명이야');
          if (res.data.code === 4001) setMessage('이미 사용 중인 별명이야');
        })
        .catch((err) => {
          console.error(err);
        });
    } else setMessage('내용을 입력해줘');
  };

  /** 보관함 만들기 - 걱정 시간 입력 */
  const handleTimeSetting = () => {
    if (nickname.length > 0 && pwd.length === 4) {
      router.push(
        {
          pathname: '/signup/timeSetup',
          query,
        },
        '/signup/timeSetup',
      );
    } else {
      if (nickname.length > 0 && pwd.length == 0)
        setMessage('비밀번호를 입력해줘');
      else if (pwd.length > 0 && pwd.length < 4)
        setMessage('비밀번호 4자리를 입력해줘');
      else setMessage('내용을 입력해줘');
    }
  };

  /** 내 보관함으로 - 확인 버튼 */
  const handleLogin = () => {
    if (nickname.length > 1 && nickname.length < 6 && pwd.length === 4) {
      api
        .post('/users/login', { name: nickname, password: pwd })
        .then((res) => {
          console.log(res);

          if (res.data.code >= 4000) {
            setMessage('별명과 비밀번호를 다시 확인해줘');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else setMessage('내용을 입력해줘');
  };

  return (
    <S.Container>
      {message && (
        <Popup text={message} topSize={12} onClose={() => setMessage('')} />
      )}
      <S.Box>
        <S.Content>
          <S.InputContainer>
            <S.Title>{props.nicknameTitle}</S.Title>
            <S.Input
              id="nickname"
              value={nickname}
              type="text"
              placeholder="입력하기"
              minLength={2}
              maxLength={5}
              onChange={(e) => setNickname(e.target.value)}
            />
          </S.InputContainer>
          {!props.isLogin ? (
            <S.Button onClick={handleCheck}>확인</S.Button>
          ) : undefined}
        </S.Content>
        <S.Content>
          <S.InputContainer>
            <S.Title>{props.pwdTitle}</S.Title>
            <S.Input
              id="pwd"
              value={pwd}
              type="password"
              placeholder="입력하기"
              minLength={4}
              maxLength={4}
              onChange={(e) => setPwd(e.target.value)}
            />
          </S.InputContainer>
        </S.Content>
        {!props.isLogin ? (
          <S.BtnWrapper onClick={handleTimeSetting}>
            <RightBtnSVG />
          </S.BtnWrapper>
        ) : (
          <S.Button onClick={handleLogin}>확인</S.Button>
        )}
      </S.Box>
    </S.Container>
  );
};

export default Auth;
