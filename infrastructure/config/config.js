const DEFAULT_PORT = 8080;

const config = {
  PORT: process.env.PORT || DEFAULT_PORT,

  AUTH_COOKIE_NAME: 'auth-token',

  BASE_URL: 'https://get-cat-app.netlify.app',
  API_ENDPOINT: '/api/v1',
};

module.exports = config;
