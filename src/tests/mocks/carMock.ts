import { ICar } from "../../interfaces/ICar";

export const carMock: ICar = {
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  doorsQty: 2,
  seatsQty: 2,
}

export const carMockWithId: ICar & { _id: string } = {
  _id: '632372178499fa4f1bb6144b',
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  doorsQty: 2,
  seatsQty: 2,
}