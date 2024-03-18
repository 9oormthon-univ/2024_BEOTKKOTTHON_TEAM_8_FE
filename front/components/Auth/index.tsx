import { useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { nameState, passwordState, userIdState } from '@/recoil/states';
import { ParsedUrlQueryInput } from 'querystring';

import * as S from './styles';
import RightBtnSVG from '../../public/assets/icons/RightBtn.svg';
import RightBtnDisSVG from '../../public/assets/icons/RightBtn_dis.svg';
import Popup from '../Popup';

import { api } from '@/apis/api';

interface Props {
  isLogin: boolean;
  nicknameTitle: string;
  pwdTitle: string;
}

const Auth = (props: Props) => {
  const router = useRouter();

  const [nickname, setNickname] = useRecoilState(nameState);
  const [pwd, setPwd] = useRecoilState(passwordState);
  const [message, setMessage] = useState<string>('');
  const setUserId = useSetRecoilState(userIdState);
  const [isCheck, setIsCheck] = useState<boolean>(false); // 별명 중복 체크 했는지
  const [isAvailable, setIsAvailable] = useState<boolean>(true); // 사용 가능한 별명인지

  const query: ParsedUrlQueryInput = {
    name: nickname,
    password: pwd,
  };

  /** 보관함 만들기 - (별명 중복 체크) 확인 버튼 */
  const handleCheck = () => {
    setIsCheck(true);

    if (nickname.length > 0) {
      api
        .post('/users/name-check', { name: nickname })
        .then((res) => {
          console.log(res);

          if (res.data.code === 200) {
            setIsAvailable(true);
            setMessage('사용 가능한 별명이야');
          }
          if (res.data.code === 4001) {
            setIsAvailable(false);
            setMessage('이미 사용 중인 별명이야');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else setMessage('내용을 입력해줘');
  };

  /** 보관함 만들기 - 걱정 시간 설정 페이지로 이동 */
  const handleGoToTimeSetup = () => {
    if (!isCheck) return setMessage('별명 중복을 확인해줘');

    if (!isAvailable) return;

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

          setUserId(res.data.result.userId);
        })
        .catch((err) => {
          console.error(err);
        });
    } else setMessage('내용을 입력해줘');
  };

  return (
    <S.Container>
      <S.Box>
        {message && (
          <Popup text={message} topSize={-6} onClose={() => setMessage('')} />
        )}
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
          <S.BtnWrapper
            onClick={handleGoToTimeSetup}
            disabled={!isAvailable || !isCheck}>
            {!isAvailable || !isCheck ? <RightBtnDisSVG /> : <RightBtnSVG />}
          </S.BtnWrapper>
        ) : (
          <S.Button onClick={handleLogin}>확인</S.Button>
        )}
      </S.Box>
    </S.Container>
  );
};

export default Auth;
