const { Router } = require('express');
const { salesController } = require('../controllers');
const { tokenMiddleware, salesMiddlewares } = require('../middlewares');

const router = Router();

router.get(
  '/orders', 
  tokenMiddleware,
  salesController.getAllSales,
);

router.get(
  '/orders/:id', 
  tokenMiddleware,
  salesController.getSaleById,
);

router.patch(
  '/orders/:id',
  tokenMiddleware,
  salesMiddlewares.statusMiddleware,
  salesController.changeStatus,
);

module.exports = router;