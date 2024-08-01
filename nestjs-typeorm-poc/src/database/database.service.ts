import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  private dataSources: Map<string, DataSource> = new Map();

  constructor(private readonly configService: ConfigService) {}

  async getDataSource(connectionName: string): Promise<DataSource> {
    if (!this.dataSources.has(connectionName)) {
      const dataSource = new DataSource({
        type: 'mysql',
        host: this.configService.get<string>('MYSQL_HOST'),
        port: this.configService.get<number>('MYSQL_PORT'),
        username: this.configService.get<string>('MYSQL_USERNAME'),
        password: this.configService.get<string>('MYSQL_PASSWORD'),
        database: connectionName,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV !== 'production',
      });
      await dataSource.initialize();
      this.dataSources.set(connectionName, dataSource);
    }
    return this.dataSources.get(connectionName);
  }
}
