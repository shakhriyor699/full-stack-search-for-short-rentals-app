import bcrypt from 'bcryptjs';
import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';


export const POST = async (req: Request) => {
  const body = await req.json();

  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword
    }
  })

  return NextResponse.json(user);
}