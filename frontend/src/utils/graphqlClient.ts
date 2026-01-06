import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
  "http://localhost:8000/graphql",
  {
    headers: {
      authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }
);
