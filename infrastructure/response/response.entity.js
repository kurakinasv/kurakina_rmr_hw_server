const StatusCodes = {
  OK: { code: 200, msg: 'OK' },
  BAD_REQUEST: { code: 400, msg: 'Bad Request' },
  UNAUTHORIZED: { code: 401, msg: 'Unauthorized' },
  NOT_FOUND: { code: 404, msg: 'Not Found' },
  INTERNAL_SERVER_ERROR: { code: 500, msg: 'Internal Server Error' },
};

module.exports = { StatusCodes };
