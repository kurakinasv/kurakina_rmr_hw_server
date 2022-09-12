const { Router } = require('express');
const authPaths = require('./auth.paths');
const { validateEmail, validatePassword, validatePhone } = require('./auth.validator');
const uuid = require('uuid');
const users = require('./assets/users.json');
const {
  Session,
  sessions,
  checkSession,
  getSessionToken,
  removeSessionToken,
} = require('../../infrastructure/session');
const config = require('../../infrastructure/config');
const { response, StatusCodes } = require('../../infrastructure/response');

class AuthController {
  root = authPaths.ROOT;

  setAuthCookie = (res, name) => {
    const sessionToken = uuid.v4();

    const now = new Date();
    const expiryTime = 24 * 60 * 60 * 1000;
    const expiresAt = new Date(+now + expiryTime);

    const session = new Session(name, expiresAt);
    sessions[sessionToken] = session;

    res.cookie(config.AUTH_COOKIE_NAME, sessionToken, { expires: expiresAt });
  };

  validateData = (req, res) => {
    const { email, password, phone } = req.body;

    if (!req || !validateEmail(email) || !validatePassword(password) || !validatePhone(phone)) {
      return response(res, StatusCodes.BAD_REQUEST, 'Incorrect form data');
    }
  };

  login = (req, res) => {
    try {
      const { email, password, phone } = req.body;

      this.validateData(req, res);

      if (!email || !phone) return response(res, StatusCodes.UNAUTHORIZED, 'No such user');

      const currentUser = users.find((user) => user.email === email);

      const expectedPassword = currentUser.password;
      const expectedPhone = currentUser.phone;
      if (expectedPassword !== password || expectedPhone !== phone) {
        return response(res, StatusCodes.UNAUTHORIZED, 'No such user');
      }

      this.setAuthCookie(res, currentUser.name);

      const responseData = { userId: currentUser.id, email: currentUser.email };
      return response(res, StatusCodes.OK, responseData);
    } catch (error) {
      return response(res, StatusCodes.BAD_REQUEST);
    }
  };

  logout = (req, res) => {
    try {
      const sessionToken = getSessionToken(req, res);
      delete sessions[sessionToken];
      removeSessionToken(res);

      return response(res, StatusCodes.OK, 'Successfully logged out');
    } catch (error) {
      return response(res, StatusCodes.BAD_REQUEST);
    }
  };

  refresh = (req, res) => {
    try {
      const sessionToken = checkSession(req, res, sessions);
      if (sessionToken) {
        const userSession = sessions[sessionToken];

        this.setAuthCookie(res, userSession.username);
        delete sessions[sessionToken];

        return response(res, StatusCodes.OK, 'Token has been refreshed');
      }
    } catch (error) {
      return response(res, StatusCodes.BAD_REQUEST);
    }
  };

  router = () => {
    const router = Router();

    router.post(authPaths.children.LOGIN, this.login);
    router.post(authPaths.children.LOGOUT, this.logout);
    router.post(authPaths.children.REFRESH, this.refresh);

    return router;
  };
}

const authController = new AuthController();

module.exports = { authController };
