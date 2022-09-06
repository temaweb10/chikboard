const express = require("express");
const router = express.Router();
const controller = require("./authController");
const { check } = require("express-validator");
const roleMiddleware = require("./middleware/roleMiddleware");
router.post(
  "/auth/regisration",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть больше 4 символов и меньше 16 символов"
    ).isLength({ min: 4, max: 16 }),
  ],
  controller.registration
);
router.post("/auth/login", controller.login);
router.get("/auth/users", roleMiddleware(["USER"]), controller.getUsers);
router.get("/auth/us", controller.us);

module.exports = router;
