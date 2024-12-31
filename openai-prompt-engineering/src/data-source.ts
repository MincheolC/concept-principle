import 'dotenv/config';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false, // 마이그레이션을 사용하므로 false로 설정
  logging: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // 엔티티 추가
  migrations: ['migrations/**/*.ts'],
  subscribers: [],
  namingStrategy: new SnakeNamingStrategy(),
  cache: false,
});
