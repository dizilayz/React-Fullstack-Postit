import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Prisma } from "@prisma/client";
import prisma from "../../../prisma/prisma"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({ message: "Please, sign in" });
        }

        // Create a post
        try {
            const data = await prisma?.user.findUnique({
                where: {email: session?.user?.email || undefined},
                include:{
                    Post:{
                        orderBy:{
                            createdAt: "desc"
                        },
                        include:{
                            Comment: true
                        }
                    }
                }
            })
            res.status(200).json(data);
        } catch (error) {
            res.status(403).json({ error: 'Error has been occured while making a post' })
        }
    }
}