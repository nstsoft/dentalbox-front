import SvgIcon from "@mui/material/SvgIcon";
import type { Segment2, FourZonesChart, FourZoneTooth } from "@types";
import type { FC } from "react";
import { TOOTH_SVG_STYLE } from "@utils";
import Implant from "@images/tooth/implant.png";
import RemovedIcon from "@mui/icons-material/Close";
import Crown from "@images/tooth/crown-5.png";
import { T35_IMAGE } from "@assets";
type TeethMapProps = {
  tooth: FourZoneTooth;
  onColorChange: (tooth: keyof FourZonesChart, segment: keyof Segment2) => void;
};

export const T35Svg: FC<TeethMapProps> = ({ tooth, onColorChange }) => {
  const style_1 = { fill: tooth.segments.c1 || "none", ...TOOTH_SVG_STYLE };
  const style_2 = { fill: tooth.segments.c2 || "none", ...TOOTH_SVG_STYLE };
  const className = "tooth-svg r b 5";
  if (tooth.removed) {
    return (
      <div className={className + " removed"}>
        <RemovedIcon color="error" fontSize="large" />
      </div>
    );
  }

  if (tooth.implant || tooth.crown) {
    const alt = tooth.implant ? "implant" : "crown";
    return (
      <div className={className + " pathology " + alt}>
        <img src={tooth.implant ? Implant : Crown} alt={alt} />
      </div>
    );
  }
  return (
    <SvgIcon className="tooth-svg r b 5">
      <svg width="21.44" height="61.12" version="1.1" viewBox="0 0 21.44 61.12">
        <T35_IMAGE />
        <g fillOpacity=".65229">
          <path
            onClick={() => onColorChange("t35", "c2")}
            style={style_2}
            d="m10.481 5.5258s-2.5364 7.7729-2.3924 17.365c0.144 9.5917-0.036091 11.751-0.036091 11.751l6.9409-0.01153s-0.05359-11.596-1.0453-18.328c-0.99169-6.7322-1.6791-11.028-1.6791-11.028s-0.17681-0.86967-0.61497-1.2209-1.1731 1.4736-1.1731 1.4736z"
          />
          <path
            onClick={() => onColorChange("t35", "c1")}
            style={style_1}
            d="m11.618 39.511s0.32208-1.2952-1.9352-2.5893c-2.2573-1.2941-3.8669 0.92968-3.8669 0.92968s-2.0775 5.4382-3.1463 10.146c-1.0582 4.6613-0.27341 6.9315 0.35101 7.6936 0.62442 0.76217 2.9197 1.5196 5.9776 1.725s6.4775-0.47861 6.4775-0.47861 2.8843-1.0765 3.2789-2.5424c0.39459-1.4659-1.5185-8.3439-2.6099-12.885-1.0914-4.541-2.938-1.8602-2.938-1.8602s-0.38876 0.54322-1.0128 0.57436c-0.62409 0.03114-0.57584-0.71352-0.57584-0.71352z"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};
