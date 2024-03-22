import Header from './header';
import { Totalframe } from './layoutStyle';
import { Innerframe } from './layoutStyle';

const Layout = ({
  isHeader,
  children,
  type,
}: {
  isHeader: boolean;
  children: React.ReactNode;
  type: string;
}) => {
  return (
    <Totalframe>
      {isHeader && <Header type={type} />}
      <Innerframe>{children}</Innerframe>
    </Totalframe>
  );
};

export default Layout;
