import express from 'express';
import 'express-async-errors';
import error from './middlewares/error';
import carRoute from './routes/carRoute';

const app = express();

app.use(express.json());
app.use('/cars', carRoute);
app.use(error);

export default app;
