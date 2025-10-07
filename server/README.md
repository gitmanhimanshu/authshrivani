# Backend Deployment to Vercel

This document explains how to deploy the backend server to Vercel.

## Vercel Configuration

The [vercel.json](file:///c:/Users/prpwebs/Desktop/shri/auth-mern/server/vercel.json) file configures the deployment:

- Uses `@vercel/node` to run the Node.js server
- Routes all requests to `api/index.js` which serves as the entry point
- Includes all necessary files and directories

## Deployment Process

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project to Vercel
3. Set the following environment variables in Vercel:
   - `MONGODB_URL`: Your MongoDB connection string
   - `Jwt_SECRET`: Your JWT secret key
   - `SMTP_USER`: Your SMTP username
   - `SMTP_PASS`: Your SMTP password
   - `SENDER_EMAIL`: The email address to send from
4. Deploy the project

## Environment Variables

Make sure to configure these environment variables in your Vercel project settings:

```
MONGODB_URL=your_mongodb_connection_string
Jwt_SECRET=your_jwt_secret
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SENDER_EMAIL=your_sender_email
```

## Notes

- The server is configured to work in Vercel's serverless environment
- MongoDB connection is handled appropriately for serverless functions
- CORS is enabled for all origins