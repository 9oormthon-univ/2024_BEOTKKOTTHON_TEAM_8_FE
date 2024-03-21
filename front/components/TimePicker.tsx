import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentWorryTimeState } from '@/recoil/states';
import WheelPicker from './WheelPicker';
import styled from 'styled-components';

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
`;

const hourItems = Array.from({ length: 12 }, (_, index) =>
  (index + 1).toString(),
);

const minuteItems = Array.from(
  { length: 60 },
  (_, index) => `${index.toString().padStart(2, '0')}`,
);

const ampmItems = ['AM', 'PM'];

const TimePicker = () => {
  const [currentWorryTime, setCurerntWorryTime] = useRecoilState(
    currentWorryTimeState,
  );

  const [hourValue, setHour] = useState<string>(currentWorryTime[0]);
  const [minuteValue, setMinute] = useState<string>(currentWorryTime[1]);
  const [ampmValue, setAmpm] = useState<string>(currentWorryTime[2]);

  useEffect(() => {
    setCurerntWorryTime([hourValue, minuteValue, ampmValue]);
  }, [hourValue, minuteValue, ampmValue]);

  useEffect(() => {
    setHour(currentWorryTime[0]);
    setMinute(currentWorryTime[1]);
    setAmpm(currentWorryTime[2]);
  }, [currentWorryTime]);

  return (
    <Container>
      <Bar />
      <WheelPicker
        list={hourItems}
        onSelectedChange={setHour}
        initValue={hourValue}
      />
      <WheelPicker
        list={minuteItems}
        onSelectedChange={setMinute}
        initValue={(minuteItems.indexOf(minuteValue) + 1).toString()}
      />
      <WheelPicker
        list={ampmItems}
        onSelectedChange={setAmpm}
        initValue={ampmValue === 'AM' ? '1' : '2'}
      />
    </Container>
  );
};

export default TimePicker;
