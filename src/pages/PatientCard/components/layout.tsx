import "./layout.scss";

import { type FC, ReactElement } from "react";

export const ToothMapLayout: FC<{ children: ReactElement[] }> = ({
  children,
}) => {
  return <div className="tooth-map-layout">{children}</div>;
};
