import { useEffect, useState } from 'react';
import * as S from './styles';

const MainPopup = ({ text }: { text: string }) => {
  return <S.Bubble>{text}</S.Bubble>;
};

export default MainPopup;
