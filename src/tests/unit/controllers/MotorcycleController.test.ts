import { expect } from "chai";
import { Request, Response } from "express";
import Sinon from "sinon";
import MotorcycleController from "../../../controllers/MotorcycleController";
import MotorcycleModel from "../../../models/MotorcycleModel";
import MotorcycleService from "../../../services/MotorcycleService";
import { motorcycleMock, motorcycleMockWithId } from "../../mocks/motorcycleMock";

describe('Motorcycle Controller', () => {
  describe('Creating a motorcycle.', () => {
    const motorcycleModel = new MotorcycleModel();
    const motorcycleService = new MotorcycleService(motorcycleModel);
    const motorcycleController = new MotorcycleController(motorcycleService);

    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      Sinon.stub(motorcycleService, 'create').resolves(motorcycleMockWithId);
      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub();
    });
    after(() => {
      Sinon.restore();
    });
    it('Motorcycle created with success.', async () => {
      req.body = motorcycleMock;
      await motorcycleController.create(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  });
  describe('Finding all motorcycles.', () => {
    const motorcycleModel = new MotorcycleModel();
    const motorcycleService = new MotorcycleService(motorcycleModel);
    const motorcycleController = new MotorcycleController(motorcycleService);

    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      Sinon.stub(motorcycleService, 'read').resolves([motorcycleMockWithId]);
      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub();
    });
    after(() => {
      Sinon.restore();
    });
    it('Motorcycles found with success.', async () => {
      req.body = motorcycleMock;
      await motorcycleController.read(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith([motorcycleMockWithId])).to.be.true;
    });
  });
  describe('Finding a motorcycle.', () => {
    const motorcycleModel = new MotorcycleModel();
    const motorcycleService = new MotorcycleService(motorcycleModel);
    const motorcycleController = new MotorcycleController(motorcycleService);

    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      Sinon.stub(motorcycleService, 'readOne').resolves(motorcycleMockWithId);
      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub();
    });
    after(() => {
      Sinon.restore();
    });
    it('Motorcycle found with success.', async () => {
      req.params = { id: motorcycleMockWithId._id }
      await motorcycleController.readOne(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  });
  describe('Updating a motorcycle.', () => {
    const motorcycleModel = new MotorcycleModel();
    const motorcycleService = new MotorcycleService(motorcycleModel);
    const motorcycleController = new MotorcycleController(motorcycleService);

    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      Sinon.stub(motorcycleService, 'update').resolves(motorcycleMockWithId);
      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub();
    });
    after(() => {
      Sinon.restore();
    });
    it('Motorcycle updated with success.', async () => {
      req.body = motorcycleMock;
      req.params = { id: motorcycleMockWithId._id }
      await motorcycleController.update(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  });
  describe('Deleting a motorcycle.', () => {
    const motorcycleModel = new MotorcycleModel();
    const motorcycleService = new MotorcycleService(motorcycleModel);
    const motorcycleController = new MotorcycleController(motorcycleService);

    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      Sinon.stub(motorcycleService, 'delete').resolves(undefined);
      res.sendStatus = Sinon.stub();
    });
    after(() => {
      Sinon.restore();
    });
    it('Motorcycle deleted with success.', async () => {
      req.params = { id: motorcycleMockWithId._id }
      await motorcycleController.delete(req, res);
      expect((res.sendStatus as Sinon.SinonStub).calledWith(204)).to.be.true;
    });
  });
});