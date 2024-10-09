import { Sex } from "./common";

export type CreatePatient = {
  name: string;
  secondName: string;
  surname: string;
  dob: string;
  sex: Sex;
  phone: string;
  email: string;
  address: string;
  image?: File;
  notes?: string;
};

export type Patient = {
  _id: string;
  name: string;
  secondName: string;
  surname: string;
  sex: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  image?: File | string;
  notes?: string;
};
