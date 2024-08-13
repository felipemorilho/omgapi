import mongoose from "mongoose";
import express from "express";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import Image from "../../models/Image.js";
import ImageController from "../../controllers/imageController.js";

let mongoServer;

jest.mock("../../models/Image.js");

const app = express();
app.use(express.json());
app.get("/retrieve/images", ImageController.getAllImages);
app.post("/retrieve/images", ImageController.createImage);
app.get("/retrieve/images/:id", ImageController.getImageById);
app.put("/retrieve/images/:id", ImageController.updateImage);

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

  await Image.deleteMany({});
});

describe("getAllImages", () => {

  it("deve retornar todas imagens", async () => {

    const mockImages = [
      {
        _id: "66b26d75b63cdd73444bd54f",
        url: "https://exemplo.com/imagem.jpg",
        alt: "Imagem de teste",
      },
      {
        _id: "66b26d75b63cdd73444bd44f",
        url: "https://exemplo.com/imagem2.jpg",
        alt: "Imagem de teste 2",
      },
    ];

    Image.find.mockResolvedValue(mockImages);

    const res = await request(app).get("/retrieve/images");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockImages);
  });

  describe("createImage", () => {

    it("deve criar uma nova imagem", async () => {

      const mockImage = {
        url: "https://exemplo.com/imagem.jpg",
        alt: "Imagem de teste",
      };

      Image.prototype.save.mockResolvedValue(mockImage);

      const res = await request(app)
        .post("/retrieve/images")
        .send({
          url: "https://exemplo.com/imagem.jpg",
          alt: "Imagem de teste",
        });

      expect(res.status).toBe(201);
    });
  });

  describe("getImageById", () => {

    it("deve retornar uma imagem pelo seu ID", async () => {

      const mockImage = {
        _id: "66b26d75b63cdd73444bd54f",
        url: "https://exemplo.com/imagem.jpg",
        alt: "Imagem de teste",
      };

      Image.findById.mockResolvedValue(mockImage);

      const res = await request(app).get(
        "/retrieve/images/66b26d75b63cdd73444bd54f"
      );

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockImage);
    });

    it("não deve retornar uma imagem com ID não encontrado", async () => {

      Image.findById.mockResolvedValue(null);

      const res = await request(app).get(
        "/retrieve/images/66b26d75b63cdd73444bd54f"
      );

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: "Imagem não encontrada" });
    });
  });

  describe("updateImage", () => {

    it("deve retornar 200 caso a atualização tenha sucesso", async () => {

      const mockImage = {
        _id: "66b26d75b63cdd73444bd54f",
        url: "https://exemplo.com/imagem.jpg",
        alt: "Imagem de teste",
      };
      
      Image.findByIdAndUpdate.mockResolvedValue(mockImage);

      const res = await request(app)
        .put("/retrieve/images/66b26d75b63cdd73444bd54f")
        .send({ alt: "Imagem atualizada" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockImage);
    });
  });
});
