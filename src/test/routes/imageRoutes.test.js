import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import imageRoutes from "../../routes/imageRoutes.js";
import Image from "../../models/Image.js";

let mongoServer;
let testImageId;

const app = express();
app.use(express.json());
app.use("/retrieve", imageRoutes);

beforeAll(async () => {

  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
});

afterAll(async () => {

  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {

  await Image.deleteMany({});

  const imageData = {
    url: "https://exemplo.com/imagem.jpg",
    alt: "Imagem de teste",
  };
  const image = new Image(imageData);
  await image.save();

  testImageId = image._id;
});

describe("Image Routes", () => {

  it("com a rota post de imagens então deve criar uma nova imagem", async () => {

    const response = await request(app)
      .post("/retrieve/images")
      .send({
        url: "https://exemplo.com/imagem.jpg",
        alt: "Imagem de teste",
      })
      .expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.url).toBe("https://exemplo.com/imagem.jpg");
    expect(response.body.alt).toBe("Imagem de teste");

    testImageId = response.body._id;
    console.log(testImageId);
  });

  it("com a rota get de iamgens então deve retornar todas as imagens", async () => {

    await request(app).post("/retrieve/images").send({
      url: "https://exemplo.com/imagem2.jpg",
      alt: "Imagem de teste 2",
    });

    const response = await request(app).get("/retrieve/images").expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });

  it("com a rota get de um ID então deve retornar o objeto da imagem", async () => {

    const response = await request(app)
      .get(`/retrieve/images/${testImageId}`)
      .expect(200);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.url).toBe("https://exemplo.com/imagem.jpg");
    expect(response.body.alt).toBe("Imagem de teste");
  });

  it("com a rota patch de um ID então deve atualizar o objeto da imagem", async () => {

    const response = await request(app)
      .put(`/retrieve/images/${testImageId}`)
      .send({
        url: "https://exemplo.com/imagem-att.jpg",
        alt: "Imagem de teste Atualizada",
      })
      .expect(200);

    expect(response.body.url).toBe("https://exemplo.com/imagem-att.jpg");
    expect(response.body.alt).toBe("Imagem de teste Atualizada");
  });

  it("com a rota delete de um ID então deve deletar o objeto da imagem", async () => {
    
    await request(app).delete(`/retrieve/images/${testImageId}`).expect(200);

    const response = await request(app)
      .get(`/retrieve/images/${testImageId}`)
      .expect(404);

    expect(response.body.message).toBe("Imagem não encontrada");
  });
});
