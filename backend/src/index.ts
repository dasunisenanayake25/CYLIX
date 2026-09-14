import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Enable CORS for Next.js frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json());

// 1. Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'CYLIX backend server is running'
  });
});

// 2. Fetch all projects
app.get('/api/projects', async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve projects' });
  }
});

// 3. Submit a new contact inquiry
app.post('/api/contact', async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  try {
    const inquiry = await prisma.contactInquiry.create({
      data: { name, email, message }
    });
    res.status(201).json({ success: true, data: inquiry });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to submit inquiry' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});