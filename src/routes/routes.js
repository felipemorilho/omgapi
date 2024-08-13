import express from 'express';
import productRoutes from './productRoutes.js';
import imageRoutes from './imageRoutes.js';
import authRoutes from './authRoutes.js';

const routes = (app) => {
    app.get('/', (req, res) => res.status(200).send('API OhMyGloss'));

    app.use(express.json());
    app.use('/', productRoutes);
    app.use('/retrieve', imageRoutes)
    app.use('/auth', authRoutes);
};

export default routes;