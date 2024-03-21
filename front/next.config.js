const withPWA = require('next-pwa');
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  // ...원래 next config 파일
};

const nextConfig = withPWA({
  dest: 'public',
  // disable: !isProduction,
  runtimeCaching: [],
})(config);

module.exports = nextConfig;
