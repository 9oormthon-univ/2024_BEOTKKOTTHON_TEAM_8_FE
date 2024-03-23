import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TotalHeader, Menu, Line, HeaderName, Circle } from './headerStyle';

const Header = ({ type }: { type?: string }) => {
  const headerNames = ['보관함으로', '과거의 내가', '미래의 나에게'];
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [isHome, setIsHome] = useState(false);
  const [isPast, setIsPast] = useState(false);
  const [isFuture, setIsFuture] = useState(false);
  const [nowOur, setNowOur] = useState(false);
  const [selectIcon, setSelectIcon] = useState('보관함으로');
  const router = useRouter();

  useEffect(() => {
    if (type) setSelectIcon(type);
    console.log(type);
  }, [type]);

  const handleMenuClick = (index: number, name: string) => {
    setIsHome(false);
    setIsPast(false);
    setIsFuture(false);
    setNowOur(false);

    setSelectedMenuIndex(index);

    switch (name) {
      case '보관함으로':
        setSelectedMenuIndex(index);
        router.push('/home');
        break;
      case '과거의 내가':
        setSelectedMenuIndex(index);
        router.push('/past-letter');
        break;
      case '미래의 나에게':
        router.push('/future-letter');
        break;
      default:
        break;
    }
  };

  return (
    <TotalHeader>
      {headerNames.map((name, index) => (
        <Menu key={index} onClick={() => handleMenuClick(index, name)}>
          <Line />
          <HeaderName>{name}</HeaderName>
          {selectIcon == name && <Circle src="/pointCircle.svg" />}
        </Menu>
      ))}
    </TotalHeader>
  );
};

export default Header;
