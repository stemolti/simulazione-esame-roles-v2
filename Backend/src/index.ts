import 'reflect-metadata';
import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.MONGO_URI!;
const port = process.env.PORT!;

mongoose.set('debug', true);
mongoose
  .connect(connectionString, {})
  .then((_) => {
    console.log('Connected to the online database');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

export default app;