import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Main from '../layouts/main';
import { CurrentUser } from '../components';

const Dashboard = ({ user }) => (
  <Main>
    <Head>
      <title>Dashboard</title>
    </Head>
    <h2>Dashboard</h2>
    <CurrentUser user={user} />
  </Main>
);

Dashboard.getInitialProps = ({ query: { user } }) => ({ user });

Dashboard.propTypes = {
  user: PropTypes.object
};

Dashboard.defaultProps = {
  user: null
};

export default Dashboard;
