const { authToken, accountSid } = require('./env');

exports.twilio = require('twilio')(accountSid, authToken);
