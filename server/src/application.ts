import express, { RequestHandler } from 'express';
import nextApp from 'next';
import Keycloak from 'keycloak-connect';
import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication, Request, Response } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import { CookieSessionStore } from './CookieSessionStore';

import { AppBindings } from './keys';
const IS_DEV_ENVIRONMENT = process.env.NODE_ENV === 'development';
const { PORT } = process.env;

const keycloakConfig = {
  realm: 'master',
  'auth-server-url': process.env.AUTH_SERVER_URL,
  'ssl-required': 'external',
  resource: 'account',
  'use-resource-role-mappings': true,
  'confidential-port': 0
};

const enforceHttps = (req: Request, res: Response, next: any) => {
  // The 'x-forwarded-proto' check is for Heroku
  if (
    !req.secure &&
    req.get('x-forwarded-proto') !== 'https' &&
    !IS_DEV_ENVIRONMENT
  ) {
    return res.redirect(`https://${req.get('host')}${req.url}`);
  }
  next();
};

export class ServerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication))
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer'
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true
      }
    };
  }

  startAddOns = async (): Promise<undefined> => {
    const expressServer = express();
    const nextServer = nextApp({ dev: IS_DEV_ENVIRONMENT, dir: 'client' });
    await nextServer.prepare();

    const keycloak = new Keycloak({}, keycloakConfig);

    // KeycloakConnect's built-in Session Store is not compatible with a fully
    // Cookie-based session. Additionally, the KeycloakConnect Constructor takes any stores
    // provided and wraps them in another store. We avoid this by assigning to the stores directly.
    // @ts-ignore
    keycloak.stores.push(new CookieSessionStore());

    expressServer.use(enforceHttps);

    // Set up default page
    expressServer.get('/', (_, res) => {
      res.redirect('/home');
    });

    // Handle all _next routes by the next server
    const handle = nextServer.getRequestHandler();
    expressServer.get('/_next/*', (handle as unknown) as RequestHandler);
    expressServer.get('/static/*', (handle as unknown) as RequestHandler);

    this.bind(AppBindings.NEXT_SERVER).to(nextServer);
    this.bind(AppBindings.KEYCLOAK).to(keycloak);

    // Render custom access denied page.
    Keycloak.prototype.accessDenied = function(request, response) {
      nextServer.render(request, response, '/accessDenied', {});
    };

    expressServer.use('/', this.requestHandler);

    console.log('Starting the server...');
    expressServer.listen(PORT, () => {
      console.log('... Server listening on port: ', PORT);
    });
    return;
  };
}
