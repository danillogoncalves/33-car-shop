import { expect } from "chai";
import Sinon from "sinon";
import { ZodError } from "zod";
import CarModel from "../../../models/CarModel";
import CarService from "../../../services/CarService";
import { carMock, carMockWithId } from "../../mocks/carMock";
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Service.', () => {
  describe('Creating a car.', () => {
    const carModel = new CarModel();
    const carService = new CarService(carModel);
    beforeEach(() => {
      Sinon.stub(carModel, 'create').resolves(carMockWithId);
    });
    afterEach(() => {
      Sinon.restore();
    });
    it('Car created with success.', async () => {
      const car = await carService.create(carMock);
      expect(car).to.be.deep.equal(carMockWithId);
    });
    it('Items of object not conform.', async () => {
      try {
        await carService.create({} as any);
      } catch (error: any) {
        expect(error).to.be.instanceOf(ZodError);
        expect(error.issues[0].message).to.be.equal('Required')
      }
    });
  });
  describe('Finding all cars.', () => {
    const carModel = new CarModel();
    const carService = new CarService(carModel);
    beforeEach(() => {
      Sinon.stub(carModel, 'read').resolves([carMockWithId]);
    });
    afterEach(() => {
      Sinon.restore();
    });
    it('Cars found with success.', async () => {
      const car = await carService.read();
      expect(car).to.be.deep.equal([carMockWithId]);
    });
  });
  describe('Finding a car.', () => {
    const carModel = new CarModel();
    const carService = new CarService(carModel);
    before(() => {
      Sinon.stub(carModel, 'readOne')
        .onCall(0).resolves(carMockWithId)
        .onCall(1).resolves(null);
    });
    after(() => {
      Sinon.restore();
    });
    it('Car found with success.', async () => {
      const car = await carService.readOne(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });
    it('ID of Car not a found.', async () => {
      try {
        await carService.readOne(carMockWithId._id);
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
      }
    });
  });
  describe('Updating a car.', () => {
    const carModel = new CarModel();
    const carService = new CarService(carModel);
    before(() => {
      Sinon.stub(carModel, 'update')
        .onCall(0).resolves(carMockWithId)
        .onCall(1).resolves(null);
    });
    after(() => {
      Sinon.restore();
    });
    it('Car updated with success.', async () => {
      const car = await carService.update(carMockWithId._id, carMock);
      expect(car).to.be.deep.equal(carMockWithId);
    });
    it('Items of object not conform.', async () => {
      try {
        await carService.update(carMockWithId._id, {} as any);
      } catch (error: any) {
        expect(error).to.be.instanceOf(ZodError);
        expect(error.issues[0].message).to.be.equal('Required')
      }
    });
    it('ID of Car not a found.', async () => {
      try {
        await carService.update(carMockWithId._id, carMock);
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
      }
    });
  });
  describe('Deleting a car.', () => {
    const carModel = new CarModel();
    const carService = new CarService(carModel);
    before(() => {
      Sinon.stub(carModel, 'delete')
        .onCall(0).resolves(carMockWithId)
        .onCall(1).resolves(null);
    });
    after(() => {
      Sinon.restore();
    });
    it('Car deleted with success.', async () => {
      const result = await carService.delete(carMockWithId._id);
      expect(result).to.be.equal(undefined);
    });
    it('ID of Car not a found.', async () => {
      try {
        await carService.delete(carMockWithId._id);
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
      }
    });
  });
});