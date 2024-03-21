import { useRouter } from 'next/router';

import WorryTimeSetter from '@/components/WorryTimeSetter';
import Layout from '@/layout';

const TimeSetup = () => {
  const { query } = useRouter();
  const name = query.name as string;
  const password = query.password as string;

  return (
    <Layout isHeader={false}>
      <WorryTimeSetter name={name} password={password} />
    </Layout>
  );
};

export default TimeSetup;
