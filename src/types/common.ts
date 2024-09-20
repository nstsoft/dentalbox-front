export interface MenuContextType {
  isOpenMenu: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggle: () => void;
}
