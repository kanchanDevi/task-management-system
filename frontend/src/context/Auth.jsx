import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import {URL} from './Url'

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState();

  const verifyAuth = async () => {
    try {
      const res = await axios.get(`${URL}/api/auth/is_logged_in`);
      const resp=res.json()
      setAuth(resp);
      return resp;
    } catch (err) {
      console.error("Error while verifying auth:", err);
      // Handle the error as needed, e.g., set auth to false or show an error message.
      setAuth(false);
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