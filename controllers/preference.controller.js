const {getPreferences} = require('../services/preference.service');

async function getUserPreferences(req, res) {
  try {
    console.log(req.email);
    const {message, status, preferences} = await getPreferences(req.email);
    res.status(status).json({
      message,
      preferences,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUserPreferences,
};
