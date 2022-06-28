const { Product } = require("../models");
const { ProductImage } = require("../models");
const moment = require("moment");

class ProductController {
  async create(req, res) {
    const { name, description, price, userId, categoryId } = req.body;

    let product, imageProduct;

    let imageName, imageUrl;

    if (req.file) {
      const { key } = req.file;
      imageName = key;
      imageUrl = `${process.env.APP_URL}/files/${key}`;
    }

    try {
      product = await Product.create({
        name,
        description,
        price,
        userId,
        categoryId,
      });
      imageProduct = await ProductImage.create({
        name: imageName,
        url: imageUrl,
        productId: product.id,
      });
    } catch (error) {
      console.log(`create: ${error}`);
      return res.status(400).send({ error: "Erro ao criar produto" });
    }

    return res.status(200).json({ product, imageProduct });
  }

  async findOne(req, res) {
    const { id } = req.params;

    let product, imageProduct;
    try {
      product = await Product.findOne({ where: { id } });
      imageProduct = await ProductImage.findOne({ where: { productId: id } });
    } catch (error) {
      console.log(`findOne: ${error}`);
      return res.status(400).send({ error: "Erro ao procurar produto" });
    }

    return res.status(200).json({ product, imageProduct });
  }

  async findAll(req, res) {
    let products;
    try {
      products = await Product.findAll();
      products = await Promise.all(
        products.map(async (product) => {
          const imageProduct = await ProductImage.findOne({
            where: { productId: product.id },
          });
          return { product, imageProduct };
        })
      );
    } catch (error) {
      console.log(`findAll: ${error}`);
      return res
        .status(400)
        .send({ error: "Erro ao retornar todas os produtos" });
    }

    return res.status(200).json(products);
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    let ver;
    try {
      ver = await Product.update(data,
        { where: { id } }
      );
    } catch (error) {
      console.log(`update: ${error}`);
      return res.status(400).send({ error: "Erro ao atualizar produto" });
    }

    if (ver == 0) {
      return res.status(400).send({ error: "Erro ao atualizar produto" });
    }

    const product = await Product.findOne({ where: { id } });

    return res.status(200).json(product);
  }

  async remove(req, res) {
    const { id } = req.params;

    let ver;

    try {
      ver = await Product.destroy({ where: { id } });
    } catch (error) {
      console.log(`remove: ${error}`);
      return res.status(400).send({ error: "Erro ao excluir produto" });
    }

    if (ver == 0) {
      return res.status(400).send({ error: "Erro ao excluir produto" });
    }

    return res.status(200).send();
  }
}

module.exports = new ProductController();
