import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState();

  const verifyAuth = async () => {
   try{
    const isLoggedIn = await axios.get('/api/auth/is_logged_in');
   return isLoggedIn.data;
   }catch(err){
    console.log(err);
    return false;
   }
  };

  useEffect(() => {
  (
    async ()=>{
      const data=await verifyAuth();
      setAuth(data);
    }
  )();
  });

  return (
    <AuthContext.Provider value={{ auth, verifyAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;