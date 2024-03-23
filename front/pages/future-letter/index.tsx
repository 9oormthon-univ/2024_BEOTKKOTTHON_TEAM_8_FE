import Layout from '@/layout';
import BirdMessenger from '@/components/common/BirdMessenger';

import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userIdState } from '@/recoil/states';
import { useEffect, useState } from 'react';

const Contatiner = styled.div`
  width: 391px;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 6rem;
`;

const BtnWraaper = styled.div`
  cursor: pointer;

  width: 100%;
  display: flex;
  justify-content: end;
  margin-right: 16rem;
`;

const FutureLetter = () => {
  const router = useRouter();
  const userId = useRecoilValue(userIdState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) setIsLoading(false);
    else setIsLoading(true);
  }, []);

  return (
    <Layout isHeader={true} type="미래의 나에게">
      <Contatiner>
        {isLoading ? (
          <img src="/assets/loading.gif" />
        ) : (
          <>
            <BirdMessenger isPast={false} />
            <BtnWraaper onClick={() => router.push('/future-letter/dateSetup')}>
              <img src="/assets/icons/rightBtn.svg" />
            </BtnWraaper>
          </>
        )}
      </Contatiner>
    </Layout>
  );
};

export default FutureLetter;
