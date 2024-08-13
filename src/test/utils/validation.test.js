import { Validation } from "../../utils/validations.js";

describe("Validation Class", () => {

  describe("validateName", () => {

    it("deve validar um nome correto", () => {

      const result = Validation.validateName("Produto 123");

      expect(result).toEqual({ valid: true });
    });

    it("não deve validar um nome com menos de 3 caracteres", () => {

      const result = Validation.validateName("AB");

      expect(result).toEqual({
        valid: false,
        message:
          "O nome deve ter entre 3 e 30 caracteres e conter apenas letras e números, sem iniciar com espaço.",
      });
    });

    it("não deve validar um nome com mais de 30 caracteres", () => {

      const result = Validation.validateName(
        "testando o Limite de Caracteres Max"
      );

      expect(result).toEqual({
        valid: false,
        message:
          "O nome deve ter entre 3 e 30 caracteres e conter apenas letras e números, sem iniciar com espaço.",
      });
    });

    it("não deve validar um nome com caracteres especiais", () => {

      const result = Validation.validateName("Produto@123");

      expect(result).toEqual({
        valid: false,
        message:
          "O nome deve ter entre 3 e 30 caracteres e conter apenas letras e números, sem iniciar com espaço.",
      });
    });

    it("não deve validar um nome que começa com espaço", () => {

      const result = Validation.validateName(" Produto123");

      expect(result).toEqual({
        valid: false,
        message:
          "O nome deve ter entre 3 e 30 caracteres e conter apenas letras e números, sem iniciar com espaço.",
      });
    });
  });

  describe("validateImage", () => {

    it("deve validar uma URL de imagem com comprimento suficiente", () => {

      const result = Validation.validateImage("http://example.com/image.jpg");

      expect(result).toEqual({ valid: true });
    });

    it("não deve validar uma URL de imagem com comprimento insuficiente", () => {

      const result = Validation.validateImage("http");

      expect(result).toEqual({
        valid: false,
        message: "A URL da imagem deve ter pelo menos 5 caracteres.",
      });
    });
  });

  describe("validatePrice", () => {

    it("deve validar um preço correto", () => {

      const result = Validation.validatePrice(19.99);

      expect(result).toEqual({ valid: true });
    });

    it("não deve validar um preço que começa com zero", () => {

      const result = Validation.validatePrice(0.99);

      expect(result).toEqual({
        valid: false,
        message:
          "O preço deve ser um número positivo com até duas casas decimais e não pode começar com zero.",
      });
    });

    it("não deve validar um preço com mais de duas casas decimais", () => {

      const result = Validation.validatePrice(19.999);

      expect(result).toEqual({
        valid: false,
        message:
          "O preço deve ser um número positivo com até duas casas decimais e não pode começar com zero.",
      });
    });
  });

  describe("validateCategory", () => {

    it("deve validar uma categoria fornecida", () => {

      const result = Validation.validateCategory("beleza");

      expect(result).toEqual({ valid: true });
    });

    it("não deve validar uma categoria vazia", () => {

      const result = Validation.validateCategory("");

      expect(result).toEqual({
        valid: false,
        message: "A categoria é obrigatória.",
      });
    });
  });

  describe("validateSection", () => {

    it("deve validar uma seção fornecida", () => {

      const result = Validation.validateSection("cabelo");

      expect(result).toEqual({ valid: true });
    });

    it("não deve validar uma seção vazia", () => {

      const result = Validation.validateSection("");
      
      expect(result).toEqual({
        valid: false,
        message: "A seção é obrigatória.",
      });
    });
  });
});
