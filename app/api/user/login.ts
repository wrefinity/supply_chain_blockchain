import bcrypt from 'bcrypt';
import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    // Login user
    await loginUserHandler(req, res);
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function loginUserHandler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Invalid inputs' });
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (user && await bcrypt.compare(password, user.password)) {
      // Exclude password from JSON response
      const userWithoutPassword = exclude(user, ['password']);
      return res.status(200).json(userWithoutPassword);
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (e) {
    return res.status(500).json({ message: 'An error occurred while logging in' });
  }
}

// Function to exclude user password returned from prisma
function exclude<T, Key extends keyof T>(user: T, keys: Key[]): Omit<T, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
