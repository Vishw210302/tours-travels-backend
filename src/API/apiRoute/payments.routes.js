const express = require("express");
const router = express.Router();


const { createOrder, veryFyPayment } = require("../apiController/payments.controller");

router.post("/createOrder", createOrder);
router.post("/verifyPayment", veryFyPayment);

module.exports = router;