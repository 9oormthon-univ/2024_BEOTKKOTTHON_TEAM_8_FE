import { useRecoilState, useRecoilValue } from 'recoil';
import { isWorryMemoSendState } from '@/recoil/states';
import WorryMemoSendNotice from '@/components/WorryMemoSendNotice';
import WorryWriter from '@/components/WorryWriter';
import Layout from '@/layout';
import { useEffect } from 'react';

const WorryWrite = () => {
  const [isSend, setIsSend] = useRecoilState(isWorryMemoSendState);

  useEffect(() => {
    setIsSend(false);
  }, []);

  return (
    <Layout isHeader={true} type={'보관함으로'}>
      {isSend ? <WorryMemoSendNotice /> : <WorryWriter />}
    </Layout>
  );
};

export default WorryWrite;
