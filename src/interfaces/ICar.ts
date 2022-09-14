import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const CarZodSchema = z.object({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
});

// https://stackoverflow.com/questions/41385059/possible-to-extend-types-in-typescript
// export type ICar = z.infer<typeof CarZodSchema> & IVehicle;

const carPlusVahicle = CarZodSchema.merge(VehicleZodSchema);

type ICar = z.infer<typeof carPlusVahicle>;

export { ICar, carPlusVahicle };
