import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/User';
import sequelize from '../../../db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, email, password } = req.body;

    try {
        await sequelize.sync();

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const user = await User.create({ username, email, password });
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
};
