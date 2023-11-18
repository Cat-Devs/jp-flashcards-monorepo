import dotenv from 'dotenv';
dotenv.config();

export const BUCKET_NAME = process.env.BUCKET_NAME as string;
export const BUCKET_OFFLINE = process.env.BUCKET_OFFLINE as string;
export const TABLE_NAME = process.env.TABLE_NAME as string;
export const TABLE_OFFLINE = process.env.TABLE_OFFLINE as string;
export const AWS_REGION = process.env.AWS_REGION as string;
export const DEBUG = process.env.DEBUG as string;
