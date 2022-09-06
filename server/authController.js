const User = require("./models/User");
const Role = require("./models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("./config");
const generateAccessToken = (id, roles) => {
  const payload = { id, roles };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    console.log(req.body);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const { username, password } = req.body;
      console.log(req.body);
      console.log(password);
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Такой пользователь существует" });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      console.log(user);
      user.save();
      return res.json({ message: "Пользователь был успешно зарегистрирован" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Register err" });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователя ${username} не существует` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: `Введен не верный пароль` });
      }

      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token, username, id: user._id });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Login err" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();
      console.log(users);
      res.status(200).json(users);
    } catch (error) {}
  }
  async us(req, res) {
    try {
      const users = await User.find();
      console.log(users);
      res.status(200).json(users);
    } catch (error) {}
  }
}

module.exports = new authController();
