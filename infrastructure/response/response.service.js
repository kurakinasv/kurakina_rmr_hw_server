const { StatusCodes } = require('./response.entity');

const response = (res, status = StatusCodes.OK, data = '') => {
  const responseData = data || status.msg;

  if (typeof data === 'string') {
    res.status(status.code).json({ message: responseData }).end();
  } else {
    res.status(status.code).json(responseData).end();
  }

  return null;
};

module.exports = { response };
