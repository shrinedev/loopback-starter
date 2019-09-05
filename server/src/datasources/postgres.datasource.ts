import { inject } from '@loopback/core';
import { juggler } from '@loopback/repository';
import * as config from './postgres.datasource.json';

export class PostgresDataSource extends juggler.DataSource {
  static dataSourceName = 'postgres';

  constructor(
    @inject('datasources.config.postgres', { optional: true })
    dsConfig: object = config
  ) {
    super(
      process.env.NODE_ENV === 'production' &&
        process.env.DATABASE_URL !== undefined
        ? {
            name: 'postgres',
            connector: 'postgresql',
            url: process.env.DATABASE_URL.toString(),
            idleTimeoutMillis: 20000
          }
        : dsConfig
    );
  }
}
