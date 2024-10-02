export type CreatePatient = {
  name: string;
  secondName: string;
  surName: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  image?: File;
};

export type Patient = {
  _id: string;
  name: string;
  secondName: string;
  surName: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  image?: string;
};
