import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 3307,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false, // 마이그레이션을 사용하므로 false로 설정
  logging: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // 엔티티 추가
  migrations: ['src/migrations/**/*.ts'],
  subscribers: [],
});
