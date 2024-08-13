import Image from '../models/Image.js';

const createImage = async (req, res) => {

    try {

        const { url, alt } = req.body;
        const image = new Image({ url, alt });
        await image.save();
        res.status(201).json(image);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

const getAllImages = async (req, res) => {

    try {

        const images = await Image.find();
        res.status(200).json(images);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

const getImageById = async (req, res) => {

    try {

        const image = await Image.findById(req.params.id);

        if (!image) return res.status(404).json({ message: 'Imagem não encontrada' });

        res.status(200).json(image);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

const updateImage = async (req, res) => {

    try {

        const { url, alt } = req.body;
        const image = await Image.findByIdAndUpdate(req.params.id, { url, alt }, { new: true });

        if (!image) return res.status(404).json({ message: 'Imagem não encontrada' });

        res.status(200).json(image);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
};

const deleteImage = async (req, res) => {

    try {

        const image = await Image.findByIdAndDelete(req.params.id);

        if (!image) return res.status(404).json({ message: 'Imagem não encontrada' });
        
        res.status(200).json({ message: 'Imagem deletada com sucesso' });
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

export default { createImage, getAllImages, getImageById, updateImage, deleteImage };