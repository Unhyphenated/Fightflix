import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
    try {
        const { email, name, password } = await req.json();
        const users = await prismadb.user.findMany();
        console.log(users); 

        // Check if the user already exists
        const existingUser = await prismadb.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: 'Email taken' }, { status: 422 });
        }

        // Hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            },
        });

        console.log('User created:', user);
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error('Error during registration:', error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
