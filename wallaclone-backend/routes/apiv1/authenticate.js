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
        res.json({ ok: true, token: token, id: user._id });
      },
    );
  } catch (err) {
    next(err);
  }
});

// POST /auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    const name = req.body.nickname;
    const email = req.body.email;
    const password = req.body.password;

    // Password hash
    const hashedPassword = Usuario.hashPassword(password);

    // First try with user name
    var user = null;
    if (name) {
      user = await Usuario.findOne({
        name: name,
      });
    }

    // If not, check user email
    if (!user) {
      user = await Usuario.findOne({
        email: email,
      });
      if (!user) {
        // Insert new user
        var result = await Usuario.insertMany([{
          name: name, email: email, password: hashedPassword
        }])
        if (!result) {
          res.json({ ok: false, error: `Error saving ${email}. Please, try again.` });
          return;
        }
      } else {
        res.json({ ok: false, error: `Email ${email} already registered!` });
        return;
      }
    } else {
      res.json({ ok: false, error: `Nickname ${name} already registered!` });
      return;
    }
    res.json({ok: true, error: null});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
