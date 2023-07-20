import axios from 'axios';
import { useEffect, useState } from 'react';

export default () => {
  const [auth, setAuth] = useState();

  const verifyAuth = async () => {
    const isLoggedIn = await axios.get(`/api/auth/is_logged_in`);
    setAuth(isLoggedIn.data);
    return isLoggedIn.data;
  };

  useEffect(() => {
    verifyAuth();
  }, []);

 

  return { auth };
};