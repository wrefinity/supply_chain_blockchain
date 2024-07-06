import bcrypt from 'bcrypt';
import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from "@prisma/client";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    if (req.method === 'POST') {
        // Create user
        await createUserHandler(req, res);
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}

// hash the user-entered password using bcrypt
export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Function to create user in the database
async function createUserHandler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
   
    const { password, email } = req.body;

    try {
        const userExist = await prisma.user.findUnique({
            where: { email }
        })
        if (userExist){
            
            return res.status(403).json({message:"user exist"});
        } 

        if (password.length < 6) {
            return res.status(400).json({ message:"Password length should be more than 6 characters" });
        }

        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: { ...req.body, password: hashedPassword },
        });
        return res.status(201).json({ user });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return res.status(400).json({ message: 'Unique constraint failed on the fields: ' + e.meta?.target });
            }
        }
        return res.status(400).json({ message: 'An error occurred while creating the user' });
    }
}
