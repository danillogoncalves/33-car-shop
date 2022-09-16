import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleController {
  constructor(private _motorcycleService: IService<IMotorcycle>) {}

  create = async (req: Request, res: Response<IMotorcycle>): Promise<void> => {
    const result = await this._motorcycleService.create(req.body);
    res.status(201).json(result);
  };

  read = async (_req: Request, res: Response<IMotorcycle[]>): Promise<void> => {
    const result = await this._motorcycleService.read();
    res.status(200).json(result);
  };

  readOne = async (req: Request, res: Response<IMotorcycle>): Promise<void> => {
    const result = await this._motorcycleService.readOne(req.params.id);
    res.status(200).json(result);
  };

  update = async (req: Request, res: Response<IMotorcycle>): Promise<void> => {
    const result = await this._motorcycleService.update(req.params.id, req.body);
    res.status(200).json(result);
  };
}