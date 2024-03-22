import { useEffect, useState } from 'react';
import * as W from './styles';
import { api } from '@/apis/api';
import { userIdState } from '@/recoil/states';
import { useRecoilValue } from 'recoil';
import LetterPaper from '@/components/LetterPaper';
import BirdAdviceMessage from '@/components/BirdAdviceMessage';
import SolutionBox from '@/components/SolutionBox';
import Popup from '@/components/Popup';
import Layout from '@/layout';
import router from 'next/router';

interface Item {
  worryText: string;
  solution: string;
  createAt: string;
  updateAt: string;
  memoId: number;
}

const Home = () => {
  const userId = useRecoilValue(userIdState);
  const [worryData, setWorryData] = useState<Item[]>([]); // 받아온 걱정 데이터
  const [advice, setAdvice] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // 현재 페이지 인덱스
  const [currentPageData, setCurrenPageData] = useState<Item>();
  const [isDelete, setIsDelete] = useState(false);
  const [isBlur, setIsBlur] = useState<Boolean>(false);
  const [message, setMessage] = useState('걱정을 계속 보관할게');
  const [isPopup, setIsPopup] = useState(false);
  const [makeCurrent, setMakeCurrent] = useState<string>('');
  const itemsPerPage = 1;

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((index) => index - 1);
    }
  };

  const goToNextPage = () => {
    const maxPage = worryData.length;

    if (currentPageIndex < maxPage) {
      setCurrentPageIndex((index) => index + 1);
    }
  };

  useEffect(() => {
    setAdvice(null);
    setIsBlur(false);

    /* currentPageIndex가 바뀌면 현재 보여지는 데이터도 바뀐다 */
    setCurrenPageData(worryData[currentPageIndex]);
    console.log(worryData[currentPageIndex]);
  }, [worryData, currentPageIndex]);

  useEffect(() => {
    if (currentPageData) {
      const [year, month, day] = currentPageData.createAt
        .substr(0, 10)
        .split('-');

      setMakeCurrent(`${year}년 ${month}월 ${day}일`);
    }
  }, [currentPageData]);

  useEffect(() => {
    //updateAt기준으로
    const writeDate = new Date(currentPageData?.updateAt);
    const currentDate = new Date();
    writeDate.setDate(writeDate.getDate() + 1);
    let isThreeDaysLater =
      writeDate.toDateString() >= currentDate.toDateString();
    setIsBlur(isThreeDaysLater);
    console.log('3일', isThreeDaysLater);
  }, [worryData, currentPageIndex]);

  // 걱정 데이터 불러오기
  useEffect(() => {
    async function fetchWorryMsg() {
      try {
        const res = await api.get(`/memos/${userId}`);
        if (res.data.code == 200) {
          let WorryData = res.data.result;
          setWorryData(WorryData);
          console.log(res.data.result);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchWorryMsg();
  }, [isDelete]);

  //파랑새의 조언
  const handleAdvice = (worrtTxt: string) => {
    async function fetchAdvice() {
      try {
        const res = await api.post('/memos/ai', {
          question: worrtTxt,
        });
        setAdvice(res.data.result.answer);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAdvice();
  };

  //걱정 보내주기
  const deleteWorry = async (memoId: number) => {
    try {
      const res = await api.patch(`/memos/${memoId}`);
      console.log(res);
      if (res.data.code === 200) {
        setIsDelete(true);
        setTimeout(() => {
          setCurrentPageIndex(currentPageIndex + 1);
          setIsDelete(false);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //걱정시간 늘려주기
  const handleStillWorry = async (memoId: number) => {
    try {
      const res = await api.post(`/memos/${memoId}/time-setting`, {
        memoId: memoId,
      });
      if (res.data.code === 200) {
        setIsPopup(true);
        setIsBlur(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout isHeader={true}>
      <W.Total>
        <div>
          {isPopup && (
            <Popup text={message} topSize={12} onClose={() => setMessage('')} />
          )}
          <W.WorryDate>
            {makeCurrent}의 걱정
            {isDelete && '을 보내줄게'}
          </W.WorryDate>
          {isDelete && <W.gif src={'/MailSolve_ver2.gif'} />}
          {!isDelete && (
            <>
              <LetterPaper
                message={currentPageData?.worryText}
                isBlur={isBlur}></LetterPaper>
              <SolutionBox />
              {isBlur && (
                <W.PassTime>
                  <W.BirdImg src="./birdImg.svg" />
                  <BirdAdviceMessage
                    text={'시간이 흘러 \n흐려진 걱정이 있어 \n여전히 걱정돼?'}
                    leftSize={14}
                  />
                </W.PassTime>
              )}
              {isBlur ? (
                <W.BottomBtn>
                  <W.Button
                    onClick={() =>
                      handleStillWorry(currentPageData?.memoId)
                    }>{`아직 걱정돼`}</W.Button>
                  <W.Button
                    onClick={() =>
                      deleteWorry(currentPageData?.memoId)
                    }>{`이제 괜찮아`}</W.Button>
                </W.BottomBtn>
              ) : (
                <W.BottomBtn>
                  <W.Button
                    onClick={() =>
                      handleAdvice(currentPageData.worryText)
                    }>{`파랑새의 조언`}</W.Button>
                  <W.Button
                    onClick={() =>
                      deleteWorry(currentPageData.memoId)
                    }>{`보내주기`}</W.Button>
                </W.BottomBtn>
              )}
            </>
          )}
        </div>
      </W.Total>
      {!isDelete && advice && (
        <W.BirdContainer>
          <W.BirdImg src="./birdImg.svg" />
          <BirdAdviceMessage text={advice} leftSize={13.5} />
        </W.BirdContainer>
      )}
      {isDelete && (
        <W.FullWidth>
          <W.Button onClick={() => router.push('/home')}>{`돌아가기`}</W.Button>
        </W.FullWidth>
      )}
      {!isDelete && !isBlur && (
        <W.PageBtn>
          {currentPageIndex === 0 ? (
            <W.MoveBtn src="./rightBtn.svg" onClick={() => goToNextPage()} />
          ) : currentPageIndex === worryData.length - 1 ? (
            <W.MoveBtn src="./leftBtn.svg" onClick={() => goToPreviousPage()} />
          ) : (
            <>
              <W.MoveBtn
                src="./leftBtn.svg"
                onClick={() => goToPreviousPage()}
              />
              <W.MoveBtn src="./rightBtn.svg" onClick={() => goToNextPage()} />
            </>
          )}
        </W.PageBtn>
      )}
    </Layout>
  );
};

export default Home;
