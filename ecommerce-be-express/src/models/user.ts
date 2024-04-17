import { prisma } from "../utils/db";

export async function getUserById(userId: number) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export async function createUser(email: string, password: string) {
  return await prisma.user.create({
    data: {
      email,
      password,
    },
  });
}

export async function updateUser(userId: number, email?: string, password?: string) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email,
      password,
    },
  });
}

export default {
  getUserById,
  createUser,
  updateUser,
};
