interface CoordinateLocation {
  longitude: number;
  latitude: number;
}

interface AddressLocation {
  addressLine1: string;
  addressLine2: string;
  postCode: string;
  city: string;
}

export { CoordinateLocation, AddressLocation };
