import { useRef, useEffect, useState } from 'react';
import * as S from './styles';

interface ScrollPickerProps {
  list: string[];
  onSelectedChange?: React.Dispatch<React.SetStateAction<string>>;
  initValue?: string;
}

const WheelPicker = ({
  list,
  onSelectedChange,
  initValue,
}: ScrollPickerProps) => {
  const SCROLL_DEBOUNCE_TIME = 200;

  const newList = ['', ...list, ''];
  const ref = useRef<HTMLUListElement>(null);
  const [selected, setSelected] = useState(initValue || list[0]);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const ITEM_HEIGHT = 50;

  const handleScroll = () => {
    if (ref.current) {
      clearTimeout(timerRef.current!);
      if (ref.current.scrollTop < ITEM_HEIGHT) {
        ref.current.scrollTop = ITEM_HEIGHT;
      }
      timerRef.current = setTimeout(() => {
        const index = Math.floor(
          (ref.current!.scrollTop + ITEM_HEIGHT / 2) / ITEM_HEIGHT,
        );
        if (list[index] !== '') {
          setSelected(index.toString());
          itemRefs.current[index]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
          onSelectedChange && onSelectedChange(newList[index]);
        }
      }, SCROLL_DEBOUNCE_TIME);
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = Number(selected) * ITEM_HEIGHT;
    }
  }, []);

  return (
    <S.List ref={ref} onScroll={handleScroll}>
      <S.ListCenter />
      {newList.map((item, index) => (
        <S.ListItem
          key={index}
          isSelected={Number(index) === Number(selected)}
          ref={(el) => (itemRefs.current[index] = el)}>
          {item}
        </S.ListItem>
      ))}
    </S.List>
  );
};

export default WheelPicker;
