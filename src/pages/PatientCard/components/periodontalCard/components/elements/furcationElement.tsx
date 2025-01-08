import { type FC } from "react";
import Box from "@mui/material/Box";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export const FurcationElement: FC<Props> = ({ value, onChange }) => {
  return (
    <Box
      onClick={() => {
        onChange(value === 3 ? 0 : value + 1);
      }}
      className={`furcation box-item `}
    >
      <Box className={`furcation-icon value_${value}`}>
        <Box className="round left" />
        <Box className="round right" />
      </Box>
    </Box>
  );
};
