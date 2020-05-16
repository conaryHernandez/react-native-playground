const admin = require('firebase-admin');
const twilio = require('./twilio');

const requestOneTimePassword = (req, res) => {
  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone number' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g);

  admin
    .auth()
    .getUser({
      uid: phone,
    })
    .then((user) => {
      const code = Math.floor(Math.random() * 8999 + 1000);

      twilio.messages.create(
        {
          body: `Your code is: ${code}`,
          to: phone,
          from: '+14806858667',
        },
        (error) => {
          if (err) {
            return res.status(422).send({ error });
          }

          admin
            .database()
            .ref('users/' + phone)
            .update({ code, codeValid: true }, () => {
              res.send({ success: true });
            });

          return null;
        }
      );
      return;
    })
    .catch((error) => res.status(422).send({ error }));

  return null;
};

module.exports = requestOneTimePassword;
