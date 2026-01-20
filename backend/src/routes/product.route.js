import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);


router.post("/", protect, upload.array("images", 5), createProduct);
router.delete("/:id", protect, deleteProduct);
router.put("/:id", protect, upload.array("images", 5), updateProduct);


export default router;