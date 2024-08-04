import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        const user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if(!user) {

            return res.status(404).json({ error: 'Usuário não encontrado!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {

            return res.status(400).json({ error: 'Senha incorreta!' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1h' });
        res.status(200),json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}