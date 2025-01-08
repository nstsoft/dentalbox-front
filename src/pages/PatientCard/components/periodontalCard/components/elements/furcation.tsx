import { useEffect, type FC } from "react";
import Box from "@mui/material/Box";
import { ToothPropertiesType } from "@types";

const positions = ["left", "right"];

type Props = {
  value: ToothPropertiesType["furcation"];
  onChange: (value: ToothPropertiesType["furcation"]) => void;
  isImplant: boolean;
  isAvailable: boolean;
};

export const Furcation: FC<Props> = ({
  value,
  onChange,
  isImplant,
  isAvailable,
}) => {
  useEffect(() => {
    if (isImplant) onChange(value.length > 1 ? [0, 0] : [0]);
  }, [isImplant, onChange, value.length]);

  return (
    <Box className="multiple-furcations">
      {value.map((item, index) => (
        <Box
          key={positions[index] + item}
          onClick={() => {
            if (!isImplant && isAvailable) {
              const newValue = [...value];
              newValue[index] += 1;
              onChange(newValue as ToothPropertiesType["furcation"]);
            }
          }}
          className="furcation box-item"
          sx={{
            backgroundColor: !isAvailable || isImplant ? "#ffffff" : "#e9e9e9",
            borderLeft: isAvailable && !isImplant ? "1px solid #ccc" : "none",
            borderRight: isAvailable && !isImplant ? "1px solid #ccc" : "none",
          }}
        >
          <Box
            className="furcation-icon"
            sx={{
              border: item && isAvailable ? "1px solid black" : "none",
            }}
          >
            <Box
              className="round left"
              sx={{
                backgroundColor:
                  item >= 2 && isAvailable ? "black" : "transparent",
              }}
            />
            <Box
              className="round right"
              sx={{
                backgroundColor:
                  item === 3 && isAvailable ? "black" : "transparent",
              }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};
