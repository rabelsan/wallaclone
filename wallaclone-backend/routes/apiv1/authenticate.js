/* eslint-disable comma-dangle */
/* eslint-disable semi */
'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Usuario = require('../../models/Usuario');

// POST /auth/login
router.post('/login', async (req, res, next) => {
  try {
    const nameOrEmail = req.body.email;
    const password = req.body.password;

    // Password hash
    const hashedPassword = Usuario.hashPassword(password);

    // First try with user name
    var user = await Usuario.findOne({
      name: nameOrEmail,
      password: hashedPassword,
    });

    // If not, check user email
    if (!user) {
      user = await Usuario.findOne({
        email: nameOrEmail,
        password: hashedPassword,
      });
      if (!user) {
        // Reply that credential are wrong
        res.json({ ok: false, error: 'invalid credentials' });
        return;
      }
    }

    // User exists and password matches

    // Create the token
    jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '2d',
      },
      (err, token) => {
        if (err) {
          return next(err);
        }
        // Replay with JWT token
        res.json({ ok: true, token: token });
      },
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;
