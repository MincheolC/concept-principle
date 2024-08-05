import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-errors';

@Catch()
export class GqlExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    if (gqlHost.getType() === 'http') {
      throw new Error(exception.message);
    } else {
      if (exception instanceof HttpException) {
        const status = exception.getStatus();
        const response = exception.getResponse();
        const message =
          typeof response === 'object' ? (response as any).message : response;

        throw new ApolloError(message, status.toString(), {
          timestamp: new Date().toISOString(),
          path: gqlHost.getInfo().path,
        });
      } else {
        throw new ApolloError(exception.message, 'INTERNAL_SERVER_ERROR');
      }
    }
  }
}
