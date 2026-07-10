# Security Awareness Platform

A comprehensive security awareness training platform for organizations to educate employees about cybersecurity best practices.

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Hook Form + Zod
- Axios
- TanStack Query
- Framer Motion
- Zustand

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt
- Multer
- Cloudinary (optional)

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd security-awareness-platform
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd client
npm install
```

4. Set up environment variables
```bash
# Server
cp server/.env.example server/.env
# Edit server/.env with your values

# Client
cp client/.env.example client/.env.local
# Edit client/.env.local with your values
```

5. Start development servers
```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm run dev
```

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Courses
- GET /api/courses
- GET /api/courses/:id
- POST /api/courses (Admin)
- PUT /api/courses/:id (Admin)
- DELETE /api/courses/:id (Admin)

### Lessons
- POST /api/lessons (Admin)
- PUT /api/lessons/:id (Admin)
- DELETE /api/lessons/:id (Admin)

### Quiz
- POST /api/quiz (Admin)
- GET /api/quiz/:courseId
- POST /api/quiz/submit

### Progress
- GET /api/progress
- POST /api/progress

### Users
- GET /api/users (Admin)
- PUT /api/users/:id (Admin)
- DELETE /api/users/:id (Admin)

## Features

- User authentication (register/login)
- Role-based access (Admin/Employee)
- Course management
- Lesson tracking
- Quiz system
- Progress tracking
- Certificate generation
- Admin dashboard with analytics

## License

MIT
