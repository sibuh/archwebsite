import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';
import { prisma } from "@/prisma/client";
import bcrypt from "bcryptjs";



const signupRequest=z.object({
    firstName: z.string().min(3,'firstName is required').max(30),
    lastName: z.string().min(3,'lastName is required').max(30),
    username: z.string().min(3,"username is required").max(30),
    password: z.string().min(4,'password is required').max(10),
    email: z.string().email().endsWith('@gmail.com','email is required'),
    phone: z.string()

});

export async function POST(request:NextRequest){
    const body=await request.json()

   const validation= signupRequest.safeParse(body)
   if (!validation.success)
        return NextResponse.json(validation.error.format(),{status:400})

   //hash password
   const hashedPassword =await bcrypt.hash(body.password,10);

   const newUser= await prisma.user.create({
    data:{ 
        first_name: body.first_name,
        last_name:body.last_name,
        username: body.username,
        password:hashedPassword,
        email:body.email,
        phone:body.phone
    }
   })
   return NextResponse.json(newUser,{status:201})
};