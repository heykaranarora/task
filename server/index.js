import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './utils/db.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
dotenv.config({});

const app = express();
const Port=process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
  }));


  app.use("/api/v1",userRoutes);
  app.use("/api/v1/admin",adminRoutes);

  app.listen(Port, () => {
    connectDB();
    console.log(`Server running on port ${Port}`);
  });


