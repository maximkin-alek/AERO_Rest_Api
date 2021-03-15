const router = require('express').Router();
const userRouter = require('./users');
const auth = require('../middlewares/auth');

router.use('/users', auth, userRouter);



module.exports = router;