import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserProvider';
import Link from 'next/link';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Content from '../components/UI/Content';
import Subtitle from '../components/UI/Subtitle';
import ErrorText from '../components/UI/ErrorText';

import classes from './login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const emailChangeHandler = event => {
    setEmail(event.target.value);
    setError(null);
  };

  const passwordChangeHandler = event => {
    setPassword(event.target.value);
    setError(null);
  };

  const formSubmitHandler = () => {
    signInWithEmailAndPassword(email, password)
      .then(authUser => {
        router.push('/dorms');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <>
      <Subtitle>Login to JBA MHO</Subtitle>
      <Content className={`${classes.flex}`}>
        <div className={classes['form-control']}>
          <label className={classes.label}>Email:</label>
          <Input
            value={email}
            onChange={emailChangeHandler}
            className={classes.input}
            type="text"
            placeholder="Email"
          />
        </div>
        <div className={classes['form-control']}>
          <label className={classes.label}>Password:</label>
          <Input
            value={password}
            onChange={passwordChangeHandler}
            className={classes.input}
            type="password"
            placeholder="Password"
          />
        </div>
        {error && <ErrorText>{error}</ErrorText>}
        <Button onClick={formSubmitHandler}>Login</Button>
        <span className={classes.signup}>
          Or{' '}
          <Link href="/signup">
            <a className={classes.href}>sign up</a>
          </Link>{' '}
          for an account.
        </span>
      </Content>
    </>
  );
};

export default Login;
