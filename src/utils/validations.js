export class Validation {

    static validateName(name) {
        const nameRegex = /^(?!\s)[a-zA-Z0-9\s]{3,30}(?<!\s)$/;
        if (!name || !nameRegex.test(name)) {
            return { valid: false, message: 'O nome deve ter entre 3 e 30 caracteres e conter apenas letras e números, sem iniciar com espaço.' };
        }
        return { valid: true };
    }

    static validateImage(image) {
        if (!image || image.trim().length < 5) {
            return { valid: false, message: 'A URL da imagem deve ter pelo menos 5 caracteres.' };
        }
        return { valid: true };
    }

    static validatePrice(price) {
        const priceRegex = /^[1-9]\d*(\.\d{1,2})?$/;
        if (!price || !priceRegex.test(price.toString())) {
            return { valid: false, message: 'O preço deve ser um número positivo com até duas casas decimais e não pode começar com zero.' };
        }
        return { valid: true };
    }

    static validateCategory(category) {
        if (!category || category.trim() === "") {
            return { valid: false, message: 'A categoria é obrigatória.' };
        }
        return { valid: true };
    }

    static validateSection(section) {
        if (!section || section.trim() === "") {
            return { valid: false, message: 'A seção é obrigatória.' };
        }
        return { valid: true };
    }
}