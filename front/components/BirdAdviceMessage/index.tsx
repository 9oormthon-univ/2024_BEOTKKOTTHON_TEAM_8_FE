import { useState, useEffect } from 'react';
import * as S from './styles';

const BirdAdviceMessage = ({
  text,
  leftSize,
}: {
  text: string;
  leftSize: number;
}) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      {open && (
        <S.BubbleTotal leftSize={leftSize}>
          <S.Bubble>{text}</S.Bubble>
          <S.CloseBtn src={'./xBtn.svg'} onClick={() => setOpen(false)} />
        </S.BubbleTotal>
      )}
    </>
  );
};

export default BirdAdviceMessage;
