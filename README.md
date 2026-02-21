# COMP3133 Assignment 1

**Student**: Woohyuk Song  
**Student ID**: 101524575  
**Course**: COMP 3133 - Full Stack Development II

## Technologies
- Node.js & Express v5
- Apollo Server (GraphQL)
- MongoDB & Mongoose
- bcrypt (password encryption)

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with MongoDB connection (copy env.example):
```env
PORT=8081
MONGO_URI = `mongodb+srv://harrywsong:test@cluster0.xxgvpyq.mongodb.net/`
```

3. Start the server:
```bash
npm start
```

4. Access GraphQL at: `http://localhost:4000/graphql`

## Sample User for Testing

**Username**: testuser  
**Email**: test@example.com  
**Password**: password123

Use credentials to test login functionality.