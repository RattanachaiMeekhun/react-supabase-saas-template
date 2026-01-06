import { authService } from "../services/authService.js";
import { userService } from "../services/userService.js";

export const schema = `
  type User {
    id: ID
    email: String
    created_at: String
    updated_at: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    hello: String
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    signup(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
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
  Mutation: {
    signup: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      const { data, error } = await authService.signup(email, password);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      const { data, error } = await authService.login(email, password);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  },
};
