const jwt = require("jsonwebtoken");
const Project = require("../models/Projects");

exports.CreateProject = async (req, res) => {
  const {
    title,
    category,
    status,
    description,
    begin,
    end,
    days,
    budget,
    cost,
    priority,
  } = req.body;

  try {
    const project = new Project({
      title,
      category,
      status,
      description,
      begin,
      end,
      days,
      budget,
      cost,
      priority,
    });
    await project.save();

    return res.status(201).json({ message: "Projecto salvo com sucesso!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Ocorreu um erro com a requisição ${error}` });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar projectos!" });
  }
};
