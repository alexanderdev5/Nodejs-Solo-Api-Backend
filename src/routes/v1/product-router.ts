import {Router}  from 'express';
import * as productsController from "../../controllers/v1/products-controller"
import { checkAuth,checkIp } from '../../middlewares/auth-middleware';
import { handlexRequestErrors } from '../../middlewares/validator-middleware';
import { validateNewProductBody,validateDelete,validateProductAndNotify } from '../../validators/v1/products-validator';

const router =  Router();

router.get("", checkAuth, productsController.getProducts);
router.post("/create",
checkAuth,
validateNewProductBody,
handlexRequestErrors,
productsController.createProduct);    
router.get("/:productId",checkAuth,productsController.getProductById);
router.put("/:productId",checkAuth, productsController.updateProduct);
router.patch("/:productId",checkAuth, productsController.partialUpdateProduct);

router.delete("/:productId",
checkAuth,validateDelete, handlexRequestErrors,productsController.deleteProductById);

router.post("/:productId/notify-client",checkAuth,validateProductAndNotify,handlexRequestErrors, productsController.updateProductAndNotify);

export default router;


