# Library Management System

A backend REST API for managing books, members, and borrowing activities in a library.

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt
- express-validator

## Installation Steps

1. Clone the repository
   git clone https://github.com/MisbahSamann456/library-management-system.git

2. Install dependencies
   npm install

3. Create .env file
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   REFRESH_TOKEN_SECRET=your_refresh_secret

4. Run the server
   npm run dev

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port (5000) |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | JWT secret key |
| REFRESH_TOKEN_SECRET | Refresh token secret key |

## API Endpoints

### Auth
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/auth/register | Register user | Public |
| POST | /api/auth/login | Login user | Public |
| POST | /api/auth/refresh | Refresh token | Public |

### Books
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /api/books | Get all books | Auth |
| GET | /api/books/:id | Get single book | Auth |
| POST | /api/books | Add book | Librarian |
| PUT | /api/books/:id | Update book | Librarian |
| DELETE | /api/books/:id | Delete book | Librarian |
| POST | /api/books/:id/borrow | Borrow book | Member |
| POST | /api/books/:id/return | Return book | Member |

### Members
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /api/members | Get all members | Librarian |
| DELETE | /api/members/:id | Delete member | Librarian |
| GET | /api/members/me/books | My borrowed books | Member |

## Authentication Flow

1. Register → POST /api/auth/register
2. Login → POST /api/auth/login → get accessToken + refreshToken
3. Use accessToken in Authorization header: Bearer <token>
4. When accessToken expires → POST /api/auth/refresh with refreshToken

## Bonus Features

- Search: GET /api/books?search=clean
- Category Filter: GET /api/books?category=Programming
- Pagination: GET /api/books?page=1&limit=10
- Refresh Token

## Deployment URL

https://library-management-system-production-7899.up.railway.app

## Roles

- **Librarian** — manages books and members
- **Member** — views books, borrows and returns books
