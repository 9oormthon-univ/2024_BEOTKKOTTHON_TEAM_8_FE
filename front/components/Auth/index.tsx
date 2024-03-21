import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  nameState,
  passwordState,
  userIdState,
  endTimeState,
  startTimeState,
} from '@/recoil/states';
import { ParsedUrlQueryInput } from 'querystring';

import * as S from './styles';
import RightBtnSVG from '../../public/assets/icons/RightBtn.svg';
import RightBtnDisSVG from '../../public/assets/icons/RightBtn_dis.svg';
import Popup from '../common/Popup';

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
  const [endTime, setEndTime] = useRecoilState(endTimeState);
  const [startTime, setStartTime] = useRecoilState(startTimeState);
  const [message, setMessage] = useState<string>('');
  const setUserId = useSetRecoilState(userIdState);
  const [isNameDuplicateCheck, setIsNameDuplicateCheck] =
    useState<boolean>(false); // 별명 중복 체크 했는지
  const [isNameAvailable, setIsNameAvailable] = useState<boolean>(true); // 사용 가능한 별명인지
  const [isValid, setIsValid] = useState(false);

  const query: ParsedUrlQueryInput = {
    name: nickname,
    password: pwd,
  };

  useEffect(() => {
    setIsNameDuplicateCheck(false);
  }, [nickname]);

  useEffect(() => {
    if (isNameValid(nickname) && isPasswordValid(pwd)) setIsValid(true);
    else setIsValid(false);
  }, [nickname, pwd]);

  const isNameValid = (name: string) => {
    var regExp = new RegExp(`^[a-zA-Z0-9가-힣]{0,5}$`);

    return regExp.test(name);
  };

  const isPasswordValid = (password: string) => {
    var regExp = new RegExp(`^[0-9]{4}$`);

    return regExp.test(password);
  };

  /** 보관함 만들기 - (별명 중복 체크) 확인 버튼 */
  const handleNameDuplicateCheck = () => {
    if (!isValid) setMessage('별명과 비밀번호를 다시 확인해줘 ');

    setIsNameDuplicateCheck(true);

    if (nickname.length === 0) return setMessage('내용을 입력해줘');

    api
      .post('/users/name-check', { name: nickname })
      .then((res) => {
        if (res.data.code === 200) {
          setIsNameAvailable(true);
          setMessage('사용 가능한 별명이야');
        }
        if (res.data.code === 4001) {
          setIsNameAvailable(false);
          setMessage('이미 사용 중인 별명이야');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /** 보관함 만들기 - 걱정 시간 설정 페이지로 이동 */
  const handleGoToTimeSetup = () => {
    if (nickname.length > 0 && !isNameDuplicateCheck)
      return setMessage('별명 중복을 확인해줘');

    if (nickname.length !== 0 && pwd.length !== 0 && !isValid)
      return setMessage('별명과 비밀번호를 다시 확인해줘 ');

    if (nickname.length === 0 || pwd.length === 0)
      return setMessage('내용을 입력해줘');

    if (!isNameAvailable) return setMessage('이미 사용 중인 별명이야');

    router.push(
      {
        pathname: '/signup/timeSetup',
        query,
      },
      '/signup/timeSetup',
    );
  };

  /** 내 보관함으로 - 확인 버튼 */
  const handleLogin = () => {
    if (nickname.length > 1 && nickname.length < 6 && pwd.length === 4) {
      api
        .post('/users/login', { name: nickname, password: pwd })
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            router.push('/home');
            setEndTime(res.data.result.endTime);
            setStartTime(res.data.result.startTime);
          }
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
            <S.InputValidationText>
              최대 5자 (한글, 영문자, 숫자만 가능)
            </S.InputValidationText>
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
            <S.Button onClick={handleNameDuplicateCheck}>확인</S.Button>
          ) : undefined}
        </S.Content>
        <S.Content>
          <S.InputContainer>
            <S.InputValidationText>
              {props.isLogin ? '숫자 4자리' : '숫자 4자로 설정'}
            </S.InputValidationText>
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
            disabled={
              !isNameAvailable ||
              !isNameDuplicateCheck ||
              !isValid ||
              nickname.length === 0 ||
              pwd.length === 0
            }>
            {!isNameAvailable ||
            !isNameDuplicateCheck ||
            !isValid ||
            nickname.length === 0 ||
            pwd.length === 0 ? (
              <RightBtnDisSVG />
            ) : (
              <RightBtnSVG />
            )}
          </S.BtnWrapper>
        ) : (
          <S.Button onClick={handleLogin}>확인</S.Button>
        )}
      </S.Box>
    </S.Container>
  );
};

export default Auth;
