import { AddressLocation, CoordinateLocation } from "./Location";
import {User} from "./User";
import {Schedule} from "./Schedule";

interface Store {
  id: string;
  name: string;
  owner: User;
  description: string;
  location: CoordinateLocation | AddressLocation;
  schedule: Schedule;
}

export { Store };
