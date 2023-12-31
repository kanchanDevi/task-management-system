// app.js (or index.js) - Your main application file

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import allRoutes from './routes/index.js';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

// Load environment variables from .env file

const PORT = process.env.PORT;

const mongoURI = process.env.DB_CONNECTION_STRING;

const app = express();

const CLIENT_URL_STRING = process.env.CLIENT_URL || 'http://localhost:3000';

const allowedDomains = CLIENT_URL_STRING.split(', ');
console.log(allowedDomains);

// middleware
app.use(
  cors(),
);


app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', allRoutes);

// Error handling middleware
app.use((err, req, res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Set this header to true if you need to send credentials
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(status).json({ message, stack: err.stack });
  next();
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at port ${PORT}`);
});
