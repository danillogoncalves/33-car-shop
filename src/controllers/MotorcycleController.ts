import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleController {
  constructor(private _motorcycleService: IService<IMotorcycle>) {}

  create = async (req: Request, res: Response<IMotorcycle>): Promise<void> => {
    const result = await this._motorcycleService.create(req.body);
    res.status(201).json(result);
  };
}