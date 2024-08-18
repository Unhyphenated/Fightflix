import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '@/lib/prismadb';

import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try { 
        if (req.method !== 'POST') {
            const { currentUser } = await serverAuth(req);
            const { fightId } = req.body;
            const existingFight = await prismadb.fight.findUnique( {
                where: {
                    id: fightId,
                }
            });
            if (!existingFight) {
                throw new Error('Invalid ID');
            }

            const user = await prismadb.user.update({
                where: {
                    email:currentUser.email || '',
                },
                data: {
                    favoriteIds: {
                        push: fightId,
                    }
                }
            })
            return res.status(200).json(user);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}