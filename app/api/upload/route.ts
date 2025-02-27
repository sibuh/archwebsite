import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';
import path from 'path';
import formidable, { File } from 'formidable';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export  async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const form = new formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
    });

    const [fields, files] = await new Promise<[any, any]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Validate required fields
    if (!fields.name || !fields.description) {
      res.json
      return  res.json({ error: 'Missing required fields',status:400 })
    }

    // Process files
    const uploadDir = path.join(process.cwd(), 'public', 'uploads',`${fields.name}`);
    await fs.mkdir(uploadDir, { recursive: true });

    // Process multiple images
    const imageFiles = files.images || [];
    const imagePaths = [];
    
    for (const file of Array.isArray(imageFiles) ? imageFiles : [imageFiles]) {
      const ext = path.extname(file.originalFilename);
      const newFilename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      const newPath = path.join(uploadDir, newFilename);
      await fs.rename(file.filepath, newPath);
      imagePaths.push(`/uploads/${fields.name}/${newFilename}`);
    }

    // Process multiple videos
    const videoFiles = files.videos || [];
    const videoPaths = [];
    
    for (const file of Array.isArray(videoFiles) ? videoFiles : [videoFiles]) {
      const ext = path.extname(file.originalFilename);
      const newFilename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      const newPath = path.join(uploadDir, newFilename);
      await fs.rename(file.filepath, newPath);
      videoPaths.push(`/uploads/${fields.name}/${newFilename}`);
    }

    // Create database record
    const media = await prisma.project.create({
      data: {
        name: Array.isArray(fields.name) ? fields.name[0] : fields.name,
        description: Array.isArray(fields.description) ? fields.description[0] : fields.description,
        // price: parseFloat(Array.isArray(fields.price) ? fields.price[0] : fields.price),
        imagePaths,
        videoPaths,
      },
    });

    res.json({status:200,});
  
  } catch (error) {
    console.error(error);
    res.json({ error: 'Internal server error',status:500 });
  }
}