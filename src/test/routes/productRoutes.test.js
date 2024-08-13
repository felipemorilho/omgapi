import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import productRoutes from "../../routes/productRoutes.js";
import Product from "../../models/Product.js";

let mongoServer;

const app = express();
app.use(express.json());
app.use("/", productRoutes);

beforeAll(async () => {

  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
});

afterAll(async () => {

  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Product Routes", () => {

  it("deve retornar todos os produtos", async () => {
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("deve criar um novo produto com dados válidos", async () => {

    const productData = {
      name: "Produto Teste",
      image: "imagem.jpg",
      price: 19.99,
      category: "lancamentos",
      section: "cabelo",
    };

    const response = await request(app).post("/products").send(productData);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(productData);
  });

  it("não deve criar um produto com dados inválidos", async () => {

    const productData = {
      name: "P",
      image: "img",
      price: -10,
      category: "categoriaInvalida",
      section: "seccaoInvalida",
    };

    const response = await request(app).post("/products").send(productData);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("deve retornar um produto por ID", async () => {

    const product = new Product({
      name: "Produto Teste",
      image: "imagem.jpg",
      price: 19.99,
      category: "lancamentos",
      section: "cabelo",
    });

    await product.save();
    const response = await request(app).get(`/products/${product._id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Produto Teste");
  });

  it("deve atualizar um produto existente", async () => {

    const product = new Product({
      name: "Produto Teste",
      image: "imagem.jpg",
      price: 19.99,
      category: "lancamentos",
      section: "cabelo",
    });

    await product.save();
    const updatedData = { name: "Produto Atualizado" };

    const response = await request(app)
      .put(`/products/${product._id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Produto Atualizado");
  });

  it("deve deletar um produto existente", async () => {

    const product = new Product({
      name: "Produto Teste",
      image: "imagem.jpg",
      price: 19.99,
      category: "lancamentos",
      section: "cabelo",
    });

    await product.save();
    const response = await request(app).delete(`/products/${product._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Produto deletado com sucesso!");
  });

  it("deve retornar produtos por categoria", async () => {

    const product = new Product({
      name: "Produto Teste",
      image: "imagem.jpg",
      price: 19.99,
      category: "lancamentos",
      section: "cabelo",
    });

    await product.save();
    const response = await request(app).get("/category/lancamentos");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].category).toBe("lancamentos");
  });

  it("deve retornar produtos por seção", async () => {
    
    const product = new Product({
      name: "Produto Teste",
      image: "imagem.jpg",
      price: 19.99,
      category: "lancamentos",
      section: "cabelo",
    });

    await product.save();
    const response = await request(app).get("/section/cabelo");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].section).toBe("cabelo");
  });
});
