import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/products', productRoutes);
app.use('/api/orders', orderRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`)
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("MongoDB connected...")
    }).catch(err=>console.log(err))
})