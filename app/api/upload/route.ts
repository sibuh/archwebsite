import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';
import path from 'path';
import { string } from 'zod';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

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



// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import { promises as fs } from 'fs';
// import path from 'path';
// import { IncomingForm } from 'formidable';

// import formidable, { File } from 'formidable';

// const prisma = new PrismaClient();

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export  async function POST(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const form = new formidable.IncomingForm({
//       multiples: true,
//       keepExtensions: true,
//     });

//     const [fields, files] = await new Promise<[any, any]>((resolve, reject) => {
//       form.parse(req, (err, fields, files) => {
//         if (err) reject(err);
//         resolve([fields, files]);
//       });
//     });

//     // Validate required fields
//     if (!fields.name || !fields.description) {
//       res.json
//       return  res.json({ error: 'Missing required fields',status:400 })
//     }

//     // Process files
//     const uploadDir = path.join(process.cwd(), 'public', 'uploads',`${fields.name}`);
//     await fs.mkdir(uploadDir, { recursive: true });

//     // Process multiple images
//     const imageFiles = files.images || [];
//     const imagePaths = [];
    
//     for (const file of Array.isArray(imageFiles) ? imageFiles : [imageFiles]) {
//       const ext = path.extname(file.originalFilename);
//       const newFilename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//       const newPath = path.join(uploadDir, newFilename);
//       await fs.rename(file.filepath, newPath);
//       imagePaths.push(`/uploads/${fields.name}/${newFilename}`);
//     }

//     // Process multiple videos
//     const videoFiles = files.videos || [];
//     const videoPaths = [];
    
//     for (const file of Array.isArray(videoFiles) ? videoFiles : [videoFiles]) {
//       const ext = path.extname(file.originalFilename);
//       const newFilename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//       const newPath = path.join(uploadDir, newFilename);
//       await fs.rename(file.filepath, newPath);
//       videoPaths.push(`/uploads/${fields.name}/${newFilename}`);
//     }

//     // Create database record
//     const media = await prisma.project.create({
//       data: {
//         name: Array.isArray(fields.name) ? fields.name[0] : fields.name,
//         description: Array.isArray(fields.description) ? fields.description[0] : fields.description,
//         // price: parseFloat(Array.isArray(fields.price) ? fields.price[0] : fields.price),
//         imagePaths,
//         videoPaths,
//       },
//     });

//     res.json({status:200,});
  
//   } catch (error) {
//     console.error(error);
//     res.json({ error: 'Internal server error',status:500 });
//   }
// }