const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
} = require("../controllers/productsController");

// GET all products
router.get("/", getAllProducts);


router.get("/:id", getProductById);

module.exports = router;
