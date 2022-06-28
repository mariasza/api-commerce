const { User } = require("../models");
const bcrypt = require("bcryptjs");

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 8);

    let user;

    try {
      user = await User.create({ name, email, password: hash });
    } catch (error) {
      console.log(`create: ${error}`);
      return res.status(400).send({ error: "Erro ao criar usuário" });
    }

    return res.status(200).json(user);
  }

  async findOne(req, res) {
    const { id } = req.params;

    let user;
    try {
      user = await User.findOne({ where: { id } });
    } catch (error) {
      console.log(`findOne: ${error}`);
      return res.status(400).send({ error: "Erro ao procurar usuário" });
    }

    return res.status(200).json(user);
  }

  async findAll(req, res) {
    let users;
    try {
      users = await User.findAll();
    } catch (error) {
      console.log(`findAll: ${error}`);
      return res.status(400).send({ error: "Erro ao retornar todos os usuários" });
    }

    return res.status(200).json(users);
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    let ver;
    try {
      ver = await User.update(data, { where: { id } });
    } catch (error) {
      console.log(`update: ${error}`);
      return res.status(400).send({ error: "Erro ao atualizar usuário" });
    }

    if (ver == 0) {
      return res.status(400).send({ error: "Erro ao atualizar usuário" });
    }

    const user = await User.findOne({ where: { id } });

    return res.status(200).json(user);
  }

  async remove(req, res) {
    const { id } = req.params;

    let ver;

    try {
      ver = await User.destroy({ where: { id } });
    } catch (error) {
      console.log(`remove: ${error}`);
      return res.status(400).send({ error: "Erro ao excluir usuário" });
    }

    if (ver == 0) {
      return res.status(400).send({ error: "Erro ao excluir usuário" });
    }

    return res.status(200).send();
  }
}

module.exports = new UserController();
