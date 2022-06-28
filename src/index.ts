require('dotenv').config()
const app = require('./server')

app.listen(process.env.PORTA, () => {
  console.log(`🙌😎 Servidor HTTP rodando porta: ${process.env.PORTA} 👌`);
});
