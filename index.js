require('dotenv').config();
const application = require('./server/dist/server');

module.exports = application;

if (require.main === module) {
  // Run the application
  application.main().catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
