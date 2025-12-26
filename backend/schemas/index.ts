import { userService } from "../services/userService.js";

export const schema = `
  type User {
    id: ID
    email: String
    created_at: String
    updated_at: String
  }

  type Query {
    hello: String
    users: [User]
    user(id: ID!): User
  }
`;

export const resolvers = {
  Query: {
    hello: () => "Hello from Mercurius GraphQL!",
    users: async () => {
      const { data, error } = await userService.getAllUser();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    user: async (_: any, { id }: { id: string }) => {
      const { data, error } = await userService.getUserById(id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  },
};
