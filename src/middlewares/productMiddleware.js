import { categoriesEnum, sectionEnum } from '../models/Product.js'
import { Validation } from '../utils/validations.js';

export const validateProduct = (req, res, next) => {
    const { name, image, price, category, section } = req.body;

    const validateName = Validation.validateName(name);
    if(!validateName.valid) {
        return res.status(400).json({ error: validateName.message });
    }

    const validateImage = Validation.validateImage(image);
    if(!validateImage.valid) {
        return res.status(400).json({ error: validateImage.message });
    }

    const validatePrice = Validation.validatePrice(price);
    if(!validatePrice.valid) {
        return res.status(400).json({ error: validatePrice.message });
    }

    const categoryValidation = Validation.validateCategory(category);
    if(categoryValidation.valid) {
        return validateCategory(req, res, category, next);
    }

    const sectionValidation = Validation.validateSection(section);
    if(sectionValidation.valid) {
        return validateSection(req, res, section, next);
    }
    
    next();
};

export const validateProductUpdate = (req, res, next) => {
    const { name, image, price, category, section } = req.body;

    if (name !== undefined) {
        const validateName = Validation.validateName(name);
        if (!validateName.valid) {
            return res.status(400).json({ error: validateName.message });
        }
    }

    if (image !== undefined) {
        const validateImage = Validation.validateImage(image);
        if (!validateImage.valid) {
            return res.status(400).json({ error: validateImage.message });
        }
    }

    if (price !== undefined) {
        const validatePrice = Validation.validatePrice(price);
        if (!validatePrice.valid) {
            return res.status(400).json({ error: validatePrice.message });
        }
    }

    if (category !== undefined) {
        return validateCategory(req, res, category, next);
    }

    if (section !== undefined) {
        return validateSection(req, res, section, next);
    }

    next();
};

export const validateCategory = (req, res, category, next) => {

  
    if (!categoriesEnum.includes(category)) {
      return res.status(404).json({ error: `Categoria: ${category} não existe` });
    }
  
    next();
  };
  
export const validateSection = (req, res, section, next) => {

    if (!sectionEnum.includes(section)) {
        return res.status(404).json({ error: `Seção: ${section} não existe` });
    }

    next();
};