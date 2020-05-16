const { authToken, accountSid } = require('./env');

exports.client = require('twilio')(accountSid, authToken, {
  lazyLoading: true,
});
