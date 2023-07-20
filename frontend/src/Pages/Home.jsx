import React from 'react'
import Layout from '../components/Layout';
import Navbar from '../components/nav/Navbar';
import TaskList from '../components/task/TaskList';
import classes from './Home.module.scss';


const Home = () => {
  return (
    <div className={classes.container}>

<Navbar />
<Layout>
<TaskList/>
</Layout>
</div>
    )
}

export default Home