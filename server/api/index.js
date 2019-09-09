const router = require('express').Router();

// example api route -- This will match /api/example
router.use('/example', require('./example'));

router.get('/', (req, res, next) => {
  res.send('You are at the toplevel route for api');
});

// 404 handler for the /api route
router.use((req, res, next) => {
  const err = new Error('No Such Thing');
  err.status = 404;
  next(err);
});

module.exports = router;
