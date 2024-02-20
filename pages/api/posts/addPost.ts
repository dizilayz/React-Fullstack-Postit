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
            return res.status(401).json({ message: "Please, sign in to make a post" });
        }

        const title: string = req.body.title;

        // Check title
        if (title.length > 300) return res.status(403).json({ message: "Please make a shorter post" })
        if (!title.length) {
            return res.status(403).json({ message: "Please, don't leave it empty" })
        }

        //Get User

        const prismaUser = await prisma?.user.findUnique({
            where: { email: session?.user?.email || undefined }
        })

        // Create a post
        try {
            const result = await prisma?.post.create({
                data: {
                    title,
                    userId: prismaUser?.id
                } as Prisma.PostUncheckedCreateInput
            })
            res.status(200).json(result);
        } catch (error) {
            res.status(403).json({ error: 'Error has been occured while making a post' })
        }
    }
}