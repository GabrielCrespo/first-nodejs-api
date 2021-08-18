import express from 'express';
import routes from './routes';

const app = express();

app.use(routes);

const port = 3334

app.listen(port, () => {
 console.log(`server is running on port ${port}`);
})