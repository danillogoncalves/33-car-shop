import { expect } from "chai";
import Sinon from "sinon";
import { ZodError } from "zod";
import MotorcycleModel from "../../../models/MotorcycleModel";
import MotorcycleService from "../../../services/MotorcycleService";
import { motorcycleMock, motorcycleMockWithId } from "../../mocks/motorcycleMock";
import { ErrorTypes } from '../../../errors/catalog';

describe('motorcycle Service.', () => {
  describe('Creating a motorcycle.', () => {
    const motorcycleModel = new MotorcycleModel();
    const motorcycleService = new MotorcycleService(motorcycleModel);
    beforeEach(() => {
      Sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
    });
    afterEach(() => {
      Sinon.restore();
    });
    it('Motorcycle created with success.', async () => {
      const motorcycle = await motorcycleService.create(motorcycleMock);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
    it('Items of object not conform.', async () => {
      try {
        await motorcycleService.create({} as any);
      } catch (error: any) {
        expect(error).to.be.instanceOf(ZodError);
        expect(error.issues[1].message).to.be.equal('Required')
      }
    });
  });
  describe('Finding all motorcycles.', () => {
    const motorcycleModel = new MotorcycleModel();
    const motorcycleService = new MotorcycleService(motorcycleModel);
    beforeEach(() => {
      Sinon.stub(motorcycleModel, 'read').resolves([motorcycleMockWithId]);
    });
    afterEach(() => {
      Sinon.restore();
    });
    it('Motorcycles found with success.', async () => {
      const motorcycle = await motorcycleService.read();
      expect(motorcycle).to.be.deep.equal([motorcycleMockWithId]);
    });
  });
  describe('Finding a motorcycle.', () => {
    const motorcycleModel = new MotorcycleModel();
    const motorcycleService = new MotorcycleService(motorcycleModel);
    before(() => {
      Sinon.stub(motorcycleModel, 'readOne')
        .onCall(0).resolves(motorcycleMockWithId)
        .onCall(1).resolves(null);
    });
    after(() => {
      Sinon.restore();
    });
    it('Motorcycle found with success.', async () => {
      const motorcycle = await motorcycleService.readOne(motorcycleMockWithId._id);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
    it('ID of motorcycle not a found.', async () => {
      try {
        await motorcycleService.readOne(motorcycleMockWithId._id);
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
      }
    });
  });
  describe('Updating a motorcycle.', () => {
    const motorcycleModel = new MotorcycleModel();
    const motorcycleService = new MotorcycleService(motorcycleModel);
    before(() => {
      Sinon.stub(motorcycleModel, 'update')
        .onCall(0).resolves(motorcycleMockWithId)
        .onCall(1).resolves(null);
    });
    after(() => {
      Sinon.restore();
    });
    it('Motorcycle updated with success.', async () => {
      const motorcycle = await motorcycleService.update(motorcycleMockWithId._id, motorcycleMock);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
    it('Items of object not conform.', async () => {
      try {
        await motorcycleService.update(motorcycleMockWithId._id, {} as any);
      } catch (error: any) {
        expect(error).to.be.instanceOf(ZodError);
        expect(error.issues[0].message).to.be
          .equal('Invalid enum value. Expected \'Street\' | \'Custom\' | \'Trail\', received undefined')
      }
    });
    it('ID of motorcycle not a found.', async () => {
      try {
        await motorcycleService.update(motorcycleMockWithId._id, motorcycleMock);
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
      }
    });
  });
  describe('Deleting a motorcycle.', () => {
    const motorcycleModel = new MotorcycleModel();
    const motorcycleService = new MotorcycleService(motorcycleModel);
    before(() => {
      Sinon.stub(motorcycleModel, 'delete')
        .onCall(0).resolves(motorcycleMockWithId)
        .onCall(1).resolves(null);
    });
    after(() => {
      Sinon.restore();
    });
    it('Motorcycle deleted with success.', async () => {
      const result = await motorcycleService.delete(motorcycleMockWithId._id);
      expect(result).to.be.equal(undefined);
    });
    it('ID of motorcycle not a found.', async () => {
      try {
        await motorcycleService.delete(motorcycleMockWithId._id);
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
      }
    });
  });
});