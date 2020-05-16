const functions = require('firebase-functions');
const createUser = require('./createUser');
const requestOneTimePassword = require('./request_one_time_password');
const admin = require('firebase-admin');
const serviceAccount = require('./service_account.json');

// The Firebase Admin SDK to access the Firebase Realtime Database.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://one-time-password-eceb2.firebaseio.com',
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(
  requestOneTimePassword
);
