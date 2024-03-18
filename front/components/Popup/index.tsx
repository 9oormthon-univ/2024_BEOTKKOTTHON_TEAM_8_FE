import { useEffect, useState } from 'react';
import * as S from './styles';

const Popup = ({
  text,
  topSize,
  onClose,
}: {
  text: string;
  topSize: number;
  onClose: () => void;
}) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);

      const closeTimer = setTimeout(() => {
        onClose();
      }, 1000);

      return () => clearTimeout(closeTimer);
    }, 1000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <S.Bubble topSize={topSize} isFadeOut={fadeOut}>
      {text}
    </S.Bubble>
  );
};

export default Popup;
