const express = require("express");

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { admin } = require("../middleware/adminMiddleware");

router.post("/", protect, admin, addProduct);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put("/:id", protect, admin, updateProduct);

router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;

