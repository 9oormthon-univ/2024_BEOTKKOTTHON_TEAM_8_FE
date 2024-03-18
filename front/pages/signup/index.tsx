import Layout from '@/layout';
import Auth from '@/components/Auth';

const SignupPage = () => {
  return (
    <Layout isHeader={false}>
      <Auth
        isLogin={false}
        nicknameTitle={'너만의 별명을 정해줘'}
        pwdTitle={'보관함 비밀번호를 정해줘'}
      />
    </Layout>
  );
};

export default SignupPage;
