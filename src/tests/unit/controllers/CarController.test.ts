import { expect } from "chai";
import { Request, Response } from "express";
import Sinon from "sinon";
import CarController from "../../../controllers/CarController";
import CarModel from "../../../models/CarModel";
import CarService from "../../../services/CarService";
import { carMock, carMockWithId } from "../../mocks/carMock";

describe('Car Controller', () => {
  describe('Creating a car.', () => {
    const carModel = new CarModel();
    const carService = new CarService(carModel);
    const carController = new CarController(carService);

    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      Sinon.stub(carService, 'create').resolves(carMockWithId);
      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub();
    });
    after(() => {
      Sinon.restore();
    });
    it('Car created with success.', async () => {
      req.body = carMock;
      await carController.create(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });
  describe('Finding all cars.', () => {
    const carModel = new CarModel();
    const carService = new CarService(carModel);
    const carController = new CarController(carService);

    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      Sinon.stub(carService, 'read').resolves([carMockWithId]);
      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub();
    });
    after(() => {
      Sinon.restore();
    });
    it('Cars found with success.', async () => {
      req.body = carMock;
      await carController.read(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith([carMockWithId])).to.be.true;
    });
  });
  describe('Finding a car.', () => {
    const carModel = new CarModel();
    const carService = new CarService(carModel);
    const carController = new CarController(carService);

    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      Sinon.stub(carService, 'readOne').resolves(carMockWithId);
      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub();
    });
    after(() => {
      Sinon.restore();
    });
    it('Car found with success.', async () => {
      req.params = { id: carMockWithId._id }
      await carController.readOne(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });
  describe('Updating a car.', () => {
    const carModel = new CarModel();
    const carService = new CarService(carModel);
    const carController = new CarController(carService);

    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      Sinon.stub(carService, 'update').resolves(carMockWithId);
      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub();
    });
    after(() => {
      Sinon.restore();
    });
    it('Car updated with success.', async () => {
      req.body = carMock;
      req.params = { id: carMockWithId._id }
      await carController.update(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as Sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });
  describe('Deleting a car.', () => {
    const carModel = new CarModel();
    const carService = new CarService(carModel);
    const carController = new CarController(carService);

    const req = {} as Request;
    const res = {} as Response;

    before(() => {
      Sinon.stub(carService, 'delete').resolves(undefined);
      res.sendStatus = Sinon.stub();
    });
    after(() => {
      Sinon.restore();
    });
    it('Car deleted with success.', async () => {
      req.params = { id: carMockWithId._id }
      await carController.delete(req, res);
      expect((res.sendStatus as Sinon.SinonStub).calledWith(204)).to.be.true;
    });
  });
});