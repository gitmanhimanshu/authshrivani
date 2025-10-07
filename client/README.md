# Frontend Deployment to Vercel

This document explains how to deploy the frontend React application to Vercel.

## Vercel Configuration

The [vercel.json](file:///c:/Users/prpwebs/Desktop/shri/auth-mern/client/vercel.json) file configures the deployment:

- Uses rewrites to direct all routes to index.html for client-side routing (React Router)
- This ensures that navigation works correctly in a single-page application

## Environment Variables

The application uses the following environment variables:

- `VITE_BACKEND_URL`: The URL of your backend API

To set this for production, go to your Vercel project settings > Environment Variables and add:

```
VITE_BACKEND_URL=https://your-backend-url.vercel.app
```

Replace `https://your-backend-url.vercel.app` with the actual URL of your deployed backend.

## Deployment Process

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project to Vercel
3. Set the environment variables in Vercel project settings
4. Deploy the project

## Development Configuration

The [vite.config.js](file:///c:/Users/prpwebs/Desktop/shri/auth-mern/client/vite.config.js) file includes:

- CORS configuration allowing all origins
- Server configuration for local development
- Build settings for production deployment

## Notes

- The application uses React Router, so the vercel.json rewrites all routes to index.html
- Make sure to update the VITE_BACKEND_URL environment variable with your actual backend URL after deploying the backend