import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ScalarsModule } from './common/scalars/scalars.module';
import { APP_FILTER } from '@nestjs/core';
import { GqlExceptionFilter } from './common/filters/gql-exception/gql-exception.filter';
import { PostLoaderModule } from './loaders/post-loader/post-loader.module';
import { PostLoaderService } from './loaders/post-loader/post-loader.service';
import { PostGptModule } from './post-gpt/post-gpt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // 모든 엔티티 파일을 자동으로 로드
        synchronize: configService.get<string>('NODE_ENV') !== 'production', // 개발 환경에서만 사용
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [PostLoaderModule],
      useFactory: async (postLoader: PostLoaderService) => ({
        debug: process.env.NODE_ENV !== 'production',
        playground: process.env.NODE_ENV !== 'production',
        typePaths: ['./**/*.graphql'],
        formatError: (error) => {
          const graphQLFormattedError = {
            message: error.message,
            locations: error.locations,
            path: error.path,
            extensions: {
              code: error.extensions.code,
            },
          };
          return graphQLFormattedError;
        },
        context: () => ({
          loaders: {
            postLoader,
          },
        }),
      }),
      inject: [PostLoaderService],
    }),
    UserModule,
    PostModule,
    ScalarsModule,
    PostGptModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: GqlExceptionFilter },
  ],
})
export class AppModule {}
