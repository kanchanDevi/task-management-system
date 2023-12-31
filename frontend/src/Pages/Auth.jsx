import React from 'react';
import Layout from '../components/Layout';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import classes from './Auth.module.scss';




const Auth = () => {

  return (
    <Layout>
      <div className={classes.form_container}>
        <Login></Login>
        <Register></Register>
      </div>

    </Layout>
  )
}

export default Auth