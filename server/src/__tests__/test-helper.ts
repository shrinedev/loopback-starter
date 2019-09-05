require('dotenv').config({ path: __dirname + '/../../../../../.env' });

import { ServerApplication } from '../application';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client
} from '@loopback/testlab';
import axios from 'axios';
import Keycloak from '../Keycloak';

export default class TestHelper {
  public app: ServerApplication;
  public client: Client;

  public async setup(): Promise<void> {
    const restConfig = givenHttpServerConfig();

    this.app = new ServerApplication({
      rest: restConfig
    });

    await this.app.boot();
    await this.app.start();
    await this.app.startAddOns();

    this.client = createRestAppClient(this.app);
  }

  public async getToken(
    email: string,
    password: string = 'Password1'
  ): Promise<string> {
    const authRes = await axios.post(
      'http://localhost:8888/auth/realms/master/protocol/openid-connect/token',
      `username=${email}&password=${password}&grant_type=password&client_id=account`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return Promise.resolve(authRes.data.access_token);
  }

  public async createUser(
    email: string,
    clientRoles: string[] = []
  ): Promise<{ id: string; token: string }> {
    const user = {
      email,
      clientRoles,
      firstName: 'First',
      lastName: 'Last',
      password: 'Password1'
    };
    const keycloak: Keycloak = new Keycloak();
    const id = await keycloak.createNewUser(user);
    const token = await this.getToken(email);
    return {
      id,
      token
    };
  }
}
