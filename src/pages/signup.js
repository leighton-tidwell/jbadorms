import React, { useState } from 'react';
import router from 'next/router';
import Link from 'next/link';
import { useAuth } from '../context/AuthUserProvider';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Content from '../components/UI/Content';
import Subtitle from '../components/UI/Subtitle';
import ErrorText from '../components/UI/ErrorText';
import Form from '../components/UI/Form';
import Label from '../components/UI/Label';

import classes from './signup.module.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState(null);

  const { createUserWithEmailAndPassword } = useAuth();
  // const { authUser, loading } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!loading && !authUser) router.push('/');
  // }, [authUser, loading]);

  const emailChangeHandler = event => {
    setEmail(event.target.value);
    setError(null);
  };

  const passwordChangeHandler = event => {
    setPassword(event.target.value);
    setError(null);
  };

  const passwordTwoChangeHandler = event => {
    setPasswordTwo(event.target.value);
    setError(null);
  };

  const formSubmitHandler = () => {
    console.log('clicked');
    if (!email) return setError('You must enter an email!');
    if (password !== passwordTwo) return setError('Your passwords must match!');
    createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log('Success. The user has been created in Firebase.');
        router.push('/dorms');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <>
      <Subtitle>Sign Up To JBA MHO</Subtitle>
      <Content className={`${classes.flex}`}>
        <Form onSubmit={formSubmitHandler}>
          <div className={classes['form-control']}>
            <Label>Email:</Label>
            <Input
              value={email}
              onChange={emailChangeHandler}
              className={classes.input}
              type="text"
              placeholder="Email"
            />
          </div>
          <div className={classes['form-control']}>
            <Label>Password:</Label>
            <Input
              type="password"
              onChange={passwordChangeHandler}
              className={classes.input}
              value={password}
              placeholder="Password"
            />
          </div>
          <div className={classes['form-control']}>
            <Label>Confirm Password:</Label>
            <Input
              type="password"
              onChange={passwordTwoChangeHandler}
              className={classes.input}
              value={passwordTwo}
              placeholder="Confirm Password"
            />
          </div>
          {error && <ErrorText>{error}</ErrorText>}
          <Button className={classes.input} onClick={formSubmitHandler}>
            Sign Up
          </Button>
        </Form>
        <span className={classes.signup}>
          Or{' '}
          <Link href="/login">
            <a className={classes.href}>log in</a>
          </Link>{' '}
          to an existing account.
        </span>
      </Content>
    </>
  );
};

export default SignUp;
