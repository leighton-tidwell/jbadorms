import React, { useState, useEffect } from 'react';
import Amplify, { Auth, withSSRContext } from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure({ ...config, ssr: true });
import { useRouter } from 'next/router';

import Content from '../components/UI/Content';

const SignOut = ({ authenticated }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(async () => {
    if (!authenticated) return router.push('/login');
    try {
      await Auth.signOut();
      router.reload();
    } catch (error) {
      setError(error);
    }
  }, [router, error]);

  return (
    <Content>
      {error && `An error occured: ${error}`}
      {!error && `Sit tight! We are logging you out...`}
    </Content>
  );
};

export const getServerSideProps = async context => {
  const { Auth } = withSSRContext(context);
  try {
    const user = await Auth.currentAuthenticatedUser();
    return {
      props: {
        authenticated: true
      }
    };
  } catch (error) {
    return {
      props: {
        authenticated: false
      }
    };
  }
};

export default SignOut;
