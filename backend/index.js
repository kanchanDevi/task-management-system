import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import morgan from 'morgan';
import allRoutes from './routes/index.js'
// import userRoutes from './routes/users.js'
import 'dotenv/config'
import cookieParser from 'cookie-parser';

const PORT=process.env.PORT || 8080;
const app=express()

//middleware

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())
//routes

app.use('/api', allRoutes);

app.use((err, res, req) => {
    const status = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(status).json({ message, stack: err.stack });
  });

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("mongo db connected")
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

app.listen(PORT, ()=>{
    connectDB();
    console.log(`server is running at port ${PORT}`)
})
