import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';

const motorcycleRoute = Router();

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

motorcycleRoute.post('/', motorcycleController.create);
motorcycleRoute.get('/:id', motorcycleController.readOne);
motorcycleRoute.get('/', motorcycleController.read);
motorcycleRoute.put('/:id', motorcycleController.update);
motorcycleRoute.delete('/:id', motorcycleController.delete);

export default motorcycleRoute;
