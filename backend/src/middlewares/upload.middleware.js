import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { ENV } from "../lib/env.js";

// Configure Cloudinary
cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

// Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "donum",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Multer instance
export const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
});
