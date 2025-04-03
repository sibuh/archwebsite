import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import prisma from '../../../lib/client'

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files');
    const videos=formData.getAll('videos');
    const title = formData.get('title');
    const description = formData.get('description');
    const category=formData.get('category');
    const client=formData.get('client');
    const location=formData.get('location');
    const size=formData.get('size');
    const typology=formData.get('typology');
    const year =formData.get('year');

    // Validate fields
    if (!title || !description || !category||!client||!location||!size||!typology||!year || files.length === 0 || videos.length===0) {
      console.log("form data:",formData)
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    console.log("received form data:===>",formData)
    // Process files
    const videoDir = path.join(process.cwd(), 'public', 'uploads',`${title}`,'videos');
    const imageDir = path.join(process.cwd(), 'public', 'uploads',`${title}`,'images');

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

      imagePaths.push(`/uploads/${title}/images/${filename}`);
      
    }
    for (const video of videos){
       if (typeof video==='string') continue;

      const buffer = await video.arrayBuffer();
      const filename = `${Date.now()}-${video.name}`;
      const filePath = path.join(videoDir, filename);
      await fs.writeFile(filePath, Buffer.from(buffer));

      videoPaths.push(`/uploads/${title}/videos/${filename}`);
      
    }

    // Save to database
    const project = await prisma.project.create({
      data: {
        title: title.toString(),
        description: description.toString(),
        client:client===null?'':client.toString(),
        location:location===null?'':location.toString(),
        size:size===null?'':size.toString(),
        typology:typology===null?'':typology.toString(),
        year:year===null?'':year.toString(),
        category: category==="ARCHITECURAL"?"ARCHITECTURAL":category==="LANDSCAPE"?"LANDSCAPE":category==="INTERIOR"?"INTERIOR":"STRUCTURAL",
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


