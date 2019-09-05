import { Client, expect } from '@loopback/testlab';
import { ServerApplication } from '../../application';
import TestHelper from '../test-helper';
import Keycloak from '../../Keycloak';

describe('UserController', () => {
  let app: ServerApplication;
  let client: Client;
  let helper: TestHelper;

  let userToken: string;
  let adminToken: string;

  before('setupApplication', async function() {
    this.timeout(10000);
    helper = new TestHelper();
    await helper.setup();
    app = helper.app;
    client = helper.client;

    const keycloak = new Keycloak();
    await keycloak.deleteAllUsers();

    ({ token: userToken } = await helper.createUser(
      'test-user@example.com',
      []
    ));
    ({ token: adminToken } = await helper.createUser('test-admin@example.com', [
      'admin'
    ]));
  });

  beforeEach(async () => {
    // Runs before each test.
  });

  after(async () => {
    const keycloak = new Keycloak();
    await keycloak.deleteAllUsers();

    await app.stop();
  });

  it('/dashboard is accessible by all users', async () => {
    await client.get('/dashboard').expect(302);

    const res1 = await client
      .get('/dashboard')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
    expect(res1.text).to.not.match(/You do not have permission to this page./);

    const res2 = await client
      .get('/dashboard')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(res2.text).to.not.match(/You do not have permission to this page./);
  });

  it('/admin/dashboard is only accessible by users with admin role', async () => {
    await client.get('/admin/dashboard').expect(302);

    const res1 = await client
      .get('/admin/dashboard')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);
    expect(res1.text).to.match(/You do not have permission to this page./);

    const res2 = await client
      .get('/admin/dashboard')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(res2.text).to.not.match(/You do not have permission to this page./);
  });
});
