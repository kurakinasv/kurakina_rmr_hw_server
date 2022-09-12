const express = require('express');
const { Router } = require('express');
const profilePaths = require('./profile.paths');
const { checkSession, sessions, getSessionToken } = require('../../infrastructure/session');
const { response, StatusCodes } = require('../../infrastructure/response');
const path = require('path');
const config = require('../../infrastructure/config');

const pathToStatic = path.join(__dirname, 'images');

class ProfileController {
  root = profilePaths.ROOT;

  kittyHandler = (req, res) => {
    try {
      const isSessionExists = !!checkSession(req, res, sessions);
      if (isSessionExists) {
        const src = `${config.BASE_URL}${config.API_ENDPOINT}${profilePaths.children.STATIC}/kitty.jpeg`;
        return response(res, StatusCodes.OK, { src });
      }
    } catch (error) {
      return response(res, StatusCodes.NOT_FOUND, 'Kitty not found');
    }
  };

  profileHandler = (req, res) => {
    try {
      const isSessionExists = !!checkSession(req, res, sessions);

      if (isSessionExists) {
        const username = sessions[getSessionToken(req, res)].username;
        return response(res, StatusCodes.OK, { name: username });
      }
    } catch (error) {
      return response(res, StatusCodes.NOT_FOUND, 'Profile info not found');
    }
  };

  router = () => {
    const router = Router();

    router.use(profilePaths.children.STATIC, express.static(pathToStatic));
    router.get(profilePaths.children.PROFILE, this.profileHandler);
    router.get(profilePaths.children.KITTY, this.kittyHandler);

    return router;
  };
}

const profileController = new ProfileController();

module.exports = { profileController };
