import mongoose from 'mongoose';
import { MongoMemoryServer } from "mongodb-memory-server";
import Product, { categoriesEnum, sectionEnum } from '../../models/Product.js';

let mongoServer;

describe('Product Model', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
  
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });
  
  // beforeEach(async () => {
  //   await Product.deleteMany({});
  // });

  it('deve criar um produto com campos válidos', async () => {
    const productData = {
      name: 'Produto Teste',
      image: 'imagem.jpg',
      price: 19.99,
      category: 'lancamentos',
      section: 'cabelo',
    };

    const product = new Product(productData);
    await product.save();

    const savedProduct = await Product.findById(product._id);

    expect(savedProduct).toBeTruthy();
    expect(savedProduct.name).toBe(productData.name);
    expect(savedProduct.image).toBe(productData.image);
    expect(savedProduct.price).toBe(productData.price);
    expect(savedProduct.category).toBe(productData.category);
    expect(savedProduct.section).toBe(productData.section);
  });

  it('não deve criar um produto com preço inválido', async () => {
    const productData = {
      name: 'Produto Teste',
      image: 'imagem.jpg',
      price: 0,
      category: 'lancamentos',
      section: 'cabelo',
    };

    const product = new Product(productData);

    let error;
    try {
      await product.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeTruthy();
    expect(error.errors.price).toBeTruthy();
    expect(error.errors.price.message).toBe('O Preço deve ser maior que zero!');
  });

  it('não deve criar um produto com categoria inválida', async () => {
    const productData = {
      name: 'Produto Teste',
      image: 'imagem.jpg',
      price: 19.99,
      category: 'categoriaInvalida',
      section: 'cabelo',
    };

    const product = new Product(productData);

    let error;
    try {
      await product.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeTruthy();
    expect(error.errors.category).toBeTruthy();
    expect(error.errors.category.message).toBe(`${productData.category} não é uma categoria válida. Categorias: ${categoriesEnum.join(', ')}`);
  });

  it('não deve criar um produto com seção inválida', async () => {
    const productData = {
      name: 'Produto Teste',
      image: 'imagem.jpg',
      price: 19.99,
      category: 'lancamentos',
      section: 'secaoInvalida',
    };

    const product = new Product(productData);

    let error;
    try {
      await product.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeTruthy();
    expect(error.errors.section).toBeTruthy();
    expect(error.errors.section.message).toBe(`${productData.section} não é uma seção válida. Seções: ${sectionEnum.join(', ')}`);
  });
});
