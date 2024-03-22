import { useEffect, useState } from 'react';
import * as S from './styles';

const MainPopup = ({ text, topSize }: { text: string; topSize: number }) => {
  const [isBubbleVisible, setIsBubbleVisible] = useState(true); // Bubble의 가시성 상태

  const handleCloseClick = () => {
    setIsBubbleVisible(false); // Close 버튼이 클릭되면 Bubble을 숨김
  };

  return (
    isBubbleVisible && ( // Bubble 가시성 상태에 따라 렌더링 여부 결정
      <S.BubbleContainer topSize={topSize}>
        <S.Bubble>{text}</S.Bubble>
        <img
          src={'/xBtn.svg'}
          style={{ cursor: 'pointer' }}
          onClick={handleCloseClick}
        />
      </S.BubbleContainer>
    )
  );
};

export default MainPopup;
