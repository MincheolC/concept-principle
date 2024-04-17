import { convertToNumberId } from "../../utils/converter";
import { getUserById, createUser, updateUser } from "../../models/user";

export const userResolvers = {
  Query: {
    getUserById: async (_: any, args: { id: string }) => {
      const userId = convertToNumberId(args.id);
      return await getUserById(userId);
    },
  },

  Mutation: {
    createUser: async (_: any, args: { email: string; password: string }) => {
      return await createUser(args.email, args.password);
    },

    updateUser: async (_: any, args: { id: string; email?: string; password?: string }) => {
      const userId = convertToNumberId(args.id);
      return await updateUser(userId, args.email, args.password);
    },
  },
};
