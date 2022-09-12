const config = require('../../infrastructure/config');
const createPaths = require('../../utils/createPaths');

const authPaths = createPaths({
  ROOT: `${config.API_ENDPOINT}`,
  children: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    REFRESH: '/refresh',
  },
});

module.exports = authPaths;
