import { ErrorTypes } from '../errors/catalog';
import { carPlusVahicle, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

export default class CarService implements IService<ICar> {
  constructor(private _carModel: IModel<ICar>) {}

  async create(obj: ICar): Promise<ICar> {
    const parsed = carPlusVahicle.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    return this._carModel.create(obj);
  }

  async read(): Promise<ICar[]> {
    return this._carModel.read();
  }

  async readOne(_id: string): Promise<ICar> {
    const car = await this._carModel.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  async update(_id: string, obj: ICar): Promise<ICar> {
    const parsed = carPlusVahicle.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const car = await this._carModel.update(_id, obj);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  async delete(_id: string): Promise<void> {
    const car = await this._carModel.delete(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
  }
}