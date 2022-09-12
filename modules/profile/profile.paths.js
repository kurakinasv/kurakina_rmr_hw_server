const config = require('../../infrastructure/config');
const createPaths = require('../../utils/createPaths');

const profilePaths = createPaths({
  ROOT: `${config.API_ENDPOINT}`,
  children: {
    PROFILE: '/profile',
    KITTY: '/kitty',
    STATIC: '/images',
  },
});

module.exports = profilePaths;
