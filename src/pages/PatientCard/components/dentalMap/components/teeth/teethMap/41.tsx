import SvgIcon from "@mui/material/SvgIcon";
import type { Segment2, FourZonesChart, FourZoneTooth } from "@types";
import type { FC } from "react";
import { TOOTH_SVG_STYLE } from "@utils";
import Crown from "@images/tooth/crown-2.png";
import Implant from "@images/tooth/implant.png";
import RemovedIcon from "@mui/icons-material/Close";
import { T41_IMAGE } from "@assets";

type TeethMapProps = {
  tooth: FourZoneTooth;
  onColorChange: (tooth: keyof FourZonesChart, segment: keyof Segment2) => void;
};

export const T41Svg: FC<TeethMapProps> = ({ tooth, onColorChange }) => {
  const style_1 = { fill: tooth.segments.c1 || "none", ...TOOTH_SVG_STYLE };
  const style_2 = { fill: tooth.segments.c2 || "none", ...TOOTH_SVG_STYLE };
  const className = "tooth-svg l b 1";
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
    <SvgIcon className="tooth-svg l b 1">
      <svg width="17.6" height="60.8" version="1.1" viewBox="0 0 17.6 60.8">
        <T41_IMAGE />
        <path
          style={style_2}
          onClick={() => onColorChange("t41", "c2")}
          d="m7.8707 5.3562s-1.2489 5.1339-1.6896 10.261c-0.44061 5.1269-0.79521 7.049-1.0948 11.56-0.29964 4.5113-0.6575 9.7744-0.6575 9.7744l8.6661-0.21138s-0.43716-12.973-1.9908-22.536c-1.5536-9.5626-2.016-10.088-2.016-10.088s-0.3424-0.50444-0.65501-0.24632c-0.31261 0.25812-0.56239 1.4859-0.56239 1.4859z"
          fillOpacity=".65229"
        />
        <path
          style={style_1}
          onClick={() => onColorChange("t41", "c1")}
          d="m6.9787 41.859s0.11051-0.31962-0.98581-0.89078c-1.0963-0.57115-2.3205 0.30294-2.3205 0.30294s-1.0977 1.1712-1.3465 3.0171-0.50963 5.7145-0.50963 5.7145-0.19833 5.8374 0.088067 6.3317c0.28639 0.49432 0.25556 0.86811 1.1169 1.2925 0.21361 0.18672 2.2376 1.0226 5.7464 0.9994 3.5089-0.02319 4.8988-0.45365 6.1752-1.4133 1.2764-0.9596 0.64255-8.0786-0.35521-12.246-0.99776-4.1674-0.72942-3.6486-1.5429-4.4799s-2.6329-0.30278-2.6329-0.30278-1.0402 1.0252-1.3769 1.7327c-0.33663 0.70744-0.52205 0.9827-0.85806 0.9827-0.33601 0-1.1983-1.0408-1.1983-1.0408z"
          fillOpacity=".65229"
        />
      </svg>
    </SvgIcon>
  );
};
