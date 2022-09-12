const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { authController } = require('../../modules/auth');
const { profileController } = require('../../modules/profile');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../config');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use(authController.root, authController.router());
  app.use(profileController.root, profileController.router());

  app.use(
    '*',
    createProxyMiddleware(config.API_ENDPOINT, {
      target: config.BASE_URL,
      changeOrigin: true,
    })
  );

  return app;
};

module.exports = { createServer };
