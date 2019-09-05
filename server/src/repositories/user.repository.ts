import { DefaultCrudRepository } from '@loopback/repository';
import { User } from '../models';
import { PostgresDataSource } from '../datasources';
import { inject } from '@loopback/core';
import RepositoryHelper from './RepositoryHelper';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {
  private helper: RepositoryHelper;

  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    super(User, dataSource);

    this.helper = new RepositoryHelper(this.dataSource);
  }
}
