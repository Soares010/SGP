const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Token não forneceido, sem autorização" });
  }

  const token = authHeader.split(" ")[1]; // -> Remove o "Bearer"

  if (!token) {
    return res.status(201).json({ message: "Token passado é inválido" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN); // validando token
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token expirado ou inválido" });
  }
}

module.exports = authMiddleware;
