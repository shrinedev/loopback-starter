import { Request, Response, RestBindings, get } from '@loopback/rest';
import { inject } from '@loopback/context';
import { intercept } from '@loopback/core';
import { protect, check, KeycloakUser } from '../interceptors';
import { AppBindings } from '../keys';

export class AdminClientController {
  constructor(
    @inject(RestBindings.Http.REQUEST)
    private req: Request,
    @inject(RestBindings.Http.RESPONSE)
    private res: Response,
    @inject(AppBindings.NEXT_SERVER)
    private nextServer: any
  ) {}

  @intercept(check())
  @get('/home')
  async home(user: KeycloakUser | null): Promise<void> {
    await this.nextServer.render(this.req, this.res, '/home', { user });
  }

  @intercept(protect())
  @get('/dashboard')
  async dashboard(user: KeycloakUser): Promise<void> {
    await this.nextServer.render(this.req, this.res, '/dashboard', { user });
  }

  @intercept(protect('admin'))
  @get('/admin/dashboard')
  async adminDashboard(user: KeycloakUser): Promise<void> {
    await this.nextServer.render(this.req, this.res, '/adminDashboard', {
      user
    });
  }

  @intercept(check())
  @get('/logout')
  async logout(): Promise<void> {}

  @intercept(check())
  @get('/test1')
  async test1(): Promise<any> {
    return { test: true };
  }
}
