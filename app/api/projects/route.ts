import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';
import { prisma } from "@/prisma/client";
const createProjectScema=z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1)

});

export async function POST(request:NextRequest){
    const body=await request.json()

   const validation= createProjectScema.safeParse(body)
   if (!validation.success)
        return NextResponse.json(validation.error.errors,{status:400})
   const newProject= await prisma.project.create({
    data:{ 
        name: body.name,
        description: body.description
    }
   })
   return NextResponse.json(newProject,{status:201})
};