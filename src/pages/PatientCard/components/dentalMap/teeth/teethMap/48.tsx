import SvgIcon from "@mui/material/SvgIcon";
import type { Segment4, FiveZonesChart, FiveZoneTooth } from "@types";
import type { FC } from "react";
import { TOOTH_SVG_STYLE } from "@utils";
import Implant from "@images/tooth/implant.png";
import RemovedIcon from "@mui/icons-material/Close";
import Crown from "@images/tooth/crown-2-2.png";

type TeethMapProps = {
  tooth: FiveZoneTooth;
  onColorChange: (tooth: keyof FiveZonesChart, segment: keyof Segment4) => void;
};

export const T48Svg: FC<TeethMapProps> = ({ tooth, onColorChange }) => {
  const style_1 = { fill: tooth.segments.c1 || "none", ...TOOTH_SVG_STYLE };
  const style_2 = { fill: tooth.segments.c2 || "none", ...TOOTH_SVG_STYLE };
  const style_3 = { fill: tooth.segments.c3 || "none", ...TOOTH_SVG_STYLE };

  const className = "tooth-svg l b 8";
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
    <SvgIcon className="tooth-svg l b big 8">
      <svg width="29.76" height="56.64" version="1.1" viewBox="0 0 29.76 56.64">
        <image
          transform="scale(-1)"
          x="-29.76"
          y="-56.64"
          width="29.76"
          height="56.64"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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
"
        />
        <g fillOpacity=".65229">
          <path
            style={style_1}
            onClick={() => onColorChange("t48", "c1")}
            d="m21.798 6.0326s1.5726 3.7249 1.2724 8.7733c-0.30022 5.0484-0.0015 14.11-0.0015 14.11l-6.6723 0.13237s2.0681-5.3298 2.5368-9.8543c0.46875-4.5245 0.94548-13.749 0.94548-13.749s-0.06351-2.3016 0.27441-2.3881c0.33792-0.08657 1.111 1.6308 1.111 1.6308z"
          />
          <path
            style={style_2}
            onClick={() => onColorChange("t48", "c2")}
            d="m7.1329 5.7412s-1.1695 3.5123-1.1212 7.7336c0.0483 4.2213-0.28068 15.606-0.28068 15.606l8.1371-0.20689s-2.3756-2.6141-2.9979-7.1462-1.4742-8.7688-1.4742-8.7688l-0.34188-2.7767s-0.44228-2.4682-0.57837-5.7628c-0.01158-0.28022-0.46732-0.01153-0.46732-0.01153z"
          />
          <path
            style={style_3}
            onClick={() => onColorChange("t48", "c3")}
            d="m16.556 50.602s3.5844 4.349 9.0084 1.3954-1.8385-16.039-1.8385-16.039-0.4742-1.095-2.4977-3.8027c-2.0235-2.7077-5.2615-0.94955-5.9947 0.43149s-0.97814 1.9336-1.5107 2.3388c-0.53257 0.40521-1.3251 0.14348-1.6241-0.50201s0.0075-0.54697-0.6881-1.6025c-0.69562-1.0555-3.434-0.36407-3.434-0.36407s-1.5966 0.50183-2.8635 2.1563c-2.3516 3.0709-3.6303 9.0046-2.494 13.231 1.0205 3.796 0.6367 3.6179 2.5796 5.6612s7.0148-0.71896 7.0148-0.71896 0.8462-1.1825 1.0147-2.7743c0.86318-2.8099 3.328 0.58889 3.328 0.58889z"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};
