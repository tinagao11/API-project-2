// backend/routes/api/index.js

const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');



const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewRouter = require('./reviews.js');
const bookingRouter = require('./bookings.js');
const spotimageRouter = require('./spot-images.js');
const reviewImageRouter = require('./review-image.js')

//test
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);


// GET /api/set-token-cookie

router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

// GET /api/restore-user
router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);


// GET /api/require-auth

router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);



router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewRouter);

router.use('/bookings', bookingRouter);

router.use('/spot-images', spotimageRouter);

router.use('/review-images',reviewImageRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});


module.exports = router;
