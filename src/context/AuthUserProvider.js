import { createContext, useContext, Context } from 'react';
import useFirebaseAuth from '../api/useFirebaseAuth';

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {}
});

export const AuthUserProvider = ({ children }) => {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
};

export const useAuth = () => useContext(authUserContext);
