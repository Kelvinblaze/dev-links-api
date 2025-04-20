# Dev Links API

Dev Links API is a backend service for managing and sharing user links. It provides endpoints for user authentication, link management, and other related features.

## Features

- User authentication (Sign up, Login, Logout)
- CRUD operations for user links
- Token-based authentication (JWT)
- Environment-based configuration
- Error handling and validation

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **dotenv**: Environment variable management

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dev-links-api.git
   cd dev-links-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   JWT_EXPIRATION=token-expiration-time -- default:1h
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### **Base URL**
```
http://localhost:<PORT>/api
```

### **Authentication Endpoints**
| Method | Endpoint         | Description                  |
|--------|------------------|------------------------------|
| POST   | `/api/auth/register` | Register a new user          |
| POST   | `/api/auth/login`    | Login and get a JWT token    |

### **User Endpoints**
| Method | Endpoint             | Description                        |
|--------|----------------------|------------------------------------|
| GET    | `/api/user`          | Get the authenticated user's profile |
| PUT    | `/api/user`          | Update the authenticated user's profile |
| GET    | `/api/user/links`    | Get all links for the authenticated user |
| PUT   | `/api/user/links`    | Add new /Update links for the authenticated user |

## Example API Workflow

### **1. Register a User**
- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": { "id": "userId", "email": "user@example.com" }
  }
  ```

### **2. Login**
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "jwt-token"
  }
  ```

### **3. Get User Profile**
- **Endpoint**: `GET /api/user`
- **Headers**:
  ```
  Authorization: Bearer <jwt-token>
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "userId",
      "email": "user@example.com",
      "links": []
    }
  }
  ```

### **4. Add/Update Links**
- **Endpoint**: `PUT /api/user/links`
- **Headers**:
  ```
  Authorization: Bearer <jwt-token>
  ```
- **Request Body**:
  ```json
  {
    "platform": "GitHub",
    "url": "https://github.com/username"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Link added successfully",
    "data": { "id": "linkId", "platform": "GitHub", "url": "https://github.com/username" }
  }
  ```

## Scripts

- `npm run dev`: Start the development server with hot reloading.
- `npm start`: Start the production server.

## Folder Structure

```
dev-links-api/
├── models/         # Mongoose models
├── routes/         # API routes
├── controllers/    # Route handlers
├── middlewares/    # Custom middleware
├── utils/          # Utility functions
├── config/         # Configuration files
├── .env            # Environment variables
├── .gitignore      # Ignored files
├── package.json    # Project metadata and dependencies
└── index.js        # Entry point
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or feedback, please contact:

- **Name**: Kelvin Ossai
- **Email**: your-email@example.com
- **GitHub**: [kelvinblaze](https://github.com/kelvinblaze)