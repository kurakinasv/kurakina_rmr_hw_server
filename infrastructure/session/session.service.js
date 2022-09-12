const config = require('../config');
const { response, StatusCodes } = require('../response');

const removeSessionToken = (res) =>
  res.cookie(config.AUTH_COOKIE_NAME, '', { expires: new Date() });

const getSessionToken = (req, res) => {
  if (!req.cookies) return response(res, StatusCodes.UNAUTHORIZED);

  const sessionToken = req.cookies[config.AUTH_COOKIE_NAME];
  return sessionToken ? sessionToken : response(res, StatusCodes.UNAUTHORIZED);
};

const checkSession = (req, res, sessions) => {
  const sessionToken = getSessionToken(req, res);

  userSession = sessions[sessionToken];
  if (!userSession) {
    removeSessionToken(res);
    return response(res, StatusCodes.UNAUTHORIZED);
  }

  if (userSession.isExpired()) {
    delete sessions[sessionToken];
    return response(res, StatusCodes.UNAUTHORIZED);
  }

  return sessionToken;
};

module.exports = {
  checkSession,
  getSessionToken,
  removeSessionToken,
};
