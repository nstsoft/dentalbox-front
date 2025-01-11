import SvgIcon from "@mui/material/SvgIcon";
import type { Segment4, FiveZonesChart, FiveZoneTooth } from "@types";
import type { FC } from "react";
import { TOOTH_SVG_STYLE } from "@utils";
import Implant from "@images/tooth/implant.png";
import RemovedIcon from "@mui/icons-material/Close";
import Crown from "@images/tooth/crown-6.png";
import { T16_IMAGE } from "@assets";
type TeethMapProps = {
  tooth: FiveZoneTooth;
  onColorChange: (tooth: keyof FiveZonesChart, segment: keyof Segment4) => void;
};

export const T16Svg: FC<TeethMapProps> = ({ tooth, onColorChange }) => {
  const style_1 = { fill: tooth.segments.c1 || "none", ...TOOTH_SVG_STYLE };
  const style_2 = { fill: tooth.segments.c2 || "none", ...TOOTH_SVG_STYLE };
  const style_3 = { fill: tooth.segments.c3 || "none", ...TOOTH_SVG_STYLE };
  const style_4 = { fill: tooth.segments.c4 || "none", ...TOOTH_SVG_STYLE };
  const className = "tooth-svg l u 6";
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
    <SvgIcon className="tooth-svg l u big 6">
      <svg width="30.08" height="58.24" version="1.1" viewBox="0 0 30.08 58.24">
        <T16_IMAGE />
        <g fillOpacity=".65229">
          <path
            onClick={() => onColorChange("t16", "c2")}
            style={style_2}
            d="m15.142 7.124s0.41503 3.1381-0.13071 5.7829c-0.54574 2.6447-1.2043 5.225-1.766 6.6443-0.5617 1.4193-0.60094 1.4978-0.60094 1.4978s1.093 3.1014 1.5291 3.7607c0.43608 0.65929 0.39367 0.81577 0.6403 0.95883s0.44682-0.06792 0.44682-0.06792 0.18562-0.20465 0.3648-0.5342c0.17918-0.32955 1.6327-3.6411 2.1035-6.6266 0.47072-2.9855-0.26952-7.6524-0.26952-7.6524s-0.36342-2.0165-0.84188-3.5674c-0.47845-1.5509-0.81991-1.684-0.81991-1.684s-0.17741-0.19319-0.30934-0.19977c-0.13192-0.00658-0.17649 0.011961-0.22056 0.052136-0.04406 0.040175-0.12568 1.6356-0.12568 1.6356z"
          />
          <path
            onClick={() => onColorChange("t16", "c4")}
            style={style_4}
            d="m7.4479 4.1099s-0.55832 2.357-0.78809 4.7999c-0.22976 2.4429-0.68082 6.9645 0.63739 12.373 1.3182 5.408 1.4134 6.9575 1.4134 6.9575l3.8408-0.03617s-3.4336-8.4645-3.6233-14.126c-0.18967-5.6613-0.73468-9.9448-0.73468-9.9448s-0.051963-0.52694-0.3006-0.56149c-0.24864-0.034549-0.44497 0.53835-0.44497 0.53835z"
          />
          <path
            onClick={() => onColorChange("t16", "c3")}
            style={style_3}
            d="m22.515 5.4622s1.3198 3.2175 1.3944 8.8059c0.07497 5.6152-0.08771 6.8614-0.34789 10.522-0.25076 3.5284-0.21947 3.3101-0.21947 3.3101l-6.0019 0.12866s2.1603-6.5276 2.6411-11.283c0.48078-4.755 0.93533-9.0683 1.0648-10.82 0.12946-1.7517 0.69914-1.5079 0.69914-1.5079s0.17837 0.03467 0.23181 0.093744c0.05344 0.059074 0.53796 0.74988 0.53796 0.74988z"
          />
          <path
            onClick={() => onColorChange("t16", "c1")}
            style={style_1}
            d="m16.436 35.593s-0.34953-2.3165-1.7227-3.3574-6.9954-0.5771-6.9954-0.5771-1.0541 0.27458-1.7518 2.4356-3.7462 9.1949-4.0465 12.447c-0.30027 3.2521 1.3015 5.7895 1.3015 5.7895s0.61347 1.0794 3.0737 0.84805c2.4602-0.23136 2.6426-1.5422 2.6426-1.5422s0.34046-0.62239 0.67694-0.5647c0.33648 0.0577 1.2379 0.08465 2.2203 1.4017 0.98245 1.317 1.9544 1.4495 1.9544 1.4495s2.8407 0.13135 3.3673-1.4918 1.1398-2.4415 1.1398-2.4415 0.5616-0.19136 0.93257 0.06772c0.37097 0.25908 1.1504 2.3405 2.6277 3.2469s2.5641 1.0434 2.5641 1.0434 2.2911-0.85179 2.553-1.3656c0.83147-1.6309 1.7066-4.2734 1.1706-7.0593s0.13739-2.3998-1.6004-6.982c-1.7378-4.5822-2.8861-6.189-2.8861-6.189s-0.23704-0.61367-2.8692-0.34092-2.5362 1.0519-2.5362 1.0519-0.26042 0.3269-0.79798 1.3447c-0.53757 1.0178-0.43019 0.81779-0.43019 0.81779s-0.08072 0.26527-0.27899 0.22001c-0.19826-0.04526-0.30915-0.25216-0.30915-0.25216z"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};
