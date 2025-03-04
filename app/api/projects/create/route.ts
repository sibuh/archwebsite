import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';
import path from 'path';


const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files');
    const videos=formData.getAll('videos');
    const name = formData.get('name');
    const description = formData.get('description');
    // const price = formData.get('price');

    // Validate fields
    if (!name || !description || files.length === 0 || videos.length===0) {
      console.log("validation failed","name:",name,"description:",description,
        "length of files:",files.length,"length of videos",videos.length)
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Process files
    const videoDir = path.join(process.cwd(), 'public', 'uploads',`${name}`,'videos');
    const imageDir = path.join(process.cwd(), 'public', 'uploads',`${name}`,'images');

    await fs.mkdir(videoDir, { recursive: true });
    await fs.mkdir(imageDir, { recursive: true });

    const imagePaths = [];
    const videoPaths = [];

    for (const file of files) {
      if (typeof file === 'string') continue;
      
      const buffer = await file.arrayBuffer();
      const filename = `${Date.now()}-${file.name}`;

      const filePath = path.join(imageDir, filename);

      await fs.writeFile(filePath, Buffer.from(buffer));

      imagePaths.push(`/uploads/${name}/images/${filename}`);
      
    }
    for (const video of videos){
       if (typeof video==='string') continue;

      const buffer = await video.arrayBuffer();
      const filename = `${Date.now()}-${video.name}`;
      const filePath = path.join(videoDir, filename);
      await fs.writeFile(filePath, Buffer.from(buffer));

      videoPaths.push(`/uploads/${name}/videos/${filename}`);
      
    }

    // Save to database
    const project = await prisma.project.create({
      data: {
        name: name.toString(),
        description: description.toString(),
        // price: parseFloat(price.toString()),
        imagePaths,
        videoPaths,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


