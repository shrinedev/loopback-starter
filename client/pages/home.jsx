import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Main from '../layouts/main';

import { Card, CurrentUser } from '../components';

const Home = ({ user }) => (
  <Main>
    <Head>
      <title>Home</title>
    </Head>
    <h2>Home</h2>
    <Card>
      <a href="/dashboard">Go to Dashboard</a>
      <p>Log in with: test1/Password1 OR admin/Password1</p>
    </Card>
    <Card>
      <a href="/admin/dashboard">Go to Admin Dashboard</a>
      <p>Log in with: admin/Password1</p>
    </Card>
    <CurrentUser user={user} />
  </Main>
);

Home.getInitialProps = ({ query: { user } }) => ({ user });

Home.propTypes = {
  user: PropTypes.object
};

Home.defaultProps = {
  user: null
};

export default Home;
