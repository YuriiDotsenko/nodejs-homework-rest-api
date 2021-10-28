const express = require("express");

const {
  controllerWrapper,
  authenticate,
  upload,
} = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const router = express.Router();

router.get("/current", authenticate, controllerWrapper(ctrl.getCurrent));
router.patch(
  "/current",
  authenticate,
  controllerWrapper(ctrl.updateSubscription)
);

router.get("/verify/:verificationToken", controllerWrapper(ctrl.verify));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(ctrl.updateAvatar)
);

module.exports = router;
