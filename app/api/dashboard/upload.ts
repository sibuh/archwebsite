import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import formidable, { File } from "formidable";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Required for formidable
  },
};

// Create a directory to store uploads
const uploadDir = path.join(process.cwd(), "/public/uploads");
fs.mkdir(uploadDir, { recursive: true });

const saveFile = async (file: File, folder: string) => {
  const filePath = path.join(uploadDir, folder, file.originalFilename || "file");
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const data = await fs.readFile(file.filepath);
  await fs.writeFile(filePath, data);
  await fs.unlink(file.filepath); // Clean up temp file
  return `/uploads/${folder}/${file.originalFilename}`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm();
  form.uploadDir = uploadDir;
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ message: "Error parsing files", err });
      return;
    }

    try {
      const imagePaths = [];
      const videoPath = "";

      // Handle multiple images
      const images = Array.isArray(files.images) ? files.images : [files.images];
      for (const image of images) {
        const imagePath = await saveFile(image as File, "images");
        imagePaths.push(imagePath);
      }

      // Handle single video
      if (files.video) {
        const videoFile = files.video as File;
        videoPath = await saveFile(videoFile, "videos");
      }

      // Handle other form fields
      const { title, description } = fields;

      res.status(200).json({
        message: "Files uploaded successfully",
        images: imagePaths,
        video: videoPath,
        title,
        description,
      });
    } catch (error) {
      res.status(500).json({ message: "Error saving files", error });
    }
  });
}
