import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../../config/db.js'; 

dotenv.config();

jest.mock('mongoose'); 

describe('connectDB', () => {

  beforeEach(() => {
    jest.resetAllMocks(); 
  });

  it('deve conectar ao MongoDB com sucesso', async () => {

    mongoose.connect.mockResolvedValueOnce(); 

    console.log = jest.fn();

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
    expect(console.log).toHaveBeenCalledWith('MongoDB conectado');
  });

  it('deve tratar erros ao conectar ao MongoDB', async () => {
    const errorMessage = 'Falha na conexão com o MongoDB';
    mongoose.connect.mockRejectedValueOnce(new Error(errorMessage)); 

    console.error = jest.fn();
    process.exit = jest.fn();

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
    expect(console.error).toHaveBeenCalledWith('Erro de conexão com o MongoDB:', errorMessage);
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});