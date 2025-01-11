import SvgIcon from "@mui/material/SvgIcon";
import type { Segment2, FourZonesChart, FourZoneTooth } from "@types";
import type { FC } from "react";
import { TOOTH_SVG_STYLE } from "@utils";
import Crown from "@images/tooth/crown-3.png";
import Implant from "@images/tooth/implant.png";
import RemovedIcon from "@mui/icons-material/Close";
import { T23_IMAGE } from "@assets";
type TeethMapProps = {
  tooth: FourZoneTooth;
  onColorChange: (tooth: keyof FourZonesChart, segment: keyof Segment2) => void;
};

export const T23Svg: FC<TeethMapProps> = ({ tooth, onColorChange }) => {
  const style_1 = { fill: tooth.segments.c1 || "none", ...TOOTH_SVG_STYLE };
  const style_2 = { fill: tooth.segments.c2 || "none", ...TOOTH_SVG_STYLE };
  const className = "tooth-svg r u 3";
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
    <SvgIcon className="tooth-svg r u 3">
      <svg width="17.6" height="62.72" version="1.1" viewBox="0 0 17.6 62.72">
        <T23_IMAGE />
        <g fillOpacity=".65229">
          <path
            style={style_2}
            onClick={() => onColorChange("t23", "c2")}
            d="m6.5086 6.9933s-0.97866 4.2465-1.3143 12.34c-0.33943 8.1852-0.18877 13.061-0.18877 13.061l6.5237-0.10838s-0.30032-11.339-1.3042-18.063c-1.0039-6.7243-1.6117-7.2972-1.6117-7.2972s-0.79942-1.3587-1.1673-1.4716c-0.36786-0.11294-0.9375 1.5388-0.9375 1.5388z"
          />
          <path
            style={style_1}
            onClick={() => onColorChange("t23", "c1")}
            d="m6.7348 39.088s-0.014588-1.4709-0.83193-2.1771c-0.81735-0.7062-1.6482-0.21667-1.6482-0.21667s-0.46896 0.17936-0.61597 0.87078c-0.14701 0.69142-1.4903 6.078-1.5726 11.885-0.082276 5.8069-0.026375 5.5262 0.11633 5.83 0.1427 0.30376 4.3302 4.5333 5.5274 4.9489s2.6239-0.32546 2.6239-0.32546 2.7884-1.5307 3.6554-3.0722c0.86699-1.5415 0.87504-3.6544 0.87504-3.6544s-0.10776-3.4136-0.37364-6.5069c-0.26588-3.0933-1.1749-6.728-1.1749-6.728s-0.71449-1.7775-0.81786-2.1021c-0.10337-0.32464-0.2132-0.5864-0.5708-0.85501-0.3576-0.26861-1.6689-0.17719-1.6689-0.17719s-1.1602 0.55846-1.6064 1.2256-1.0198 1.3622-1.0198 1.3622-0.1293 0.18851-0.4355 0.13273c-0.3062-0.05578-0.35494-0.1345-0.35494-0.1345z"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};
