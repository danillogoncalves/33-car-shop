import { expect } from "chai";
import { Model } from "mongoose";
import Sinon from "sinon";
import { ErrorTypes } from "../../../errors/catalog";
import MotorcycleModel from "../../../models/MotorcycleModel";
import { motorcycleMock, motorcycleMockWithId } from "../../mocks/motorcycleMock";

describe('Motorcycle Model', () => {
  describe('Creating a motorcycle.', () => {
    const motorcycleModel = new MotorcycleModel();
    beforeEach(() => {
      Sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    });
    afterEach(() => {
      Sinon.restore();
    });
    it('Motorcycle created with success.', async () => {
      const motorcycle = await motorcycleModel.create(motorcycleMock);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
  });
  describe('Finding all motorcycles.', () => {
    const motorcycleModel = new MotorcycleModel();
    beforeEach(() => {
      Sinon.stub(Model, 'find').resolves([motorcycleMockWithId]);
    });
    afterEach(() => {
      Sinon.restore();
    });
    it('Motorcycles found with success.', async () => {
      const motorcycle = await motorcycleModel.read();
      expect(motorcycle).to.be.deep.equal([motorcycleMockWithId]);
    });
  });
  describe('Finding a motorcycle.', () => {
    const motorcycleModel = new MotorcycleModel();
    beforeEach(() => {
      Sinon.stub(Model, 'findById').resolves(motorcycleMockWithId);
    });
    afterEach(() => {
      Sinon.restore();
    });
    it('Motorcycle found with success.', async () => {
      const motorcycle = await motorcycleModel.readOne(motorcycleMockWithId._id);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
    it('Motorcycle not a found.', async () => {
      try {
        await motorcycleModel.readOne('123-ID-ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });
  describe('Updating a motorcycle.', () => {
    const motorcycleModel = new MotorcycleModel();
    beforeEach(() => {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleMockWithId);
    });
    afterEach(() => {
      Sinon.restore();
    });
    it('Motorcycle updated with success.', async () => {
      const motorcycle = await motorcycleModel.update(motorcycleMockWithId._id, motorcycleMock);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
    it('Motorcycle not a found.', async () => {
      try {
        await motorcycleModel.update('123-ID-ERRADO', motorcycleMock);
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });
  describe('Deleting a motorcycle.', () => {
    const motorcycleModel = new MotorcycleModel();
    beforeEach(() => {
      Sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleMockWithId);
    });
    afterEach(() => {
      Sinon.restore();
    });
    it('Motorcycle deleted with success.', async () => {
      const motorcycle = await motorcycleModel.delete(motorcycleMockWithId._id);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
    it('Motorcycle not a found.', async () => {
      try {
        await motorcycleModel.delete('123-ID-ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }
    });
  });
});