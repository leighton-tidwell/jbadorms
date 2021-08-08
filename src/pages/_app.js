import Head from 'next/head';
import { AuthUserProvider } from '../context/AuthUserProvider';
import '../styles/global.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>JBA MHO</title>
        <meta property="og:title" content="JBA MHO" />
        <meta property="og:site_name" content="JBA MHO" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="The official website of Joint Base Andrews Military Housing Office."
        />
      </Head>
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
    </>
  );
};

export default MyApp;
