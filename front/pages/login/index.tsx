import Auth from '@/components/Auth';
import Layout from '@/layout';

const LoginPage = () => {
  return (
    <Layout isHeader={false}>
      <Auth
        isLogin={true}
        nicknameTitle={'별명을 알려줘'}
        pwdTitle={'보관함 비밀번호를 알려줘'}
      />
    </Layout>
  );
};

export default LoginPage;
