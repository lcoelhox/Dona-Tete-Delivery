const { Router } = require('express');
const { customerController } = require('../controllers');
const { tokenMiddleware, customerMiddlewares } = require('../middlewares');

const router = Router();

router.get(
  '/products',
  tokenMiddleware,
  customerController.getAllProducts,
);

router.get(
  '/seller',
  tokenMiddleware,
  customerController.getAllSellers,
);

router.post(
  '/checkout',
  tokenMiddleware,
  customerMiddlewares.checkoutMiddleware,
  customerController.checkout,
);

module.exports = router;
