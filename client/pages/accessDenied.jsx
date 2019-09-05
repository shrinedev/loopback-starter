import React from 'react';
import Main from '../layouts/main';

const AccessDenied = () => (
  <Main>
    <h2>You do not have permission to this page.</h2>
    <a href="/logout">Log out</a>
  </Main>
);

export default AccessDenied;
