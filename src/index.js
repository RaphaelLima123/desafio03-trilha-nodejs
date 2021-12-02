const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const updatedRepository = request.body;

  const repository = repositories.find(repo => repo.id == id);

  console.log(repository);

  if(!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  if(updatedRepository.title) {
    repository.title = updatedRepository.title
  }

  if(updatedRepository.url) {
    repository.url = updatedRepository.url
  }

  if(updatedRepository.techs) {
    repository.techs = updatedRepository.techs
  }

  return response.status(201).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repo => repo.id === id);

  if(repository) {
      repositories.splice(0, repositories.length)
      return response.status(204).send();
  }

  return response.status(404).json({ error: "Repository not found" });
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repo => repo.id === id);

  if(!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repository.likes ++;

  return response.status(201).json(repository);
});

module.exports = app;
