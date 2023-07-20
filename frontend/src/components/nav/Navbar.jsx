import React, {useState, useEffect} from 'react';
import classes from './Navbar.module.scss';
import { FaUserAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'



const Navbar = () => {
    const [user, setUser]=useState(null);
    const nevigate=useNavigate()

const getUser= async()=>{
try{
    const {data}= await axios.get('./api/users/me');
    setUser(data);

}catch(err){
    console.log(err)
}
}

useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
      setUser(null);
      toast.success('Logged out successfully');
      nevigate('/auth');
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return null;

  return (
    <header>
    <div className={classes.userInfo}>
      <FaUserAlt className={classes.userIcon} />
      <div>
        <h1 className={classes.name}>{user.name}</h1>
        <p className={classes.email}>{user.email}</p>
        <Link to="/edit-profile" className={classes.editBtn}>
          Edit
        </Link>
      </div>
    </div>
    <nav>
      <button type="button" className={classes.logout} onClick={handleLogout}>
        logout
      </button>
    </nav>
  </header>
  )
}

export default Navbar