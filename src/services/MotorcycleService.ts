import { ErrorTypes } from '../errors/catalog';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, motorcycleExtendsVehicle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleService implements IService<IMotorcycle> {
  constructor(private _motorcycleModel: IModel<IMotorcycle>) {}

  async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = motorcycleExtendsVehicle.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    return this._motorcycleModel.create(obj);
  }

  async read(): Promise<IMotorcycle[]> {
    return this._motorcycleModel.read();
  }

  async readOne(_id: string): Promise<IMotorcycle> {
    const motorcycle = await this._motorcycleModel.readOne(_id);
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycle;
  }

  async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = motorcycleExtendsVehicle.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const motorcycle = await this._motorcycleModel.update(_id, obj);
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycle;
  }

  async delete(_id: string): Promise<void> {
    const motorcycle = await this._motorcycleModel.delete(_id);
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);
  }
}