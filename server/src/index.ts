import {createServer} from 'http';
import express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const startServer = async () => {
  const app = express();
  const httpServer = createServer(app);

  const typeDefs = gql`
    type Query {
      books: [Book]
    }

    type Book {
      id: ID!
      title: String!
      author: String!
      year: Int!
      description: String
    }
  `;

  // noinspection JSUnusedGlobalSymbols
  const resolvers = {
    Query: {
      books: () => {
        return prisma.book.findMany();
      },
    },
  };

  const apolloServer = new ApolloServer({typeDefs, resolvers, introspection: true});
  await apolloServer.start();
  apolloServer.applyMiddleware({app, path: '/api'});

  httpServer.listen({port: process.env.PORT || 4000}, () => {
    console.log(`Server listening on localhost:4000${apolloServer.graphqlPath}`);
  });
};

startServer().then();