
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import allRoutes from './routes/index.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Load environment variables from .env file
dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;
const mongoURI = process.env.DB_CONNECTION_STRING;
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

// routes
app.use('/api', allRoutes);

// error handler
app.use((err, req, res) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message, stack: err.stack });
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
