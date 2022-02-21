import React, { useState, useEffect } from 'react';
import Amplify, { Auth, withSSRContext } from 'aws-amplify';
import { useRouter } from 'next/router';
import { Content, Subtitle } from '../components/UI/';
import classes from './signout.module.css';
import config from '../aws-exports';
Amplify.configure({ ...config, ssr: true });

const SignOut = () => {
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    Auth.signOut()
      .then(() => {
        router.push('/login');
      })
      .catch(error => {
        setError(error);
      });
  }, [router, error]);

  return (
    <>
      <Subtitle>Logout of JBA MHO</Subtitle>
      <Content className={classes.flex}>
        {error && `An error occured: ${error}`}
        {!error && `Sit tight! We are logging you out...`}
      </Content>
    </>
  );
};

export default SignOut;
