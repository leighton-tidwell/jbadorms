import { AuthUserProvider } from '../context/AuthUserProvider';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}

export default MyApp;
