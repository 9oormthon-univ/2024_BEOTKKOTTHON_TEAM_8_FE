import { useEffect, useState } from 'react';
import * as W from './styles';
import { api } from '@/apis/api';
import { userIdState } from '@/recoil/states';
import { useRecoilValue } from 'recoil';
import LetterPaper from '@/components/LetterPaper';
import BirdAdviceMessage from '@/components/BirdAdviceMessage';
import SolutionBox from '@/components/SolutionBox';
import Layout from '@/layout';
import router from 'next/router';

interface Item {
  createAt: string;
  worryText: string;
  memoId: number;
}

const Home = () => {
  const userId = useRecoilValue(userIdState);
  const [worryData, setWorryData] = useState<Item[]>([]);
  const [advice, setAdvice] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
  const itemsPerPage = 1;

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    const maxPage = Math.ceil(worryData.length / itemsPerPage) - 1;
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = worryData.slice(startIndex, endIndex);
  useEffect(() => {
    setAdvice(null);
  }, [currentPage]);

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

  const calcDate = (date: string) => {
    const writeDate = new Date(date);
    const year = writeDate.getFullYear();
    const month = writeDate.getMonth() + 1;
    const day = writeDate.getDate() - 1;
    return `${year}년 ${month}월 ${day}일`;
  };
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
          setCurrentPage(currentPage + 1);
          setIsDelete(false);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout isHeader={true}>
      <W.Total>
        {currentPageData.map((item, index) => (
          <div key={index}>
            <W.WorryDate>
              {calcDate(item.createAt)}의 걱정
              {isDelete && '을 보내줄게'}
            </W.WorryDate>
            {isDelete && <W.gif src={'/MailSolve_ver2.gif'} />}
            {!isDelete && (
              <>
                <LetterPaper message={item.worryText}></LetterPaper>
                <SolutionBox />
                <W.BottomBtn>
                  <W.Button
                    onClick={() =>
                      handleAdvice(item.worryText)
                    }>{`파랑새의 조언`}</W.Button>
                  <W.Button
                    onClick={() =>
                      deleteWorry(item.memoId)
                    }>{`보내주기`}</W.Button>
                </W.BottomBtn>
              </>
            )}
          </div>
        ))}
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
      {!isDelete && (
        <W.PageBtn>
          {currentPage === 0 ? (
            <W.MoveBtn src="./rightBtn.svg" onClick={() => goToNextPage()} />
          ) : currentPage === worryData.length - 1 ? (
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
