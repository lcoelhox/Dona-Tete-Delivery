const { Router } = require('express');
const { adminController } = require('../controllers');
const { tokenMiddleware } = require('../middlewares');
const { adminMiddlewares } = require('../middlewares');

const router = Router();

router.post(
  '/manage',
  tokenMiddleware,
  adminMiddlewares.createUserMiddleware,
  adminController.createUser,
);

router.get(
  '/manage',
  tokenMiddleware,
  adminController.getAllUsers,
);

router.delete(
  '/manage/:id',
  tokenMiddleware,
  adminController.deleteUserById,
);

module.exports = router;