import { Module } from '@nestjs/common';
import { GraphQLDateTime } from 'graphql-scalars';

@Module({
  providers: [
    {
      provide: 'DateTime',
      useValue: GraphQLDateTime,
    },
  ],
  exports: ['DateTime'],
})
export class ScalarsModule {}
