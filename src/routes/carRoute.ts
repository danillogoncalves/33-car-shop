import { Router } from 'express';
import CarController from '../controllers/CarController';
import CarModel from '../models/CarModel';
import CarService from '../services/CarService';

const carRoute = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

carRoute.post('/', carController.create);
carRoute.get('/:id', carController.readOne);
carRoute.get('/', carController.read);
carRoute.put('/:id', carController.update);

export default carRoute;
