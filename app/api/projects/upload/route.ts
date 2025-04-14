import { NextResponse } from 'next/server';
import prisma from '../../../lib/client'
import {z} from 'zod'
import { cookies } from 'next/headers';
import { verifyToken } from '@/app/lib/auth';
const uploadRequest=z.object({
  title: z.string().min(3,'title is required').max(30),
  description: z.string().min(3,'description is required').max(1000),
  category: z.string().min(4,'category is required').max(20),
  client: z.string().min(3,'client is required'),
  location: z.string().min(3,'location is required'),
  typology:z.string().min(3,'typology is required'),
  year:z.string().min(4,'year is required').max(4),

});

export async function POST(request: Request) {
  try {
    const token =(await cookies()).get('token')?.value||''
    if (token){
     const vToken= verifyToken(token).sub
        if (vToken&&vToken!=='ADMIN'){
          return NextResponse.redirect(new URL('/not-authorized', request.url));
        }
    }

    const data = await request.json();
    const validation= uploadRequest.safeParse(data)
        console.log("body",data)
    
        if (!validation.success) return NextResponse.json({
          error:validation.error.format(),
          message:"Failed to upload project",
          user:null,
          token:"",
         },{status:400})



    // Save to database
    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        client:data.client,
        location:data.location,
        size:data.size,
        typology:data.typology,
        year:data.year,
        category: data.category,
        imagePaths: data.imagePaths,
        videoPaths:data.videoPaths,
      },
    });

    return NextResponse.json(project,{status:201});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


