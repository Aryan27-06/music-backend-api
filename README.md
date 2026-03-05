# Role-Based Music Backend API

Backend service for user authentication and music management.

## Tech Stack
Node.js, Express.js, MongoDB, JWT, Multer

## Features
- User registration and login
- JWT authentication using httpOnly cookies
- Role-based authorization (artist/user)
- Music upload pipeline using Multer
- MongoDB schema design using Mongoose

## API Routes

### Auth
POST /api/auth/register  
POST /api/auth/login  

### Music
POST /api/music/upload

## Architecture
MVC pattern (Routes, Controllers, Models, Services)