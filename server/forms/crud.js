'use strict';

const { _query } = require('../modules/db');

module.exports = {
  formHook: (api) => {
    api.get('/forms/:form_name', getForms)
  }
}

async function getForms (req, res) {
  try {
    // there's a param check in the params.js file for making sure that the
    // form_name is in the whitelisted form names (i.e., constants), but this
    // still freaks me out. Pretty effing dangerous! ABSOLUTELY need to double-check
    // that the param is being handled properly here; we shouldn't rely on the params.js
    // file alone, who knows if it'll get changed by accident: we need tests to make sure
    // it doesn't!

    const form = await _query(`select * from ${req.params.form_name}`)
    return res.status(200).send(form);
  } catch (err) {
    console.log('err from getForms in GET /forms', err);
  }
}
