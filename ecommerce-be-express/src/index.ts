// src/app.ts
import { createApolloServer } from "./graphql/app";
import { expressMiddleware } from "@apollo/server/express4";
import app from "./rest/app";

async function startServer() {
  const apolloServer = createApolloServer();
  await apolloServer.start();

  app.use("/graphql", expressMiddleware(apolloServer));

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();
