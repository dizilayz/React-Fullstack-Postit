import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/prisma"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "DELETE") {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({ message: "Please, sign in" });
        }

        // Delete a post
        try {
            const postId = req.body;
            const result = await prisma.post.delete({
                where: {
                    id: postId
                }
            })
            return res.status(200).json(result);
        } catch (error) {
            res.status(403).json({ error: 'Error has been occured while making a post' })
        }
    }
}