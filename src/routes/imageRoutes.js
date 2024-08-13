import express from 'express';
import imageController from '.././controllers/imageController.js';

const router = express.Router();

router.post('/images', imageController.createImage);
router.get('/images', imageController.getAllImages);
router.get('/images/:id', imageController.getImageById);
router.put('/images/:id', imageController.updateImage);
router.delete('/images/:id', imageController.deleteImage);

export default router;