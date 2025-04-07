
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import authRoutes from './api/auth';
import eventsRoutes from './api/events';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(process.cwd(), 'dist')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
