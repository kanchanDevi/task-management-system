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
  cors({
    credentials: true,
    origin(origin, callback) {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);

      if (allowedDomains.indexOf(origin) === -1) {
        const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  }),
);


app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', allRoutes);

// Error handling middleware
app.use((err, req, res) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(status).json({ message, stack: err.stack });
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
