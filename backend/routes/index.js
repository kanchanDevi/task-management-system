import express from 'express';
import taskRoute from './tasks.js';
import authRoute from './auth.js';
import usersRoute from './users.js';
import {checkAuth} from  '../Utils/checkAuth.js';

const router=express.Router();

router.use('/auth', authRoute )
router.use('/tasks', checkAuth, taskRoute )
router.use('/users', checkAuth, usersRoute )


export default router;