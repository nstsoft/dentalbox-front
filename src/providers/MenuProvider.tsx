import { useState, useCallback, type FC, type ReactElement } from "react";
import { MenuContext } from "./context";

export const MenuProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [isOpenMenu, setIsOpen] = useState(false);

  const setIsOpenMenu = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <MenuContext.Provider
      value={{ isOpenMenu, setIsOpen: setIsOpenMenu, toggle }}
    >
      {children}
    </MenuContext.Provider>
  );
};
