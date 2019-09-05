import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '.';

const CurrentUser = ({ user }) => (
  <div>
    {user ? (
      <Card>
        <h4>Current user:</h4>
        <p>{`ID: ${user.id}`}</p>
        <p>{`Name: ${user.name}`}</p>
        <p>{`Email: ${user.email}`}</p>
        <p>{`Roles: ${JSON.stringify(user.roles)}`}</p>
        <a href="/logout">Log out</a>
      </Card>
    ) : (
      <p>No user currently signed in.</p>
    )}
  </div>
);

CurrentUser.getInitialProps = ({ query: { user } }) => ({ user });

CurrentUser.propTypes = {
  user: PropTypes.object
};

CurrentUser.defaultProps = {
  user: null
};

export { CurrentUser };
