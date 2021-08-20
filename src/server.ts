import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();

app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

const port = 3334

app.listen(port, () => {
 console.log(`server is running on port ${port}`);
})