import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import {URL} from './Url'

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState();

  const verifyAuth = async () => {
    try {
      const isLoggedIn = await axios.get(`${URL}/api/auth/is_logged_in`);
      setAuth(isLoggedIn.data);
      return isLoggedIn.data;
    } catch (err) {
      console.error("Error while verifying auth:", err);
      return false;
    }
  };
  
  useEffect(() => {
   verifyAuth()
  }, []);

  return (
    <AuthContext.Provider value={{ auth, verifyAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;