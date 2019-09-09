// delete me for actual things, this is just an example

const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send('You have hit an example api route');
});

// this will then match /api/example/json
router.get('/json', (req, res, next) => {
  res.json({ foo: 'bar' });
});

module.exports = router;
