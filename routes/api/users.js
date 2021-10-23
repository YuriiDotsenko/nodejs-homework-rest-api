const express = require("express");

const { authenticate } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const router = express.Router();

router.get("/current", authenticate, ctrl.getCurrent);
router.patch("/current", authenticate, ctrl.updateSubscription);

module.exports = router;
