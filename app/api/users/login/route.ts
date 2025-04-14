import { NextRequest,NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/app/lib/client";
import bcrypt from "bcryptjs";
import {generateToken} from "../../../lib/auth"


const loginRequest=z.object(
  {
      password: z.string().min(4,'password is required').max(10),
      email: z.string().email().endsWith('@gmail.com','email is required'),
  }
)



export const config = {
    api: {
      bodyParser: false,
    },
  };
  

export async function POST(request:NextRequest){
  
  try{
    const body=await request.json()
    const validation=loginRequest.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.format(),{status:400})
    const user = await prisma.user.findUnique({
      where: {email:body.email}
    });

    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      return NextResponse.json(new Error("Invalid credentials"),{status:403});
    }
    
    const token = generateToken(user)
  
    const response= NextResponse.json({error:null,message: "Login successful", token:token},{status:200 });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
       
  }catch(err){
    return NextResponse.json({error:err,message:"Failed to Login",token:""},{status:500})
  }

}