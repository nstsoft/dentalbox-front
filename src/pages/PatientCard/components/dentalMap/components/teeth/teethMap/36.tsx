import SvgIcon from "@mui/material/SvgIcon";
import type { Segment4, FiveZonesChart, FiveZoneTooth } from "@types";
import type { FC } from "react";
import { TOOTH_SVG_STYLE } from "@utils";
import Implant from "@images/tooth/implant.png";
import RemovedIcon from "@mui/icons-material/Close";
import Crown from "@images/tooth/crown-2-2.png";
import { T36_IMAGE } from "@assets";

type TeethMapProps = {
  tooth: FiveZoneTooth;
  onColorChange: (tooth: keyof FiveZonesChart, segment: keyof Segment4) => void;
};

export const T36Svg: FC<TeethMapProps> = ({ tooth, onColorChange }) => {
  const style_1 = { fill: tooth.segments.c1 || "none", ...TOOTH_SVG_STYLE };
  const style_2 = { fill: tooth.segments.c2 || "none", ...TOOTH_SVG_STYLE };
  const style_3 = { fill: tooth.segments.c3 || "none", ...TOOTH_SVG_STYLE };
  const className = "tooth-svg r b 6";
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
    <SvgIcon className="tooth-svg r b big t6">
      <svg width="29.76" height="56.64" version="1.1" viewBox="0 0 29.76 56.64">
        <T36_IMAGE />
        <g fillOpacity=".65229">
          <path
            style={style_3}
            onClick={() => onColorChange("t36", "c3")}
            d="m21.798 6.0326s1.5726 3.7249 1.2724 8.7733c-0.30022 5.0484-0.0015 14.11-0.0015 14.11l-6.6723 0.13237s2.0681-5.3298 2.5368-9.8543c0.46875-4.5245 0.94548-13.749 0.94548-13.749s-0.06351-2.3016 0.27441-2.3881c0.33792-0.08657 1.111 1.6308 1.111 1.6308z"
          />
          <path
            style={style_2}
            onClick={() => onColorChange("t36", "c2")}
            d="m7.1329 5.7412s-1.1695 3.5123-1.1212 7.7336c0.0483 4.2213-0.28068 15.606-0.28068 15.606l8.1371-0.20689s-2.3756-2.6141-2.9979-7.1462-1.4742-8.7688-1.4742-8.7688l-0.34188-2.7767s-0.44228-2.4682-0.57837-5.7628c-0.01158-0.28022-0.46732-0.01153-0.46732-0.01153z"
          />
          <path
            style={style_1}
            onClick={() => onColorChange("t36", "c1")}
            d="m16.556 50.602s3.5844 4.349 9.0084 1.3954-1.8385-16.039-1.8385-16.039-0.4742-1.095-2.4977-3.8027c-2.0235-2.7077-5.2615-0.94955-5.9947 0.43149s-0.97814 1.9336-1.5107 2.3388c-0.53257 0.40521-1.3251 0.14348-1.6241-0.50201s0.0075-0.54697-0.6881-1.6025c-0.69562-1.0555-3.434-0.36407-3.434-0.36407s-1.5966 0.50183-2.8635 2.1563c-2.3516 3.0709-3.6303 9.0046-2.494 13.231 1.0205 3.796 0.6367 3.6179 2.5796 5.6612s7.0148-0.71896 7.0148-0.71896 0.8462-1.1825 1.0147-2.7743c0.86318-2.8099 3.328 0.58889 3.328 0.58889z"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};
