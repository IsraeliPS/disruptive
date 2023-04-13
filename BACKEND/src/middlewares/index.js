const { validateImage, validateText } = require('./validateFiles');

const validatePass = require('./validatePass');
const auth = require('./auth');
const AdminRole = require('./esAdminRole');
const { esAdminRole, tieneRole } = AdminRole;

module.exports = {
  validateImage,
  validateText,
  auth,
  esAdminRole,
  tieneRole,
  validatePass,
};
