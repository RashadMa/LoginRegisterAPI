const { User } = require("../models/User");
const { confirmCodeEmail } = require("../utils/emailService");

const userController = {
  register: async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.json({ msg: "Already exists" });
      }

      const randomCode = Math.floor(Math.random() * 10000);
      confirmCodeEmail(req.body.email, randomCode);

      const user = new User({
        email: req.body.email,
        password: req.body.password,
        code: randomCode,
      });

      const savedUser = await user.save();
      res.json(savedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  confirmCode: async (req, res) => {
    try {
      const { email, code } = req.body;
      const user = await User.findOne({ email, code });
      if (user) {
        return res.json({ email });
      }
      res.status(404).json({ msg: "Confirm Code error" });
    } catch (error) {
      res.status(500).send("Mongo error!");
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email, password });
      if (user) {
        const randomCode = Math.floor(Math.random() * 10000);
        user.code = randomCode;
        await user.save();

        confirmCodeEmail(email, randomCode);
        return res.json({ email });
      }
      res.status(404).json({ msg: "Email or password error" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        const randomCode = Math.floor(Math.random() * 10000);
        user.code = randomCode;
        await user.save();

        confirmCodeEmail(email, randomCode);
        return res.json({ email });
      }
      res.status(404).json({ msg: "Email error" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  newPassword: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        user.password = password;
        await user.save();
        return res.json({ email });
      }
      res.status(404).json({ msg: "Not found!" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = {
  userController,
};
