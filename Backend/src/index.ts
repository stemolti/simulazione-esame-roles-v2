// api/index.ts  (o qualunque sia la tua lambda)
import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

let cachedConn: typeof mongoose | null = null;

async function dbConnect() {
  if (cachedConn) return cachedConn;            // ➜ hot-start: riusa
  cachedConn = await mongoose.connect(process.env.MONGO_URI as string, {
    serverSelectionTimeoutMS: 30000,            // opzionale: +timeout
  });
  console.log('🟢 MongoDB connected');
  return cachedConn;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await dbConnect();       // ➜ garantisce DB pronto
  return app(req, res);    // delega a Express
}
