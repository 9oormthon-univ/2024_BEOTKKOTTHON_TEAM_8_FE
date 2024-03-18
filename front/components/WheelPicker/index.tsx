import React, { useEffect, useMemo, useRef } from 'react';
import * as S from './styles';

interface HourItem {
  value: number;
  label: number;
}

interface MinutesItem {
  value: string;
  label: string;
}

interface AmpmItem {
  value: string;
  label: string;
}

interface DateItem {
  value: number;
  label: string;
}

interface WheelPickerProps {
  firstItems: DateItem[] | HourItem[];
  firstValue: number;
  onFirstChange: React.Dispatch<React.SetStateAction<number>>;

  secondItems: DateItem[] | MinutesItem[];
  secondValue: number | string;
  onSecondChange: React.Dispatch<React.SetStateAction<number | string>>;

  thirdItems: DateItem[] | AmpmItem[];
  thirdValue: number | string;
  onThirdChange: React.Dispatch<React.SetStateAction<number | string>>;

  containerHeight?: number;
  itemHeight?: number;
}

const WheelPickerComponent = ({
  firstItems,
  firstValue,
  onFirstChange: handleFirstChange,
  secondItems,
  secondValue,
  onSecondChange: handleSecondChange,
  thirdItems,
  thirdValue,
  onThirdChange: handleThirdChange,
  containerHeight = 313,
  itemHeight = 44,
}: WheelPickerProps) => {
  const firstItemsContRef = useRef<HTMLUListElement | null>(null);
  const secondItemsContRef = useRef<HTMLUListElement | null>(null);
  const thirdItemsContRef = useRef<HTMLUListElement | null>(null);

  const isScrolling = useRef<number | null>(null);

  const firstRefs: React.MutableRefObject<(HTMLLIElement | null)[]> = useRef(
    [],
  );
  const secondRefs: React.MutableRefObject<(HTMLLIElement | null)[]> = useRef(
    [],
  );
  const thirdRefs: React.MutableRefObject<(HTMLLIElement | null)[]> = useRef(
    [],
  );

  const firstItemsMap = useMemo(
    () => new Map(firstItems.map((item, index) => [item.value, index])),
    [firstItems],
  );
  const secondItemsMap = useMemo(
    () => new Map(secondItems.map((item, index) => [item.value, index])),
    [secondItems],
  );
  const thirdItemsMap = useMemo(
    () => new Map(thirdItems.map((item, index) => [item.value, index])),
    [thirdItems],
  );

  const currentFirstValue = useRef(firstItemsMap.get(firstValue) ?? 0);
  const currentSecondValue = useRef(secondItemsMap.get(secondValue) ?? 0);
  const currentThirdValue = useRef(thirdItemsMap.get(thirdValue) ?? 0);

  const visibleItemsCount = Math.floor(containerHeight / itemHeight);
  const offset = Math.round((visibleItemsCount + 1) / 2) + 1;
  const maxScrollOffset = (containerHeight - itemHeight) / 2;

  const rerenderFirstElements = (
    selectedElement: number,
    scrollTop: number,
    firstItemIndex = Math.max(selectedElement - offset, 0),
    lastItemIndex = Math.min(selectedElement + offset, 12),
  ) => {
    if (firstRefs.current) {
      firstRefs.current
        .slice(firstItemIndex, lastItemIndex)
        .forEach((item, index) => {
          const realIndex = index + firstItemIndex;
          const scrollOffset = Math.min(
            Math.abs(scrollTop - realIndex * itemHeight - itemHeight / 2),
            maxScrollOffset,
          );
          const sin = scrollOffset / maxScrollOffset;
          const cos = Math.sqrt(1 - sin ** 2);
          const div = item?.querySelector('div');
          if (div) {
            (div as HTMLDivElement).style.transform =
              `rotateX(${Math.asin(sin)}rad) scale(${cos})`;
            (div as HTMLDivElement).style.transformOrigin = 'center';
          }
        });
    }
  };

  const rerenderSecondElements = (
    selectedElement: number,
    scrollTop: number,
    firstItemIndex = Math.max(selectedElement - offset, 0),
    lastItemIndex = Math.min(selectedElement + offset, 60),
  ) => {
    if (secondRefs.current) {
      secondRefs.current
        .slice(firstItemIndex, lastItemIndex)
        .forEach((item, index) => {
          const realIndex = index + firstItemIndex;
          const scrollOffset = Math.min(
            Math.abs(scrollTop - realIndex * itemHeight - itemHeight / 2),
            maxScrollOffset,
          );
          const sin = scrollOffset / maxScrollOffset;
          const cos = Math.sqrt(1 - sin ** 2);
          const div = item?.querySelector('div');
          if (div) {
            (div as HTMLDivElement).style.transform =
              `rotateX(${Math.asin(sin)}rad) scale(${cos})`;
            (div as HTMLDivElement).style.transformOrigin = 'center';
          }
        });
    }
  };

  const rerenderThirdElements = (
    selectedElement: number,
    scrollTop: number,
    firstItemIndex = Math.max(selectedElement - offset, 0),
    lastItemIndex = Math.min(selectedElement + offset, 2),
  ) => {
    if (thirdRefs.current) {
      thirdRefs.current
        .slice(firstItemIndex, lastItemIndex)
        .forEach((item, index) => {
          const realIndex = index + firstItemIndex;
          const scrollOffset = Math.min(
            Math.abs(scrollTop - realIndex * itemHeight - itemHeight / 2),
            maxScrollOffset,
          );
          const sin = scrollOffset / maxScrollOffset;
          const cos = Math.sqrt(1 - sin ** 2);
          const div = item?.querySelector('div');
          if (div) {
            (div as HTMLDivElement).style.transform =
              `rotateX(${Math.asin(sin)}rad) scale(${cos})`;
            (div as HTMLDivElement).style.transformOrigin = 'center';
          }
        });
    }
  };

  // const handleScroll = (
  //   event: Event,
  //   items: HourItem[] | MinuteItem[] | AmpmItem[],
  //   currentValue: React.MutableRefObject<number>,
  //   rerender: (value: number, scroll: number) => void, // currentHourValue를 업데이트하는 함수
  //   handleItemChange: React.Dispatch<
  //     React.SetStateAction<number | string | 'AM' | 'PM'>
  //   >, // 항목 변경 처리 함수
  // ) => {
  //   let isAnimating = false;
  //   const target = event.target as HTMLDivElement;

  //   if (!isAnimating) {
  //     isAnimating = true;

  //     requestAnimationFrame(() => {
  //       const scrollTop = Math.max(target.scrollTop, 0);
  //       const selectedElement = Math.min(
  //         Math.max(Math.floor(scrollTop / itemHeight), 0),
  //         items.length - 1,
  //       );

  //       // currentHourValue 업데이트 로직을 setCurrentValue 사용으로 변경
  //       rerender(selectedElement, scrollTop);

  //       currentValue.current = selectedElement;
  //       isScrolling.current = setTimeout(function () {
  //         handleItemChange(items[selectedElement].value);
  //       }, 20) as unknown as number;

  //       isAnimating = false;
  //     });
  //   }
  // };

  useEffect(() => {
    let isAnimating = false;

    const handleFirstScroll = (event: Event) => {
      const target = event.target as HTMLDivElement;

      if (!isAnimating) {
        isAnimating = true;

        requestAnimationFrame(() => {
          const scrollTop = Math.max(target.scrollTop, 0);
          const selectedElement = Math.min(
            Math.max(Math.floor(scrollTop / itemHeight), 0),
            firstItems.length - 1,
          );
          if (isScrolling.current !== null) {
            window.clearTimeout(isScrolling.current);
          }
          rerenderFirstElements(selectedElement, scrollTop);

          currentFirstValue.current = selectedElement;

          isScrolling.current = setTimeout(function () {
            handleFirstChange(firstItems[selectedElement].value);
          }, 20) as unknown as number;

          isAnimating = false;
        });
      }
    };

    if (firstItemsContRef.current) {
      firstItemsContRef.current.addEventListener('scroll', handleFirstScroll);

      rerenderFirstElements(
        currentFirstValue.current,
        firstItemsContRef.current.scrollTop,
        0,
        firstItems.length,
      );
    }

    return () => {
      firstItemsContRef.current?.removeEventListener(
        'scroll',
        handleFirstScroll,
      );
    };
  }, [firstItemsContRef.current]);

  useEffect(() => {
    let isAnimating = false;

    const handleSecondScroll = (event: Event) => {
      const target = event.target as HTMLDivElement;

      if (!isAnimating) {
        isAnimating = true;

        requestAnimationFrame(() => {
          const scrollTop = Math.max(target.scrollTop, 0);
          const selectedElement = Math.min(
            Math.max(Math.floor(scrollTop / itemHeight), 0),
            secondItems.length - 1,
          );
          if (isScrolling.current !== null) {
            window.clearTimeout(isScrolling.current);
          }
          rerenderSecondElements(selectedElement, scrollTop);

          currentSecondValue.current = selectedElement;
          isScrolling.current = setTimeout(function () {
            handleSecondChange(secondItems[selectedElement].value);
          }, 20) as unknown as number;

          isAnimating = false;
        });
      }
    };

    if (secondItemsContRef.current) {
      secondItemsContRef.current?.addEventListener(
        'scroll',
        handleSecondScroll,
      );

      rerenderSecondElements(
        currentSecondValue.current,
        secondItemsContRef.current.scrollTop,
        0,
        secondItems.length,
      );
    }

    return () => {
      secondItemsContRef.current?.removeEventListener(
        'scroll',
        handleSecondScroll,
      );
    };
  }, [secondItemsContRef.current]);

  useEffect(() => {
    let isAnimating = false;

    const handleThirdScroll = (event: Event) => {
      const target = event.target as HTMLDivElement;
      if (!isAnimating) {
        isAnimating = true;

        requestAnimationFrame(() => {
          const scrollTop = Math.max(target.scrollTop, 0);
          const selectedElement = Math.min(
            Math.max(Math.floor(scrollTop / itemHeight), 0),
            thirdItems.length - 1,
          );
          if (isScrolling.current !== null) {
            window.clearTimeout(isScrolling.current);
          }
          rerenderThirdElements(selectedElement, scrollTop);

          currentThirdValue.current = selectedElement;
          isScrolling.current = setTimeout(function () {
            handleThirdChange(thirdItems[selectedElement].value);
          }, 20) as unknown as number;

          isAnimating = false;
        });
      }
    };

    thirdItemsContRef.current?.addEventListener('scroll', handleThirdScroll);

    rerenderThirdElements(
      currentThirdValue.current,
      thirdItemsContRef.current?.scrollTop ?? 0,
      0,
      thirdRefs.current.length,
    );

    return () => {
      thirdItemsContRef.current?.removeEventListener(
        'scroll',
        handleThirdScroll,
      );
    };
  }, [thirdItemsContRef.current]);

  useEffect(() => {
    const index = firstItemsMap.get(firstValue) ?? 0;
    if (index !== currentFirstValue.current) {
      currentFirstValue.current = index;
      firstRefs.current[index]?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [firstValue]);

  useEffect(() => {
    const index = secondItemsMap.get(secondValue) ?? 0;
    if (index !== currentSecondValue.current) {
      currentSecondValue.current = index;
      secondRefs.current[index]?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [secondValue]);

  useEffect(() => {
    const index = thirdItemsMap.get(thirdValue) ?? 0;
    if (index !== currentThirdValue.current) {
      currentThirdValue.current = index;
      thirdRefs.current[index]?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [thirdValue]);

  return (
    <S.Container style={{ height: `${containerHeight}px` }}>
      <S.List ref={firstItemsContRef}>
        {firstItems.map((item, index) => (
          <S.Item
            key={item.value}
            ref={(node) => (firstRefs.current[index] = node)}
            style={{
              height: `${itemHeight}px`,
              lineHeight: `${itemHeight}px`,
            }}>
            <div>{item.label}</div>
          </S.Item>
        ))}
      </S.List>
      <S.List ref={secondItemsContRef}>
        {secondItems.map((item, index) => (
          <S.Item
            key={item.value}
            ref={(node) => (secondRefs.current[index] = node)}
            style={{
              height: `${itemHeight}px`,
              lineHeight: `${itemHeight}px`,
            }}>
            <div>{item.label}</div>
          </S.Item>
        ))}
      </S.List>
      <S.List ref={thirdItemsContRef}>
        {thirdItems.map((item, index) => (
          <S.Item
            key={item.value}
            ref={(node) => (thirdRefs.current[index] = node)}
            style={{
              height: `${itemHeight}px`,
              lineHeight: `${itemHeight}px`,
            }}>
            <div>{item.label}</div>
          </S.Item>
        ))}
      </S.List>
    </S.Container>
  );
};

export const WheelPicker = React.memo(WheelPickerComponent);
