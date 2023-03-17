const { Router } = require('express');
const { loginController } = require('../controllers');
const { loginMiddlewares } = require('../middlewares');

const router = Router();

router.post(
  '/',
  loginMiddlewares.login,
  loginController.login,
);

module.exports = router;