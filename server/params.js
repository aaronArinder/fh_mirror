'use strict';

const formConstants = require('./constants/forms');
const formNames     = Object.values(formConstants);

module.exports = {
  paramsHook: (api) => {
    api.param('form_name', checkForms);
  }
}

/**
 * Validates the `form` param by checking it against a whitelist of form names
 *
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next function
 * @returns {Invocation} Either a sendStatus or next invocation
 *
 * @todo Better error handling on bad form param
 */
function checkForms (req, res, next) {
  if (!formNames.includes(req.params.form_name))
    return res.sendStatus(400)
  return next();
}
