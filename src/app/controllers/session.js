const { User } = require("../models");

class SessionController {
  async login(req, res) {
    const { email, password } = req.body;
    let user;
    try {
      user = await User.findOne({ where: { email } });
    } catch (error) {
      console.log(`debug(SesionController.store):${error}`);
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ message: "User or password Incorrect" });
    }

    return res.json({
      token: user.generateToken(),
    });
  }
}

module.exports = new SessionController();
