import { AddressLocation, CoordinateLocation } from "./Location";

interface Store {
  id: number;
  name: string;
  description: string;
  location: CoordinateLocation | AddressLocation;
}

export { Store };
