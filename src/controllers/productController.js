import Product, { categoriesEnum, sectionEnum } from "../models/Product.js";

class ProductController {

    static async getAllProducts (req, res) {

        try {

            const products = await Product.find({});
            res.status(200).json(products);
        } catch (error) {

            res.status(500).json({ error: `Falha ao buscar produtos: ${error.message}` })
        }
    };

    static async createProduct (req, res) {

        const { name, image, price, category, section } = req.body;
        
        try {

            const product = new Product({ name, image, price, category, section });
            await product.save();
            res.status(201).json(product);
        } catch (error) {

            res.status(500).json({ error: error.message })
        }
    };

    static async getProductById (req, res) {

        try {

            const product = await Product.findById(req.params.id);

            if(!product) return res.status(404).json({ error: 'Produto não encontrado!' });

            res.status(200).json(product);
        } catch (error) {

            res.status(500).json({ error: error.message })
        }
    };

    static async getProductByCategory (req, res) {

        try {

            const productCategory = req.params.category;

            if(!categoriesEnum.includes(productCategory)) return res.status(404).json({ error: `Categoria: ${productCategory} não existe`});
            
            const product = await Product.find({ category: productCategory });
            res.status(200).json(product);
        }catch (error) {

            res.status(500).json({ error: error.message })
        }
    };

    static async getProductBySection (req, res) {

        try {
            
            const productSection = req.params.section;

            if(!sectionEnum.includes(productSection)) return res.status(404).json({ error: `Seção: ${productSection} não existe`});

            const products = await Product.find({ section: productSection });
            res.status(200).json(products);
        }catch (error) {

            res.status(500).json({ error: error.message })
        }
    };

    static async updateProduct (req, res) {

        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if(!product) return res.status(404).json({ error: 'Produto não encontrado!' });

            res.status(200).json(product);
        } catch (error) {

            res.status(500).json({ error: error.message })
        }
    };

    static async deleteProduct (req, res) {

        try {
            const product = await Product.findByIdAndDelete(req.params.id);

            if(!product) return res.status(404).json({ error: 'Produto não encontrado!' });

            res.status(200).json({ message: 'Produto deletado com sucesso!' });
        } catch (error) {

            res.status(500).json({ error: error.message })
        }
    };
};

export default ProductController;