// src/index.js
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';


// const app: Express = express();
// const port = process.env.PORT || 3000;

// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });



// const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: axios } = require('axios');

const { USERS } = require('../user');
const { TODOS } = require('../todo');
dotenv.config();

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
        type User {
            id: ID!
            name: String!
            username: String!
            email: String!
            phone: String!
            website: String!
        }

        type Todo {
            id: ID!
            title: String!
            completed: Boolean
            user: User
        }

        type Query {
            getTodos: [Todo]
            getAllUsers: [User]
            getUser(id: ID!): User
        }

    `,
    resolvers: {
      Todo: {
        user: (todo: any) => USERS.find((e: any) => e.id === todo.id),
      },
      Query: {
        getTodos: () => TODOS,
        getAllUsers: () => USERS,
        getUser: async (parent: any, { id }: any) => USERS.find((e: any) => e.id === id),
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use('/graphql', expressMiddleware(server));

  app.listen(process.env.PORT, () => console.log(`Serevr Started at PORT ${process.env.PORT}`));
}

startServer();
