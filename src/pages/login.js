import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Amplify from 'aws-amplify';
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp
} from '@aws-amplify/ui-react';
import { Content, Subtitle, Icon, Spinner } from '../components/UI/';
import classes from './login.module.css';
import config from '../aws-exports';
Amplify.configure({ ...config, ssr: true });

const Login = ({ previousPage }) => {
  const [authState, setAuthState] = useState('');
  const router = useRouter();
  const handleAuthStateChange = state => setAuthState(state);
  const previousPageValid =
    previousPage &&
    previousPage.indexOf('/login') === -1 &&
    previousPage.indexOf('/signout') === -1;

  useEffect(() => {
    if (authState === 'signedin' && previousPageValid)
      router.push(previousPage);
    else if (authState === 'signedin') router.push('/dorms/');
  }, [authState, previousPage, previousPageValid, router]);

  return (
    <>
      <Subtitle>Login to JBA MHO</Subtitle>
      <Content className={classes.flex}>
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
        {authState !== 'signedin' && previousPageValid && (
          <Link href={previousPage}>
            <a className={classes.inline}>
              <Icon size="24" name="arrowBackSharp" />
              Click to go back
            </a>
          </Link>
        )}
        {authState === 'signedin' && (
          <div className={classes.redirect}>
            <Spinner size="50" />
            <Link href={previousPageValid ? previousPage : '/'}>
              <a className={classes.inline} style={{ marginTop: '1em' }}>
                Sit tight! We are logging you in... or click here to continue.
              </a>
            </Link>
          </div>
        )}
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
