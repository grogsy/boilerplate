// auth (login/logout, sign up) endpoints
const router = require('express').Router();
const passport = require('passport');

const { User } = require('../db');

// login endpoint
router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    console.log(user.Model);

    if (!user) {
      res.status(401).send('User not Found');
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Incorrect Password');
    } else {
      req.login(user, err => {
        if (err) {
          next(err);
        } else {
          res.json(user);
        }
      });
    }
  } catch (error) {
    next(error);
  }
});

// logout endpoint
router.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

// endpoint for fetching the current logged in user
router.get('/me', (req, res, next) => {
  res.json(req.user);
});

// sign-up endpoint
router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => {
      if (err) {
        next(err);
      } else {
        res.json(user);
      }
    });
  } catch (error) {
    next(error);
  }
});

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => done(null, user))
    .catch(done);
});

module.exports = router;
