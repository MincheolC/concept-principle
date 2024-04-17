import { PrismaClient } from "@prisma/client";
import logger from "./logger";

export const prisma = new PrismaClient({
  log: [
    { level: "info", emit: "stdout" }, // 일반 정보 로깅
    { level: "warn", emit: "stdout" }, // 경고 메시지 로깅
    { level: "error", emit: "stdout" }, // 에러 메시지 로깅
  ],
});

export async function connectDB(): Promise<void> {
  try {
    await prisma.$connect();
    logger.info("🚀 Database connected successfully");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
