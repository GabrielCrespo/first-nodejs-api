const express = require("express");

const app = express();

const projects = ["Projeto 1", "Projeto 2", "Projeto 3"];

app.get("/projects", (request, response) => {
  return response.json(projects);
});

app.post("/projects", (request, response) => {
    projects.push('Projeto 4');
    return response.json(projects);
});

app.put('/projects', (request, response) => {
    projects[0] = 'Projects 5';
    return response.json(projects);
})

app.delete('/projects', (request, response) => {
    projects.shift();
    return response.json(projects);
})

const port = 3333;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
