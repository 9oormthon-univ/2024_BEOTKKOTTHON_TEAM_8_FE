import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentWorryTimeState } from '@/recoil/states';

import { WheelPicker } from './WheelPicker/index';

const hourItems = Array.from({ length: 12 }, (_, index) => ({
  value: index + 1,
  label: index + 1,
}));

const minuteItems = Array.from({ length: 60 }, (_, index) => ({
  value: `${index.toString().padStart(2, '0')}`,
  label: `${index.toString().padStart(2, '0')}`,
}));

const ampmItems = [
  { value: 'AM', label: 'AM' },
  { value: 'PM', label: 'PM' },
];

const TimePicker = () => {
  const [hourValue, setHour] = useState<number>(1);
  const [minuteValue, setMinute] = useState<string | number>('00');
  const [ampmValue, setAmpm] = useState<string | number>('AM');

  const [currentWorryTime, setCurerntWorryTime] = useRecoilState(
    currentWorryTimeState,
  );

  useEffect(() => {
    setCurerntWorryTime([
      hourValue.toString(),
      minuteValue.toString(),
      ampmValue.toString(),
    ]);
  }, [hourValue, minuteValue, ampmValue]);

  return (
    <div>
      <WheelPicker
        firstItems={hourItems}
        firstValue={Number(currentWorryTime[0])}
        onFirstChange={setHour}
        secondItems={minuteItems}
        secondValue={currentWorryTime[1]}
        onSecondChange={setMinute}
        thirdItems={ampmItems}
        thirdValue={currentWorryTime[2]}
        onThirdChange={setAmpm}
      />
    </div>
  );
};

export default TimePicker;
