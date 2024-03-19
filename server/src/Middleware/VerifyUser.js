const jwt = require('jsonwebtoken');
require('dotenv').config();


// Middleware: verifica se há token armazenado no cookie. Se sim, prossegue e, caso contrário, o status é false
const verifyUser = async (req, res, next) => {
    try {
        //Resgata o cookie da requisição com o objeto chamado token
        const token = req.cookies.token;
        // Verifica o token se existe
        if (!token) {
            return res.json({ status: false, message: "Not authorized" });
        }

        const decoded = await jwt.verify(token, process.env.KEY);
        // Prossiga
        next();
    } catch {
        // O Status falhará
        return res.json({ status: false, message: "Invalid token" });
    }
}

module.exports = verifyUser;
