import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isWorryMemoSendState, userIdState } from '@/recoil/states';
import * as S from './styles';
import LetterPaper from '../common/Paper';
import Popup from '../common/Popup';
import { api } from '@/apis/api';

const WorryWriter = () => {
  const router = useRouter();
  const userId = useRecoilValue(userIdState);

  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const setIsSend = useSetRecoilState(isWorryMemoSendState);

  const handleSend = () => {
    if (input.length === 0) return setMessage('내용을 입력해줘');

    api
      .post(`/memos/${userId}`, { worryText: input })
      .then((res) => {
        console.log(res);

        if (res.data.code === 200) setIsSend(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <S.Container>
      <S.Box>
        {message && (
          <Popup text={'내용을 입력해줘'} onClose={() => setMessage('')} />
        )}
        <S.Text>지금 무슨 걱정해?</S.Text>
        <LetterPaper input={input} setInput={setInput} />
        <S.ButtonContainer>
          <S.Button onClick={() => router.push('/home')}>돌아가기</S.Button>
          <S.Button onClick={handleSend}>보관하기</S.Button>
        </S.ButtonContainer>
      </S.Box>
    </S.Container>
  );
};

export default WorryWriter;
