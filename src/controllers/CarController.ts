import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

export default class CarController {
  constructor(private _carService: IService<ICar>) {}

  create = async (req: Request, res: Response<ICar>): Promise<void> => {
    const result = await this._carService.create(req.body);
    res.status(201).json(result);
  };

  read = async (_req: Request, res: Response<ICar[]>): Promise<void> => {
    const result = await this._carService.read();
    res.status(200).json(result);
  };

  readOne = async (req: Request, res: Response<ICar>): Promise<void> => {
    const result = await this._carService.readOne(req.params.id);
    res.status(200).json(result);
  };

  update = async (req: Request, res: Response<ICar>): Promise<void> => {
    const result = await this._carService.update(req.params.id, req.body);
    res.status(200).json(result);
  };

  delete = async (req: Request, res: Response<ICar>): Promise<void> => {
    await this._carService.delete(req.params.id);
    res.sendStatus(204);
  };
}