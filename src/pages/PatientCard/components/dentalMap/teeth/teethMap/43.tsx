import SvgIcon from "@mui/material/SvgIcon";
import type { Segment2, FourZonesChart, FourZoneTooth } from "@types";
import type { FC } from "react";
import { TOOTH_SVG_STYLE } from "@utils";

type TeethMapProps = {
  tooth: FourZoneTooth;
  onColorChange: (tooth: keyof FourZonesChart, segment: keyof Segment2) => void;
};

export const T43Svg: FC<TeethMapProps> = ({ tooth, onColorChange }) => {
  const style_1 = { fill: tooth.segments.c1 || "none", ...TOOTH_SVG_STYLE };
  const style_2 = { fill: tooth.segments.c2 || "none", ...TOOTH_SVG_STYLE };
  return (
    <SvgIcon className="tooth-svg l b 3">
      <svg width="17.6" height="62.72" version="1.1" viewBox="0 0 17.6 62.72">
        <image
          width="17.6"
          height="62.72"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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
"
        />
        <g fillOpacity=".65229">
          <path
            style={style_1}
            onClick={() => onColorChange("t43", "c1")}
            d="m6.5086 6.9933s-0.97866 4.2465-1.3143 12.34c-0.33943 8.1852-0.18877 13.061-0.18877 13.061l6.5237-0.10838s-0.30032-11.339-1.3042-18.063c-1.0039-6.7243-1.6117-7.2972-1.6117-7.2972s-0.79942-1.3587-1.1673-1.4716c-0.36786-0.11294-0.9375 1.5388-0.9375 1.5388z"
          />
          <path
            style={style_2}
            onClick={() => onColorChange("t43", "c2")}
            d="m6.7348 39.088s-0.014588-1.4709-0.83193-2.1771c-0.81735-0.7062-1.6482-0.21667-1.6482-0.21667s-0.46896 0.17936-0.61597 0.87078c-0.14701 0.69142-1.4903 6.078-1.5726 11.885-0.082276 5.8069-0.026375 5.5262 0.11633 5.83 0.1427 0.30376 4.3302 4.5333 5.5274 4.9489s2.6239-0.32546 2.6239-0.32546 2.7884-1.5307 3.6554-3.0722c0.86699-1.5415 0.87504-3.6544 0.87504-3.6544s-0.10776-3.4136-0.37364-6.5069c-0.26588-3.0933-1.1749-6.728-1.1749-6.728s-0.71449-1.7775-0.81786-2.1021c-0.10337-0.32464-0.2132-0.5864-0.5708-0.85501-0.3576-0.26861-1.6689-0.17719-1.6689-0.17719s-1.1602 0.55846-1.6064 1.2256-1.0198 1.3622-1.0198 1.3622-0.1293 0.18851-0.4355 0.13273c-0.3062-0.05578-0.35494-0.1345-0.35494-0.1345z"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};
