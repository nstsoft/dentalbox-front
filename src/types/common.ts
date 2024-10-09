export interface MenuContextType {
  isOpenMenu: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggle: () => void;
}

export enum Sex {
  male = "male",
  female = "female",
}
