import SvgIcon from "@mui/material/SvgIcon";
import type { Segment2, FourZonesChart, FourZoneTooth } from "@types";
import type { FC } from "react";
import { TOOTH_SVG_STYLE } from "@utils";
import Implant from "@images/tooth/implant.png";
import RemovedIcon from "@mui/icons-material/Close";
import Crown from "@images/tooth/crown-4.png";
import { T14_IMAGE } from "@assets";
type TeethMapProps = {
  tooth: FourZoneTooth;
  onColorChange: (tooth: keyof FourZonesChart, segment: keyof Segment2) => void;
};

export const T14Svg: FC<TeethMapProps> = ({ tooth, onColorChange }) => {
  const style_1 = { fill: tooth.segments.c1 || "none", ...TOOTH_SVG_STYLE };
  const style_2 = { fill: tooth.segments.c2 || "none", ...TOOTH_SVG_STYLE };
  const className = "tooth-svg l u 4";
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
    <SvgIcon className="tooth-svg l u 4">
      <svg width="23.04" height="61.44" version="1.1" viewBox="0 0 23.04 61.44">
        <T14_IMAGE />
        <g fillOpacity=".65229">
          <path
            onClick={() => onColorChange("t14", "c2")}
            style={style_2}
            d="m10.501 6.059s-0.98013 1.8312-1.6619 14.536c-0.68181 12.705-1.5148 14.794-1.5148 14.794l8.0594-0.01892s-0.1126-7.0465-0.96483-14.914c-0.85223-7.8674-2.7378-14.484-2.7378-14.484s-0.03785-0.84835-0.40287-0.87751c-0.36355-0.029041-0.7772 0.96435-0.7772 0.96435z"
          />
          <path
            onClick={() => onColorChange("t14", "c1")}
            style={style_1}
            d="m12.597 40.451s-0.05961-1.5012-1.037-2.6021c-0.97742-1.1009-2.4746-1.0722-2.4746-1.0722s-1.6124 0.03025-2.4703 1.0259c-0.85786 0.9957-2.143 6.4182-2.143 6.4182s-0.68621 1.796-0.76826 4.7747c-0.082045 2.9787-0.68523 4.9424-0.68523 4.9424s-0.238 2.3887 0.34892 2.5787c0.58692 0.18998 1.9551 0.49068 1.9551 0.49068s1.2846 0.08176 1.8949 0.61407c0.61022 0.5323 3.3177 2.0048 6.5235 1.2443 3.2057-0.76045 3.7854-1.8611 3.7854-1.8611s0.88776-0.74794 1.6071-2.5024c0.71933-1.7544-1.7941-5.1484-1.8723-8.1513-0.07818-3.0029-0.10183-0.54989-0.5864-5.7236-0.48457-5.1737-3.1113-0.22516-3.1113-0.22516s-0.0761 0.17107-0.4006 0.34801c-0.3245 0.17693-0.56581-0.29907-0.56581-0.29907z"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};
