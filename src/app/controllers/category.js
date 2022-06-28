const { Category } = require("../models");
const moment = require("moment");

class CategoryController {
  async create(req, res) {
    const { name } = req.body;
    let category;
    try {
      category = await Category.create({ name });
    } catch (error) {
      console.log(`create: ${error}`);
      return res.status(400).send({ error: "Erro ao criar categoria" });
    }

    return res.status(200).json(category);
  }

  async findOne(req, res) {
    const { id } = req.params;

    let category;
    try {
      category = await Category.findOne({ where: { id } });
    } catch (error) {
      console.log(`findOne: ${error}`);
      return res.status(400).send({ error: "Erro ao procurar categoria" });
    }

    return res.status(200).json(category);
  }

  async findAll(req, res) {
    let categories;
    try {
      categories = await Category.findAll();
    } catch (error) {
      console.log(`findAll: ${error}`);
      return res
        .status(400)
        .send({ error: "Erro ao retornar todas as categorias" });
    }

    return res.status(200).json(categories);
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    let ver;
    try {
      ver = await Category.update(data, { where: { id } });
    } catch (error) {
      console.log(`update: ${error}`);
      return res.status(400).send({ error: "Erro ao atualizar categoria" });
    }

    if (ver == 0) {
      return res.status(400).send({ error: "Erro ao atualizar categoria" });
    }

    const category = await Category.findOne({ where: { id } });

    return res.status(200).json(category);
  }

  async remove(req, res) {
    const { id } = req.params;

    let ver;

    try {
      ver = await Category.destroy({ where: { id } });
    } catch (error) {
      console.log(`remove: ${error}`);
      return res.status(400).send({ error: "Erro ao excluir categoria" });
    }

    if (ver == 0) {
      return res.status(400).send({ error: "Erro ao excluir categoria" });
    }

    return res.status(200).send();
  }
}

module.exports = new CategoryController();
