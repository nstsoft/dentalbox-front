import { type FC } from "react";
import Box from "@mui/material/Box";
import type { TEETH_NUMBERS, ToothPropertiesType } from "@types";
import Implant from "@images/tooth/implant.png";
import { TEETH_IMAGES } from "../utils";
import SvgIcon from "@mui/material/SvgIcon";
import { LineChart, Line, YAxis } from "recharts";

type Props = {
  tooth: TEETH_NUMBERS;
  implant: boolean;
  rotate?: boolean;
  margin: ToothPropertiesType["margin"];
  depth: ToothPropertiesType["depth"];
};

export const ToothImage: FC<Props> = ({
  tooth,
  implant,
  rotate,
  margin,
  depth,
}) => {
  const marginDataset = [0, 1, 2].map((i) => ({
    margin: -margin[i],
    depth: depth[i] ? depth[i] + -margin[i] : 0,
    x: i + 1,
  }));

  return (
    <Box className={`tooth-box box-item ${rotate && "rotate"}`}>
      <Box className={`tooth-image-box ${!implant ? tooth : ""}`}>
        {implant ? (
          <img src={Implant} />
        ) : (
          <SvgIcon>{TEETH_IMAGES[tooth]()}</SvgIcon>
        )}
      </Box>

      <Box className="chart">
        <LineChart width={70} maxBarSize={70} height={70} data={marginDataset}>
          <YAxis hide domain={[-5, 5]} />
          <Line
            type="monotone"
            dataKey="margin"
            stroke="#ff6565"
            dot={false}
            strokeLinecap="square"
          />
          <Line
            type="monotone"
            dataKey="depth"
            stroke="#0098ff"
            dot={false}
            strokeLinecap="square"
          />
        </LineChart>
      </Box>
    </Box>
  );
};
