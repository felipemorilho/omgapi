import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Image from "../../models/Image.js";

let mongoServer;

beforeAll(async () => {

  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
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

describe("Image Model", () => {

  it("deve criar uma iamgem com dados válidos", async () => {

    const imageData = {
      url: "https://exemplo.com/imagem.jpg",
      alt: "Imagem Teste",
    };

    const image = new Image(imageData);

    await image.save();

    const foundImage = await Image.findOne({ url: imageData.url });

    expect(foundImage).toBeTruthy();
    expect(foundImage.url).toBe(imageData.url);
    expect(foundImage.alt).toBe(imageData.alt);
  });

  it("não deve criar imagem sem o parâmetro url", async () => {

    const imageData = { alt: "Example Image" };
    const image = new Image(imageData);

    await expect(image.save()).rejects.toThrow();
  });

  it("não deve criar imagem com o parâmetro url inválido", async () => {
    
    const imageData = { url: "", alt: "Example Image" };
    const image = new Image(imageData);

    await expect(image.save()).rejects.toThrow();
  });
});
