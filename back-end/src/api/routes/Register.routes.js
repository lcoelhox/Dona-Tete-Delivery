const { Router } = require('express');
const { registerController } = require('../controllers');
const { registerMiddlewares } = require('../middlewares');

const router = Router();

router.post(
  '/',
  registerMiddlewares.register,
  registerController.register,
);

module.exports = router;