import React from 'react';
import PropTypes from 'prop-types';

const Main = ({ children }) => (
  <div>
    <header>
      <h1>Example App</h1>
    </header>
    <div>{children}</div>
  </div>
);

Main.propTypes = {
  children: PropTypes.node.isRequired
};

export default Main;
