export interface VendorDtoInput {
  name: string;
  ownerName: string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface UpdateVendorDtoInput {
  name?: string;
  ownerName?: string;
  foodType?: [string];
  pincode?: string;
  address?: string;
  phone?: string;
}

export interface VendorCredentials {
  email: string;
  password: string;
}

export interface VendorPayLoad {
  _id: string;
  email: string;
  name: string;
  foodType: [string];
}
