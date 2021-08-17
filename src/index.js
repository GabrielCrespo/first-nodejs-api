const { json } = require("express");
const express = require("express");

const app = express();

app.use(express.json());

const projects = ["Projeto 1", "Projeto 2", "Projeto 3"];

app.get("/projects", (request, response) => {
  const { title, owner } = request.query;

  console.log(title, owner);

  return response.json(projects);
});

app.post("/projects", (request, response) => {
    const { owner, title, year } = request.body;

    console.log(owner, title, year);

    projects.push('Projeto 4');
    return response.json(projects);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;

    console.log(id);

    projects[0] = 'Projects 5';
    return response.json(projects);
})

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    console.log(id);

    projects.shift();
    return response.json(projects);
})

const port = 3333;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
