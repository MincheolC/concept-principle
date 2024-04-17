import { prisma } from "../../utils/db";

function convertId(id: string) {
  const numberId = parseInt(id, 10);
  if (isNaN(numberId)) {
    throw new Error("Invalid user ID format. ID must be a number.");
  }
  return numberId;
}

export const userResolvers = {
  Query: {
    getUserById: async (_: any, args: { id: string }) => {
      const userId = convertId(args.id);
      return await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    },
  },

  Mutation: {
    createUser: async (_: any, args: { email: string; password: string }) => {
      return await prisma.user.create({
        data: {
          email: args.email,
          password: args.password,
        },
      });
    },

    updateUser: async (_: any, args: { id: string; email?: string; password?: string }) => {
      const userId = convertId(args.id);
      return await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          email: args.email,
          password: args.password,
        },
      });
    },
  },
};
