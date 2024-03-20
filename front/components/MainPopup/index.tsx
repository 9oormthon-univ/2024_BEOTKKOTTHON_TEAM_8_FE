import { useEffect, useState } from 'react';
import * as S from './styles';

const MainPopup = ({ text, topSize }: { text: string; topSize: number }) => {
  return (
    <S.BubbleContainer topSize={topSize}>
      <S.Bubble>{text}</S.Bubble>
      <S.Close src={'/xBtn.svg'} />
    </S.BubbleContainer>
  );
};

export default MainPopup;
