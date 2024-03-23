import { motion } from 'framer-motion';
import Header from './header';
import { Totalframe } from './layoutStyle';
import { Innerframe } from './layoutStyle';

const pageVariants = {
  initial: { opacity: 0.6 },
  in: { opacity: 1 },
  out: { opacity: 0.4 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 1,
};

const Layout = ({
  isHeader,
  children,
  type,
}: {
  isHeader: boolean;
  children?: React.ReactNode;
  type?: string;
}) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}>
      <Totalframe>
        {isHeader && <Header type={type} />}
        <Innerframe>{children}</Innerframe>
      </Totalframe>
    </motion.div>
  );
};

export default Layout;
