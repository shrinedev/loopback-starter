# Example App

Built with Loopback 4, NextJS, Keycloak, Postgres, and more.

## Features included:

- NextJS integration with zero-config SSR
- End-to-end API testing
- User authentication (cookie or token based)
- Protect endpoints based on user roles with Loopback interceptors
- Customizable email templates for email verification, forgot password, etc.
- Dockerized DB and Auth server for local development
- Joi validation schemas shared between server and client code
- Instant deploy with Heroku
- Environment variable support on server and client
- Provides endpoint for uploading files to AWS S3 storage.

## Starting the Keycloak Server and Postgres Database

```console
docker-compose up
```

To stop all running containers, run:

```console
docker-compose down
```

### Setup Keycloak

Once the Keycloak server is up and running, go to http://localhost:8888 and log in with username: admin and password: Password1.

#### Setup Keycloak roles

As an example, the first role 'admin' should already exist as it has been exported into keycloak/config/master-realm.json. You can see this role in the Keycloak admin dashboard by clicking `Clients` in the lefthand toolbar. Click on the client with Client ID `Account`, then click `Roles` in the top tabs. From this page, you will see the existing `admin` role and you can create another by clicking the `Add Role` button in the top right corner.

#### Setup Keycloak users

First, you are going to add the `admin` role mentioned above to the single existing account with username `admin`. Click `Users` in the lefthand toolbar, then `View all users`. Click the ID of the only user available, then click `Role Mappings` in the top tabs. We are concerned with `Client Roles` only, so in the dropdown at the bottom of the page, select `Account`. From here you should be able to select the available role `admin` and click on `Add selected`.

We also want to create a user without the `admin` role. Click `Users` in the lefthand toolbar, then `Add user` in the top right corner. Fill in each field, but make sure to use username `test1` for simplicity. Once the user is created, click `Credentials` in the top tabs, and input password as `Password1` (this could be anything, just being consistent for demo purposes). Make sure `Temporary` is set to `Off` so there will be no need to update the password later.

At this point, all users should be set up properly.

## Starting the Loopback Server

Create or download development environment file. See .env.example as reference.

Rename the file to .env and make sure it is located in top level of project directory.

Get all dependencies:

```console
npm install
```

To start in development mode (live reloads on code change):

```console
npm run dev
```

Go to http://localhost:8080 to see the home screen with examples of various forms of protected routes.

## Using VSCode

Install the following extensions:

- [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Development workflow

With the above extensions installed, eslint will highlight programming and style errors while you write code. When you save a file, it will be automatically formatted using prettier.

## Run Database Migrations

```console
npm run migrate
```

Each Model with a corresponding Repository will have a table created in the Postgres DB.

## Running tests

Running the test suite requires postgres DB and keycloak server to be running. Each test will reset the database and insert new data, you will likely need to re-seed after running tests.

Make sure you have mocha installed globally:

```console
npm install -g mocha
```

To run all tests:

```console
npm run test
```

To run a single test file:

```console
npm run test -- --grep "TestName"
```

Where TestName is the string passed to `describe` in the test.

## Deploying

First make you sure you have the correct git remotes:

```console
git remote add exampleapp https://git.heroku.com/exampleapp.git
git remote add exampleapp-auth https://git.heroku.com/exampleapp-auth.git
```

Accessing those remotes will require running `heroku login` after installing the heroku CLI tools.

### Deploying Keycloak Server

```console
git subtree push --prefix keycloak exampleapp-auth master
```

If you previously deployed from a branch other than master, and need to force push a specific branch:

```console
git push exampleapp-auth `git subtree split --prefix keycloak <specific-branch>`:master --force
```

If you are deploying for the first time, make sure to update the following:

- Change admin accounts password
- Update the client settings for 'Valid Redirect URIs' and 'Base URL' to match the domain published to.
  - Examples:
    - Valid Redirect URIs:
      - https://exampleapp.herokuapp.com/*
      - http://exampleapp.herokuapp.com/*
    - Base URL:
      - https://exampleapp.herokuapp.com/

### Deploying Server

Make sure that the heroku environment variables are up to date:

```
heroku config:set NODE_ENV=production -a exampleapp
heroku config:set PGSSLMODE=require -a exampleapp
...
```

Be sure to run all API tests first by running:

```console
npm run test
```

Push from local master branch to the exampleapp remote:

```console
git push exampleapp master
```

If you need to run migrations, run:

```console
heroku run -a exampleapp npm run migrate
```

If you get out of memory errors, try skipping the build step:

```console
heroku run -a exampleapp node ./server/dist/server/src/migrate
```
