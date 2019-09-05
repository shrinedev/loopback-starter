import { Entity, model, property } from '@loopback/repository';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true
    }
  })
  keycloakId: string;

  @property({
    type: 'date',
    defaultFn: 'now'
  })
  createdAt: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
