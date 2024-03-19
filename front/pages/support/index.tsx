import { useState, useEffect } from 'react';
import * as S from './styles';
import Layout from '@/layout';
import { api } from '@/apis/api';
import { nameState } from '@/recoil/states';
import SupportMsg from '@/components/SupportMsg';

const Support = () => {
  const userId = nameState;
  const [writeMsg, setWrtieMsg] = useState('');
  const [supportMsg, setSupportMsg] = useState([]);

  const handleSupportMsg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWrtieMsg(e.target.value);
  };

  const sendMsg = () => {
    api
      .post(`/cheerings/${userId}`, { cheeringText: writeMsg })
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          window.location.reload;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    async function fetchMsg() {
      try {
        const res = await api.get('/cheerings');
        console.log(res.data);
        res.data.code === 200 && setSupportMsg(supportMsg);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMsg();
  }, []);
  return (
    <Layout isHeader={true}>
      {supportMsg?.map((message) => (
        <SupportMsg supportMent={message.cheeringText} Writer={message.name} />
      ))}
      <S.BottomInput>
        <S.Img src={'./birdImg.svg'} />
        <S.InputForm>
          <S.Input
            placeholder="응원의 한마디"
            value={writeMsg}
            onChange={(e) => handleSupportMsg(e)}
          />
        </S.InputForm>
        <S.SenBtn onClick={() => sendMsg()}>{`보내기`}</S.SenBtn>
      </S.BottomInput>
    </Layout>
  );
};

export default Support;
