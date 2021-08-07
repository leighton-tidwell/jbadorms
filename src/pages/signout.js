import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthUserProvider';
import { useRouter } from 'next/router';

const SignOut = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    signOut();
    router.push('/');
  }, [signOut, router]);

  return <div>Signing out...</div>;
};

export default SignOut;
