
import http from 'http';
import path from 'path';
import fs from 'fs';
import url from 'url';
import { handleAuthRoutes } from './api/auth';
import { handleEventRoutes } from './api/events';

const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url || '/', true);
  const pathname = parsedUrl.pathname || '/';
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Parse JSON body
  let body = '';
  if (req.method !== 'GET') {
    try {
      await new Promise((resolve, reject) => {
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', resolve);
        req.on('error', reject);
      });
      
      try {
        req.body = JSON.parse(body);
      } catch (e) {
        req.body = {};
      }
    } catch (error) {
      console.error('Error parsing request body:', error);
    }
  }

  // API Routes
  if (pathname.startsWith('/api/auth')) {
    return handleAuthRoutes(req, res);
  }
  
  if (pathname.startsWith('/api/events')) {
    return handleEventRoutes(req, res);
  }

  // Serve static files from dist directory
  const distPath = path.join(process.cwd(), 'dist');
  try {
    if (pathname === '/') {
      // Serve index.html for root path
      const indexPath = path.join(distPath, 'index.html');
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(indexContent);
      return;
    }

    // Try to serve the requested file
    const filePath = path.join(distPath, pathname);
    
    // Check if file exists
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      const contentType = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
      }[ext] || 'text/plain';
      
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
      return;
    }
    
    // Fallback to index.html for SPA routing
    const indexPath = path.join(distPath, 'index.html');
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(indexContent);
  } catch (error) {
    console.error('Error serving file:', error);
    res.writeHead(500);
    res.end('Server error');
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
