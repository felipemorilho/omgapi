import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectDB() {
    try { 
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado');
    
    } catch (error) {
        console.error('Erro de conexão com o MongoDB:', error.message);
        process.exit(1);
    }
};

export default connectDB;