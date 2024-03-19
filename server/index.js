require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const router = require('./src/routes/UserRoutes');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();


const corsOptions = {
  origin: 'https://system-sign.vercel.app', // Altere para o domínio do seu frontend
  credentials: true, // Habilitar credenciais
  optionsSuccessStatus: 200 // Alguns navegadores antigos interpretam erroneamente as respostas como inválidas, portanto, precisamos de uma configuração adicional para lidar com isso
};

app.use(cors(corsOptions));
  
app.use(express.json());
app.use(cookieParser())
// Credenciais para o banco de dados
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;


// Usando as rotas definidas em userRoutes
mongoose.connect(`mongodb+srv://LucasPedro:YHwxIz2HsLCcbRNP@clusterdb.a0ocqpo.mongodb.net/`).then(() => {
    app.listen(3001,
        console.log("Servidor está rodando em http://localhost:3001/")
        );
        console.log("Conexão bem sucedida DB!")
}).catch(err => console.log(err))

app.use('/auth', router);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
  });