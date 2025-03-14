import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import prisma from "@/app/lib/client";
export async function POST(req:NextRequest){
//     const body=await req.json()
//     console.log("env: ",process.env)
//    const payload= jwt.verify(body.token ,"process.env")
//    const user= await prisma.user.findUnique({
//         where:{
//             email:"abel@gmail.com"
//         }
//     })
    return NextResponse.json({email:"abel@gmail.com"},{status:200})

}