# Role-Based Music Backend API

Backend service for user authentication and music management.

## Tech Stack
Node.js, Express.js, MongoDB, JWT, Multer, ImageKit

## Features
- User registration and login
- JWT authentication using secure httpOnly cookies
- Role-based authorization (artist/user)
- Music upload pipeline using Multer and ImageKit
- Audio upload size/type validation
- MongoDB schema design using Mongoose

## API Routes

### Auth
POST /api/auth/register  
POST /api/auth/login  

### Music
POST /api/music/upload

## Architecture
MVC pattern (Routes, Controllers, Models, Services)

## Environment Variables

Create a `.env` file locally and configure these variables on Render:

```env
MONGO_URI=
JWT_SECRET=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
CORS_ORIGIN=
```

`CORS_ORIGIN` should be your frontend URL. For multiple frontend URLs, use comma-separated values.

## Render Deployment

Build command:

```bash
npm install
```

Start command:

```bash
npm start
```

Render provides `PORT` automatically. Set `NODE_ENV=production` on Render so auth cookies use production-safe settings.

## Notes

New registrations always create normal `user` accounts. Promote trusted accounts to `artist` from the database/admin workflow before they can upload music.
