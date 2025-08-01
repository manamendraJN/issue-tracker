import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import issueRoutes from './routes/issueRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';


dotenv.config();
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', issueRoutes);
app.use('/api/auth', authRoutes);

// Error Handling Middleware
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Issue Tracker Backend');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});