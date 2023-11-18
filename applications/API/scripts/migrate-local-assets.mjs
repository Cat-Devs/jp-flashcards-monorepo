import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const bucketName = process.env.BUCKET_NAME;
const ASSETS_FOLDER = '../_assets';

const s3Client = new S3Client({
  endpoint: 'http://localhost:4569', // Local S3 endpoint
  forcePathStyle: true,
  credentials: {
    accessKeyId: 'S3RVER',
    secretAccessKey: 'S3RVER',
  },
});

const uploadFiles = async () => {
  try {
    const files = fs.readdirSync(ASSETS_FOLDER);

    for (const file of files) {
      const localFilePath = path.join(ASSETS_FOLDER, file);
      const fileContent = fs.readFileSync(localFilePath);
      const params = {
        Bucket: bucketName,
        Key: file, // Use the same file name for the object key
        Body: fileContent,
      };

      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      console.log(`Uploaded: ${file}`);
    }
  } catch (err) {
    console.error('Error uploading files:', err);
  }
};

uploadFiles();
