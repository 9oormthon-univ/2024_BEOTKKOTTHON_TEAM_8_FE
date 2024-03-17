import { TotalHeader, Menu, Line, HeaderName } from './headerStyle';
const Header = () => {
  const headerNames = [
    '보관함으로',
    '과거의 나로부터',
    '미래의 나에게',
    '지금의 우리들',
  ];

  return (
    <TotalHeader>
      {headerNames.map((name) => (
        <Menu>
          <Line />
          <HeaderName>{name}</HeaderName>
        </Menu>
      ))}
    </TotalHeader>
  );
};

export default Header;
