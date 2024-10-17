import "./layout.scss";

import { type FC, ReactElement } from "react";

export const ToothMapLayout: FC<{
  children: ReactElement[];
  direction: "right" | "left";
}> = ({ children, direction }) => {
  return (
    <div
      className={"tooth-map-layout" + (direction === "right" ? " right" : "")}
    >
      {children}
    </div>
  );
};
