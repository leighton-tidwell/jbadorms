import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Amplify from 'aws-amplify';
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp
} from '@aws-amplify/ui-react';
import config from '../aws-exports';
Amplify.configure({ ...config, ssr: true });

import Content from '../components/UI/Content';
import Subtitle from '../components/UI/Subtitle';

import classes from './login.module.css';

const Login = ({ previousPage }) => {
  const [authState, setAuthState] = useState('');
  const router = useRouter();
  const handleAuthStateChange = state => {
    setAuthState(state);
    // Add user to datastore
    console.log(previousPage);
    console.log(authState);
    if (authState === 'signedin' && previousPage)
      return router.push(previousPage);

    console.log('trying to push to dorms');
    if (authState === 'signedin') return router.push('/dorms/');
  };

  return (
    <>
      <Subtitle>Login to JBA MHO</Subtitle>
      <Content className={`${classes.flex}`}>
        <AmplifyAuthenticator handleAuthStateChange={handleAuthStateChange}>
          <AmplifySignUp
            slot="sign-up"
            usernameAlias="email"
            formFields={[
              {
                type: 'name',
                label: 'Full Name',
                placeholder: 'John Doe',
                inputProps: { required: true, autocomplete: 'username' }
              },
              { type: 'email', inputProps: { required: true } },
              {
                type: 'phone_number',
                label: 'Phone',
                placeholder: '123-123-1234',
                inputProps: { required: true }
              },
              { type: 'password', inputProps: { required: true } }
            ]}
          />
          <AmplifySignIn slot="sign-in" usernameAlias="email" />
        </AmplifyAuthenticator>
        {authState !== 'signedin' && previousPage && (
          <Link href={previousPage}>Click to go back</Link>
        )}
        {authState === 'signedin' && 'Sit tight! We are logging you in...'}
      </Content>
    </>
  );
};

export const getServerSideProps = async context => {
  if (context.req.headers.referer)
    return {
      props: {
        previousPage: context.req.headers.referer
      }
    };
  return {
    props: {
      previousPage: null
    }
  };
};

export default Login;
