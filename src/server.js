require('dotenv').config()
const PORT = process.env.PORT

const app = require('./app');

app.listen(PORT, function () {
  console.log(`server: aplication is runing in port ${PORT}`);
})
