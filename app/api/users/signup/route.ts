import { NextRequest, NextResponse } from "next/server";
import {z} from "zod"
import prisma from "../../../lib/client"
import bcrypt from "bcryptjs";
import auth from "../../../lib/auth"

const signupRequest=z.object({
  first_name: z.string().min(3,'firstName is required').max(30),
  last_name: z.string().min(3,'lastName is required').max(30),
  username: z.string().min(3,"username is required").max(30),
  password: z.string().min(4,'password is required').max(10),
  email: z.string().email().endsWith('@gmail.com','email is required'),
  phone: z.string()

});




const SECRET_KEY = "12345678901234567890123456789012";

export const config = {
    api: {
      bodyParser: false,
    },
  };

export async function POST(request:NextRequest){
    const body=await request.json()
    const validation= signupRequest.safeParse(body)

    if (!validation.success) return NextResponse.json({
      error:validation.error.format(),
      message:"Failed to signup",
      user:null,
      token:"",
     },{status:400})
  
  
    const existingUser = await prisma.user.findUnique({
      where:{
        email:body.email}
     });

    if (existingUser) return NextResponse.json({error: new Error("User already exists"),
      message:"Failed to signup",
      user:null,
      token:"",},
      {
      status:400
     });
   
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
  
  const token = auth.generateToken(newUser);
  
   return NextResponse.json(
    {error:null, 
    message: "Signup successful", 
    user:newUser,
    token:token,},
  {
    status:201});
};