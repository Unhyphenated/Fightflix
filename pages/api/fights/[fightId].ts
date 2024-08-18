import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        await serverAuth(req);
        const { fightId } = req.query;

        if (typeof fightId !== 'string') {
            throw new Error('Invalid ID');
        }

        if (!fightId) {
            throw new Error('Invalid ID');
        }

        const fight = await prismadb.fight.findUnique({
            where: {
                id: fightId
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}