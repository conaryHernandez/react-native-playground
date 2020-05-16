const admin = require('firebase-admin');

const createUser = async (req, res) => {
  if (!req.body.phone) {
    return res.status(422).send({ error: 'Bad Input' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g);

  try {
    const user = await admin.auth().createUser({
      uid: phone,
    });
    res.send(user);
  } catch (error) {
    res.status(422).send({ error });
  }

  return null;
};

module.exports = createUser;
