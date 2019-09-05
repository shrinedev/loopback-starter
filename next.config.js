/* eslint-disable no-param-reassign */
// Only environment variables listed here will be exposed to the client.
module.exports = {
  env: {
    API_SERVER_URL: process.env.API_SERVER_URL,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY
  },
  webpack: config => {
    // Use joi-browser in client app and joi on the server
    config.resolve.alias.joi = 'joi-browser';
    return config;
  }
};
