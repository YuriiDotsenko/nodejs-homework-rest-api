const express = require("express");

const { controllerWrapper, validation } = require("../../middlewares");
const { authenticate } = require("../../middlewares");
const { joiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", authenticate, controllerWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, controllerWrapper(ctrl.getById));

router.post(
  "/",
  validation(joiSchema),
  authenticate,
  controllerWrapper(ctrl.add)
);

router.put(
  "/:contactId",
  validation(joiSchema),
  authenticate,
  controllerWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId",
  authenticate,
  controllerWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", authenticate, controllerWrapper(ctrl.removeById));

module.exports = router;
