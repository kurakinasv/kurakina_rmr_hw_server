const validateEmail = (email) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
};

const validatePassword = (password) => {
  return /^[A-Z0-9]+$/i.test(password) && /^[A-Z0-9]{4,}$/i.test(password);
};

const validatePhone = (phone) => {
  return /^\+79[0-9]{2}[0-9]{7}$/.test(phone) || /^\+976[0-9]{10}$/.test(phone);
};

module.exports = { validateEmail, validatePassword, validatePhone };
