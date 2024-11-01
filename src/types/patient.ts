import { Sex } from "./common";

export type Patient = {
  _id: string;
  name: string;
  secondName: string;
  surname: string;
  sex: Sex;
  dob: string;
  phone: string;
  email: string;
  address: string;
  image?: string;
  notes?: string;
};

export type PatientSummaryListItem = Pick<
  Patient,
  "name" | "surname" | "secondName" | "email" | "phone" | "_id" | "image"
>;
