// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../models/User';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
};