import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import {
  createCollection,
  getCollections,
  deleteCollection,
} from "../controllers/collection.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getCollections);

router.post(
  "/",
  protect,
  upload.single("image"),
  createCollection
);
router.delete("/:id", protect, deleteCollection);

export default router;
