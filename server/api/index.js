import app from '../server.js';
import connectDB from '../config/mongodb.js';

// Connect to the database when the module is imported
connectDB().catch(error => {
  console.error('Failed to connect to MongoDB:', error.message);
});

export default async function handler(req, res) {
  // Set CORS headers to allow all origins with *
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // For CORS preflight requests, return early with 200
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Convert the Express app to a serverless function handler
  try {
    // Pass the request and response objects to the Express app
    await new Promise((resolve, reject) => {
      const originalEnd = res.end;
      res.end = function () {
        originalEnd.apply(this, arguments);
        resolve();
      };
      
      // Call the Express app
      app(req, res);
      
      // If the response hasn't ended after a short delay, resolve anyway
      setTimeout(() => {
        if (!res.writableEnded) {
          resolve();
        }
      }, 50);
    });
  } catch (error) {
    console.error('Error in serverless function:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}