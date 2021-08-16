const express = require('express');

const app = express();

app.get('/projects', (request, response) => {
    return response.json({
       message: "Hello World",
    });
});

const port = 3333;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});