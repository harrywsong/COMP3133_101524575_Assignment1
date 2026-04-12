import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

//import ApolloServer
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

//import GraphQL Schema and Resolvers
import userSchema from './schemas/UserSchema.js';
import { userResolvers } from './resolvers/UserResolver.js';
import employeeSchema from './schemas/EmployeeSchema.js';
import employeeResolvers from './resolvers/EmployeeResolver.js';

// this is because I use pi-hole and I have issues with DNS if I don't specify it
import dns from 'node:dns'; // or 'dns'
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Configure Mongoose to use new options globally
mongoose.set('returnDocument', 'after');

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();

//TODO - Add your MongoDB connection String in .env file
const connectDB = async () => {
  try {
    console.log(`Attempting to connect to DB`);

    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log(`MongoDB connected`);
      })
      .catch((err) => {
        console.log(`Error while connecting to MongoDB : `, err);
      });
  } catch (error) {
    console.log(`Unable to connect to DB : ${error.message}`);
  }
};

const startExpressServer = async () => {
  //create an instance of ApolloServer
  const apolloServer = new ApolloServer({
    typeDefs: [userSchema, employeeSchema],
    resolvers: [userResolvers, employeeResolvers],
  });

  // Start the server before applying middleware
  await apolloServer.start();

// After
app.get('/', (_req, res) => {
  res.json({ status: 'ok', graphql: '/graphql' });
});

app.use(
  '/graphql',
  cors({
    origin: ['http://localhost:4200', 'https://comp-3133-101524575-assignment1.vercel.app', /\.vercel\.app$/],
    credentials: true
  }),
  express.json(),
  expressMiddleware(apolloServer)
);

  // Only call listen() when running locally, not on Vercel
  if (process.env.VERCEL !== '1') {
    app.listen(PORT, async () => {
      console.log("---------------------------------------------------------------");
      console.log(`Access GraphQL at http://localhost:${PORT}/graphql`);
      await connectDB();
      console.log(`Press Ctrl+c to stop`);
      console.log("---------------------------------------------------------------");
    });
  } else {
    await connectDB();
  }
};

startExpressServer();

export default app;
