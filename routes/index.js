const router = require('express').Router();
const userRouter = require('./users');
const filesRouter = require('./files');
const auth = require('../middlewares/auth');

router.use('/users', auth, userRouter);
router.use('/file', auth, filesRouter);



module.exports = router;