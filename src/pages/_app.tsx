import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { PostProvider } from '../context/PostContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PostProvider>
      <Component {...pageProps} />
    </PostProvider>
  );
}

export default MyApp;
