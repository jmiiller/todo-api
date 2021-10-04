import { Express } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import fs from 'fs';
import path from 'path';
import resolvers from '../graphql/resolvers/resolvers';

export default async function applyApolloMiddleware(app: Express) {
  const buffer = fs.readFileSync(
    path.join(__dirname, '../graphql/schema.graphql'),
    'utf8'
  );
  const typeDefs = gql`
    ${buffer}
  `;
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => req,
  });
  await server.start();

  server.applyMiddleware({ app });
}
