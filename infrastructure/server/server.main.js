const { createServer } = require('./server.service');
const config = require('../config');

const startServer = () => {
  const server = createServer();

  server.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
  });
};

module.exports = startServer;
