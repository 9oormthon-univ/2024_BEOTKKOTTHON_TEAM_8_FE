import { useState } from 'react';
import { useRouter } from 'next/router';
import { TotalHeader, Menu, Line, HeaderName, Circle } from './headerStyle';

const Header = () => {
  const headerNames = [
    '보관함으로',
    '과거의 나로부터',
    '미래의 나에게',
    '지금의 우리들',
  ];
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const router = useRouter();

  const handleMenuClick = (index: number, name: string) => {
    setSelectedMenuIndex(index);
    switch (name) {
      case '보관함으로':
        router.push('/home');
        break;
      case '과거의 나로부터':
        router.push('/page2');
        break;
      case '미래의 나에게':
        router.push('/page3');
        break;
      case '지금의 우리들':
        router.push('/page4');
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
          {selectedMenuIndex === index && <Circle src="./pointCircle.svg" />}
        </Menu>
      ))}
    </TotalHeader>
  );
};

export default Header;
