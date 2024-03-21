import { useEffect, useState } from 'react';

import WheelPicker from './WheelPicker';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { userSelectedDateState } from '@/recoil/states';

export const Container = styled.div`
  width: 31.3rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 2rem;
`;

export const Bar = styled.div`
  position: absolute;
  top: 36%;

  width: 100%;
  height: 4.1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2rem;

  background: rgba(0, 0, 0, 0.1);
  border-radius: 0.8rem;
  pointer-events: none;

  div:nth-child(1) {
    position: absolute;
    left: 34%;
    bottom: 20%;
  }

  div:nth-child(2) {
    position: absolute;
    left: 57%;
    bottom: 20%;
  }

  div:nth-child(3) {
    position: absolute;
    left: 85%;
    bottom: 20%;
  }
`;

const generateYearItems = (
  startYear = new Date().getFullYear(),
  endYear = new Date().getFullYear() + 5,
) => {
  const years = [];

  for (let year = startYear; year <= endYear; year++)
    years.push(year.toString());

  return years;
};

const generateMonthItems = () =>
  Array.from({ length: 12 }, (_, index) =>
    (index + 1).toString().padStart(2, '0'),
  );

// 선택된 년도와 월에 기반하여 일 데이터를 생성하는 함수
const generateDayItems = (year: string, month: string) => {
  const daysInMonth = new Date(Number(year), Number(month), 0).getDate();

  return Array.from({ length: daysInMonth }, (_, index) =>
    (index + 1).toString().padStart(2, '0'),
  );
};

const DatePicker = () => {
  const today = new Date();
  const currentYear = today.getFullYear().toString();
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
  const currentDay = today.getDate().toString().padStart(2, '0');

  const [year, setYear] = useState<string>(currentYear);
  const [month, setMonth] = useState<string>(currentMonth);
  const [day, setDay] = useState<string>(currentDay);

  const [dayItems, setDayItems] = useState(generateDayItems(year, month));

  const yearItems = generateYearItems();
  const monthItems = generateMonthItems();

  const setUserSelectedDate = useSetRecoilState(userSelectedDateState);

  useEffect(() => {
    setUserSelectedDate([year, month, day]);
  }, [year, month, day]);

  useEffect(() => {
    setDayItems(generateDayItems(year, month));
  }, [year, month]);

  return (
    <Container>
      <Bar>
        <div>년</div>
        <div>월</div>
        <div>일</div>
      </Bar>
      <WheelPicker
        list={yearItems}
        onSelectedChange={setYear}
        initValue={(yearItems.indexOf(year) + 1).toString()}
      />
      <WheelPicker
        list={monthItems}
        onSelectedChange={setMonth}
        initValue={month}
      />
      <WheelPicker list={dayItems} onSelectedChange={setDay} initValue={day} />
    </Container>
  );
};

export default DatePicker;
