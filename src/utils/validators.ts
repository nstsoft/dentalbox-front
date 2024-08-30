export const validateLogin = (login: string) => {
  return /\S+@\S+\.\S+/.test(login) || /^\+[1-9]\d{1,14}$/.test(login);
};

export const validatePhone = (phone: string) => {
  return /^\+[1-9]\d{1,14}$/.test(phone);
};
