const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { placeOrder, getOrders } = require("../controllers/ordersController");

router.post("/", auth, placeOrder);
router.get("/", auth, getOrders);

module.exports = router;
