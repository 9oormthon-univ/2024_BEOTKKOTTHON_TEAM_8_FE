import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';

import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>
    </RecoilRoot>
  );
}
