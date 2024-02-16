import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const data = await prisma?.post.findMany({
                include: {
                    user: true,
                    Comment: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
            return res.status(200).json(data);
        } catch (error) {
            res.status(403).json({ message: "Error while fetching data" });
        }
    }
}