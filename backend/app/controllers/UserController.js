const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.checkUserExist = async (req, res) => {
  // Destruturando os dados que vêm do params, vou usar o query para pegar os daos
  const { email, password } = req.body;
  // Procurando pelo usuário que tem este e-mail
  const user = await User.findOne({ email });

  // Verificando se esta consulta retornou um true
  if (!user) {
    return res
      .status(404)
      .json({ message: `Falha não conseguiu encontrar o usuário!` });
  }

  // Comparando a password vinda do body com a que está no banco de dados
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return res.status(401).json({ message: "Credenciais inválidas!" });
  }

  // Criando a token de auth de usuário
  const token = jwt.sign(
    {
      id: user._id,
    },
    `${process.env.TOKEN}`,
    {
      expiresIn: "1d",
    }
  );

  // ou const { password: _, ...userWithoutPassword } = user._doc; -> Pegue a propriedade password, descartando ela, e coloque o resto em userWithoutPassword.
  // destruturando os dados vindos do mongo, password:_ -> serve para pular,  e usei o spreed para pegar o restante dos dados no documento que converti para objecto
  const { password: _, ...dataNoPassword } = user.toObject();
  // Enviando uma resposta de sucesso para o front
  return res.status(200).json({
    dataNoPassword,
    token,
    message: "Parabéns você logou com sucesso!",
  });
};

exports.createUser = async (req, res) => {
  const { name, email, phone, birthYear, password, gender } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Não foi possível criar o usuário" });
  }

  try {
    // Gerando o salto de caracteres para a senha
    const passwordEncryptedSalt = await bcrypt.genSalt(10);

    //   Criando a hash da password
    const hash = await bcrypt.hash(password, passwordEncryptedSalt);

    //   Criando um novo objecto/documento ou Schema no mongodb e enviando os dados recebidos
    const user = new User({
      name,
      email,
      phone,
      birthYear,
      password: hash,
      gender,
    });
    await user.save();

    return res.status(201).json({ message: " Usuário salvo com sucesso!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Ocorreu um erro com a requisição ${error.message}` });
  }
};
