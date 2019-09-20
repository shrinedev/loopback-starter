import { BindingKey } from '@loopback/core';
import Keycloak from 'keycloak-connect';
import { KeycloakUser } from './interceptors/types';

export namespace AppBindings {
  /**
   * Next server should be injectable into controllers for rendering react pages.
   */
  export const NEXT_SERVER = BindingKey.create('app.next.server');
  export const KEYCLOAK = BindingKey.create<Keycloak>('app.keycloak');
  export const KEYCLOAK_USER = BindingKey.create<KeycloakUser | null>(
    'app.keycloak.user'
  );
}
