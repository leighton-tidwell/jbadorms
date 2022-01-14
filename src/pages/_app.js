import Head from 'next/head';
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
Amplify.configure({ ...awsExports, ssr: true });
import '../styles/global.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>JBA MHO</title>
        <meta
          name="description"
          content="The official website of Joint Base Andrews Military Housing Office."
        />
        <meta property="og:title" content="JBA MHO" />
        <meta property="og:site_name" content="JBA MHO" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="The official website of Joint Base Andrews Military Housing Office."
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
