const express = require("express");
const server = express();
const port = 3333;

server.use(express.json());

const projects = [];
let requestCount = 0;

function projectExists(req, res, next) {
  const project = projects.find(proj => proj.id === req.params.id);

  if (!project) {
    return res.status(400).json({ error: "Project does not exists" });
  }

  return next();
}

function logRequestCount(req, res, next) {
  console.log(`Número de requisições: ${++requestCount}`);
  return next();
}

server.use(logRequestCount);

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  if (id && title) {
    const project = { id, title, tasks: [] };
    projects.push(project);
    return res.json(project);
  }

  return res.status(400).json({ error: "Missing request body" });
});

server.put("/projects/:id", projectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(proj => proj.id === id);

  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", projectExists, (req, res) => {
  const { id } = req.params;

  const projectIdx = projects.findIndex(proj => proj.id === id);

  projects.splice(projectIdx, 1);

  return res.json();
});

server.post("/projects/:id/tasks", projectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(proj => proj.id === id);

  project.tasks.push({ title });

  res.json(project);
});

server.listen(port, () => console.log(`Listening on ${port}`));
