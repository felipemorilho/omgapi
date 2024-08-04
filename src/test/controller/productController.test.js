import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Product from "../../models/Product.js";
import ProductController from "../../controllers/productController.js";

let mongoServer;

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

beforeEach(async () => {
  await Product.deleteMany({});
});

describe("getAllProducts", () => {
  it("deve retornar todos os produtos", async () => {
    const product1 = new Product({
      name: "Produto 1",
      image: "imagem1.jpg",
      price: 10,
      category: "lancamentos",
      section: "cabelo",
    });
    const product2 = new Product({
      name: "Produto 2",
      image: "imagem2.jpg",
      price: 20,
      category: "maisVendidos",
      section: "maquiagem",
    });
    await product1.save();
    await product2.save();

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ProductController.getAllProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    expect(res.json.mock.calls[0][0].length).toBe(2);
  });

  describe("createProduct", () => {
    it("deve criar um novo produto", async () => {
      const req = {
        body: {
          name: "Produto1",
          image: "imagem1.jpg",
          price: 10,
          category: "kits",
          section: "skincare",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ProductController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            name: "Produto1",
            image: "imagem1.jpg",
            price: 10,
            category: "kits",
            section: "skincare",
        })
      );
    });

    it("não deve criar um produto com categoria inválida", async () => {
      const req = {
        body: {
          name: "Produto 1",
          image: "imagem1.jpg",
          price: 10,
          category: "CategoriaInvalida",
          section: "maquiagem",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ProductController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.any(String),
        })
      );
    });

    it("não deve criar um produto com categoria inválida", async () => {
      const req = {
        body: {
          name: "Produto 1",
          image: "imagem1.jpg",
          price: 10,
          category: "kits",
          section: "semSecao",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ProductController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.any(String),
        })
      );
    });
  });
});

// Adicione outros testes para getProductById, getProductByCategory, etc.
