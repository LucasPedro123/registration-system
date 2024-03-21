const express = require("express");
const mongoose = require('mongoose');
const router = require('./src/routes/UserRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Iniciando servidor
const app = express();

app.use(express.json());
app.use(cookieParser());

// Credenciais para o banco de dados
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

// Configuração do CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};


app.use(cors(corsOptions));

// Usando as rotas definidas em userRoutes
mongoose.connect(`mongodb+srv://LucasPedro:YHwxIz2HsLCcbRNP@clusterdb.a0ocqpo.mongodb.net`)
  .then(() => {
    console.log("Conexão bem sucedida DB!")
    app.listen(3001, () => {
      console.log("Servidor está rodando em http://localhost:3001/");
    });
  })
  .catch(err => console.log(err));

app.use('/auth', router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});
