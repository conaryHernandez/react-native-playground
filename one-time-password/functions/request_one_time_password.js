const admin = require('firebase-admin');
const { twilio } = require('./twilio');

const requestOneTimePassword = async (req, res) => {
  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone number' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g);

  try {
    await admin.auth().getUser(phone);

    const code = Math.floor(Math.random() * 8999 + 1000);

    twilio.messages.create(
      {
        body: `Your code is: ${code}`,
        to: phone,
        from: '+14806858667',
      },
      (error) => {
        if (error) {
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
  } catch (error) {
    res.status(422).send({ error });
  }

  return null;
};

module.exports = requestOneTimePassword;
