const routes = require('express').Router();
const multer = require('multer');
const { multerImage } = require('./app/utils/multer')

const authMiddleware = require('./app/middleware/auth');

const SessionController = require('./app/controllers/session');
const ProductController = require('./app/controllers/product');
const UserController = require('./app/controllers/user');
const CategorytController = require('./app/controllers/category');

routes.get('/dashboard', (req, res) => {
  return res.status(200).send();
});

routes.post('/login', SessionController.login);
routes.post('/register', UserController.create);

routes.use(authMiddleware);

routes.get('/user', UserController.findAll);
routes.get('/user/:id', UserController.findOne);
routes.patch('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.remove);

routes.post('/product', multer(multerImage).single('file'), ProductController.create);
routes.get('/product', ProductController.findAll);
routes.get('/product/:id', ProductController.findOne);
routes.patch('/product/:id', ProductController.update);
routes.delete('/product/:id', ProductController.remove);

routes.post('/category', CategorytController.create);
routes.get('/category', CategorytController.findAll);
routes.get('/category/:id', CategorytController.findOne);
routes.patch('/category/:id', CategorytController.update);
routes.delete('/category/:id', CategorytController.remove);

module.exports = routes;
