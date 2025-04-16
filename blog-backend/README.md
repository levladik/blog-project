# Blog Backend API

A Node.js/TypeScript backend service for a blogging platform using Express and TypeORM with PostgreSQL.

## Features
- Blog post creation/editing
- REST API endpoints
- PostgreSQL database integration
- TypeScript support

## Prerequisites
- Node.js v18+
- PostgreSQL 14+
- npm 9+

## Installation

1. Clone the repository:
```bash
git clone https://github.com/levladik/blog-project.git
cd blog-project/blog-backend
```

2. Install dependencies:
```bash
npm install
```

## Configuration

1. Create a PostgreSQL database:
```bash
createdb blog_db
```

2. Create `.env` file (use `.env.example` if available):
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=blog_db
TYPEORM_SYNCHRONIZE=true
TYPEORM_LOGGING=true
```

## Running the Server

Development (with hot reload):
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

## API Endpoints
- `GET /users` - List all users
- `POST /users` - Create new user
- `GET /posts` - List all posts
- `POST /posts` - Create new post

## Project Structure
```
blog-backend/
├── src/
│   ├── controllers/  # Route controllers
│   ├── entity/       # TypeORM entities
│   ├── routes/       # Express routers
│   ├── repositories/ # Custom repositories
│   ├── data-source.ts # Database configuration
│   └── server.ts     # Express server
└── package.json
