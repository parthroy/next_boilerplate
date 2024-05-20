import type { NextApiRequest, NextApiResponse } from 'next';
import UserReply from '../../../models/UserReply';
import { withAuth } from '../../../utils/auth';

// Helper to initialize the database (sync the models)
async function initializeDatabase() {
    try {
        await UserReply.sync();
    } catch (error) {
        console.error('Unable to initialize the database:', error);
    }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await initializeDatabase();

    switch (req.method) {
        case 'GET':
            try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
    
            const offset = (page - 1) * limit;
    
            const { count, rows } = await UserReply.findAndCountAll({
              limit,
              offset,
            });
    
            res.status(200).json({
              totalItems: count,
              totalPages: Math.ceil(count / limit),
              currentPage: page,
              userReplies: rows,
            });
          } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user replies.' });
          }
          break;
        case 'POST':
            try {
                const { calldate, calluid, clid, src, dst, answer, end, duration, billsec, userresponse_1, userresponse_2, userresponse_3, userresponse_4, userresponse_5, recording_responce_path, fullrecording, days, lead_type, sentiment } = req.body;
                const userReply = await UserReply.create({
                    calldate,
                    calluid,
                    clid,
                    src,
                    dst,
                    answer,
                    end,
                    duration,
                    billsec,
                    userresponse_1,
                    userresponse_2,
                    userresponse_3,
                    userresponse_4,
                    userresponse_5,
                    recording_responce_path,
                    fullrecording,
                    days,
                    lead_type,
                    sentiment
                });
                res.status(201).json(userReply);
            } catch (error) {
                res.status(500).json({ error: 'Failed to create user reply.' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default withAuth(handler);