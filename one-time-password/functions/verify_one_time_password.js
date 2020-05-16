const admin = require('firebase-admin');

module.exports = async (req, res) => {
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: 'Phone and code must be provided' });
  }

  const phone = req.body.phone;
  const code = parseInt(req.body.code);

  try {
    await admin.auth().getUser(phone);

    const userRef = admin.database().ref('users/' + phone);

    const snapshot = await userRef.once('value');

    const user = snapshot.val();

    if (user.code !== code || !user.codeValid) {
      return res.status(422).send({ error: 'Code not valid.' });
    }

    await userRef.update({ codeValid: false });

    const token = await admin.auth().createCustomToken(phone);

    res.send({ token });
  } catch (err) {
    res.status(422).send({ error: error.message });
  }
};
