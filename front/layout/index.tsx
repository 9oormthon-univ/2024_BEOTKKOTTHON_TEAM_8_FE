import Header from './header';
import { Totalframe } from './layoutStyle';
import { Innerframe } from './layoutStyle';

const Layout = ({
  isHeader,
  children,
}: {
  isHeader: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Totalframe>
      {isHeader && <Header />}
      <Innerframe>{children}</Innerframe>
    </Totalframe>
  );
};

export default Layout;
