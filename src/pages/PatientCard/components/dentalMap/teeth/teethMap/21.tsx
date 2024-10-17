import SvgIcon from "@mui/material/SvgIcon";
import type { Segment2, FourZonesChart, FourZoneTooth } from "@types";
import type { FC } from "react";
import { TOOTH_SVG_STYLE } from "@utils";

type TeethMapProps = {
  tooth: FourZoneTooth;
  onColorChange: (tooth: keyof FourZonesChart, segment: keyof Segment2) => void;
};

export const T21Svg: FC<TeethMapProps> = ({ tooth, onColorChange }) => {
  const style_1 = { fill: tooth.segments.c1 || "none", ...TOOTH_SVG_STYLE };
  const style_2 = { fill: tooth.segments.c2 || "none", ...TOOTH_SVG_STYLE };
  return (
    <SvgIcon className="tooth-svg r u 1">
      <svg width="17.6" height="60.8" version="1.1" viewBox="0 0 17.6 60.8">
        <image
          width="17.6"
          height="60.8"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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
"
        />
        <path
          style={style_1}
          onClick={() => onColorChange("t21", "c1")}
          d="m7.8707 5.3562s-1.2489 5.1339-1.6896 10.261c-0.44061 5.1269-0.79521 7.049-1.0948 11.56-0.29964 4.5113-0.6575 9.7744-0.6575 9.7744l8.6661-0.21138s-0.43716-12.973-1.9908-22.536c-1.5536-9.5626-2.016-10.088-2.016-10.088s-0.3424-0.50444-0.65501-0.24632c-0.31261 0.25812-0.56239 1.4859-0.56239 1.4859z"
          fillOpacity=".65229"
        />
        <path
          style={style_2}
          onClick={() => onColorChange("t21", "c2")}
          d="m6.9787 41.859s0.11051-0.31962-0.98581-0.89078c-1.0963-0.57115-2.3205 0.30294-2.3205 0.30294s-1.0977 1.1712-1.3465 3.0171-0.50963 5.7145-0.50963 5.7145-0.19833 5.8374 0.088067 6.3317c0.28639 0.49432 0.25556 0.86811 1.1169 1.2925 0.21361 0.18672 2.2376 1.0226 5.7464 0.9994 3.5089-0.02319 4.8988-0.45365 6.1752-1.4133 1.2764-0.9596 0.64255-8.0786-0.35521-12.246-0.99776-4.1674-0.72942-3.6486-1.5429-4.4799s-2.6329-0.30278-2.6329-0.30278-1.0402 1.0252-1.3769 1.7327c-0.33663 0.70744-0.52205 0.9827-0.85806 0.9827-0.33601 0-1.1983-1.0408-1.1983-1.0408z"
          fillOpacity=".65229"
        />
      </svg>
    </SvgIcon>
  );
};
