import { useEffect, useState } from 'react';
import * as W from './styles';
import { api } from '@/apis/api';
import { userIdState } from '@/recoil/states';
import { useRecoilValue } from 'recoil';
import LetterPaper from '@/components/LetterPaper';
import BirdAdviceMessage from '@/components/BirdAdviceMessage';
import SolutionBox from '@/components/SolutionBox';
import Layout from '@/layout';

interface Item {
  createAt: string;
  worryText: string;
}

const Home = () => {
  const userId = useRecoilValue(userIdState);
  const [worryData, setWorryData] = useState<Item[]>([]);
  const [advice, setAdvice] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
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
  }, []);

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
  return (
    <Layout isHeader={true}>
      <W.Total>
        {currentPageData.map((item, index) => (
          <div key={index}>
            <W.WorryDate>{calcDate(item.createAt)}의 걱정</W.WorryDate>
            <LetterPaper message={item.worryText}></LetterPaper>

            <SolutionBox />
            <W.BottomBtn>
              <W.Button
                onClick={() =>
                  handleAdvice(item.worryText)
                }>{`파랑새의 조언`}</W.Button>
              <W.Button>{`보내주기`}</W.Button>
            </W.BottomBtn>
          </div>
        ))}
      </W.Total>
      {advice && (
        <W.BirdContainer>
          <W.BirdImg src="./birdImg.svg" />
          <BirdAdviceMessage text={advice} leftSize={13.5} />
        </W.BirdContainer>
      )}
      <W.PageBtn>
        {currentPage === 0 ? (
          <W.MoveBtn src="./rightBtn.svg" onClick={() => goToNextPage()} />
        ) : currentPage === worryData.length - 1 ? (
          <W.MoveBtn src="./leftBtn.svg" onClick={() => goToPreviousPage()} />
        ) : (
          <>
            <W.MoveBtn src="./leftBtn.svg" onClick={() => goToPreviousPage()} />
            <W.MoveBtn src="./rightBtn.svg" onClick={() => goToNextPage()} />
          </>
        )}
      </W.PageBtn>
    </Layout>
  );
};

export default Home;
