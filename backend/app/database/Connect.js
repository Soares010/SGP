const mongoose = require("mongoose");
require("dotenv").config();
const connectToDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_DB}`);
    console.log("Conexão com sucesso!");
  } catch (error) {
    console.log(`Falha ao conectar! ${error}`);
  }
};

module.exports = connectToDb;
