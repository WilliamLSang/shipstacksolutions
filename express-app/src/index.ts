import express from 'express';  
import cors from 'cors';  
import path from 'path';
import dotenv from 'dotenv';
import apiRouter from './routes/api';

// Load environment variables
dotenv.config();
  
const app = express();  
const PORT = process.env.PORT || 3000;  
  
app.use(cors());  
app.use(express.json());  

// Serve static files from ../html
const staticPath = path.join(__dirname, '..', '..', 'html');
app.use(express.static(staticPath));

// API routes
app.use('/api', apiRouter);
  
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
 
