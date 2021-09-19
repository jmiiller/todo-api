import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import resolvers from '../graphql/resolvers';
import typeDefs from '../graphql/schema';

export default async function applyApolloMiddleware(app: Express) {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app });
}
