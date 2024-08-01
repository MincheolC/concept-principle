import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '!2qwaszx',
  database: 'dev',
  synchronize: false, // 마이그레이션을 사용하므로 false로 설정
  logging: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // 엔티티 추가
  migrations: ['src/migrations/**/*.ts'],
  subscribers: [],
});
