import mongoose from 'mongoose';

const categoriesEnum = ['lancamentos', 'maisVendidos', 'kits'];
const sectionEnum = ['cabelo', 'banho', 'skincare', 'maquiagem', 'perfume'];

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true, min: [0.01, 'O Preço deve ser maior que zero!'] },
    category: { type: String, required: false, enum: categoriesEnum },
    section: { type: String, required: true, enum: sectionEnum }
}, { versionKey: false });

const Product = mongoose.model('Product', productSchema);

export default Product;
export { categoriesEnum, sectionEnum };