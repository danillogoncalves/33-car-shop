import { expect } from "chai";
import { Model } from "mongoose";
import Sinon from "sinon";
import { ErrorTypes } from "../../../errors/catalog";
import CarModel from "../../../models/CarModel";
import { carMock, carMockWithId } from "../../mocks/carMock";

describe('Car Model', () => {
  describe('Creating a car.', () => {
    const carModel = new CarModel();
    beforeEach(() => {
      Sinon.stub(Model, 'create').resolves(carMockWithId);
    });
    afterEach(() => {
      Sinon.restore();
    });
    it('Car created with success.', async () => {
      const car = await carModel.create(carMock);
      expect(car).to.be.deep.equal(carMockWithId);
    });
  });
  describe('Finding all cars.', () => {
    const carModel = new CarModel();
    beforeEach(() => {
      Sinon.stub(Model, 'find').resolves([carMockWithId]);
    });
    afterEach(() => {
      Sinon.restore();
    });
    it('Cars found with success.', async () => {
      const car = await carModel.read();
      expect(car).to.be.deep.equal([carMockWithId]);
    });
  });
  describe('Finding a car.', () => {
    const carModel = new CarModel();
    beforeEach(() => {
      Sinon.stub(Model, 'findById').resolves(carMockWithId);
    });
    afterEach(() => {
      Sinon.restore();
    });
    it('Car found with success.', async () => {
      const car = await carModel.readOne(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });
    it('Car not a found.', async () => {
      try {
        await carModel.readOne('123-ID-ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });
  describe('Updating a car.', () => {
    const carModel = new CarModel();
    beforeEach(() => {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
    });
    afterEach(() => {
      Sinon.restore();
    });
    it('Car updated with success.', async () => {
      const car = await carModel.update(carMockWithId._id, carMock);
      expect(car).to.be.deep.equal(carMockWithId);
    });
    it('Car not a found.', async () => {
      try {
        await carModel.update('123-ID-ERRADO', carMock);
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });
  describe('Deleting a car.', () => {
    const carModel = new CarModel();
    beforeEach(() => {
      Sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
    });
    afterEach(() => {
      Sinon.restore();
    });
    it('Car deleted with success.', async () => {
      const car = await carModel.delete(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });
    it('Car not a found.', async () => {
      try {
        await carModel.delete('123-ID-ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });
});