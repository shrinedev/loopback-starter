import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Main from '../layouts/main';
import { CurrentUser } from '../components';

const AdminDashboard = ({ user }) => (
  <Main>
    <Head>
      <title>Admin Dashboard</title>
    </Head>
    <h2>Admin Dashboard</h2>
    <CurrentUser user={user} />
  </Main>
);

AdminDashboard.getInitialProps = ({ query: { user } }) => ({ user });

AdminDashboard.propTypes = {
  user: PropTypes.object
};

AdminDashboard.defaultProps = {
  user: null
};

export default AdminDashboard;
