// pages/api/sync.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '../../db';
import User from '../../models/User';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await sequelize.sync({ force: true });
        res.status(200).send('Database synced!');
    } catch (error) {
        res.status(500).send('Failed to sync database.');
    }
};