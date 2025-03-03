import { NextRequest,NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import {z} from 'zod';
import { prisma } from "@/prisma/client";
import bcrypt from "bcryptjs";


const loginRequest=z.object(
    {
        password: z.string().min(4,'password is required').max(10),
        email: z.string().email().endsWith('@gmail.com','email is required'),
    }
)

export async function POST(request:NextRequest){
    const body=await request.json()
    const validation=body.safeParse(loginRequest)
    if(!validation.success)
        return NextResponse.json(validation.error.format(),{status:400})
   const gotUser= await prisma.user.findUnique({
        where:body.email
    })

    if (!gotUser?.password)
        NextResponse.json("user not found",{status:404})

    const result= bcrypt.compare(body.password,`${gotUser?.password}`)
    //generate token

}