import SvgIcon from "@mui/material/SvgIcon";
import type { Segment2, FourZonesChart, FourZoneTooth } from "@types";
import type { FC } from "react";
import { TOOTH_SVG_STYLE } from "@utils";

type TeethMapProps = {
  tooth: FourZoneTooth;
  onColorChange: (tooth: keyof FourZonesChart, segment: keyof Segment2) => void;
};

export const T31Svg: FC<TeethMapProps> = ({ tooth, onColorChange }) => {
  const style_1 = { fill: tooth.segments.c1 || "none", ...TOOTH_SVG_STYLE };
  const style_2 = { fill: tooth.segments.c2 || "none", ...TOOTH_SVG_STYLE };
  return (
    <SvgIcon className="tooth-svg">
      <svg viewBox="0 0 210 297" version="1.1">
        <g>
          <image
            y="-293.16449"
            x="-132.89153"
            id="image6606"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAABOCAYAAAAkaeahAAAACXBIWXMAAAsTAAALEwEAmpwYAAAG
                        VWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0w
                        TXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRh
                        LyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEz
                        LTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3Jn
                        LzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0i
                        IiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJo
                        dHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFk
                        b2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0
                        dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5v
                        cmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0Mg
                        MjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA5LTA3VDE3OjI3OjMzKzAzOjAw
                        IiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTA5LTEwVDEwOjQxOjM2KzAzOjAwIiB4bXA6TW9kaWZ5
                        RGF0ZT0iMjAxOC0wOS0xMFQxMDo0MTozNiswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlp
                        ZDo0ZGZjYmFlNi0xOTQ3LWUyNDUtYjE5NC01ZTFlZTNkODU2NzMiIHhtcE1NOkRvY3VtZW50SUQ9
                        ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowZWY4ZTVlNC0wZmE5LWUxNDgtYmQ2MS0zNjAwYmIwZjk4
                        ZDMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkOGQ3NmM2Ni03NTZlLWE0NDMt
                        OGQ4ZC03Y2VhZWM5ZDRjNmMiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1h
                        Z2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0i
                        Y3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpkOGQ3NmM2Ni03NTZlLWE0NDMtOGQ4
                        ZC03Y2VhZWM5ZDRjNmMiIHN0RXZ0OndoZW49IjIwMTgtMDktMDdUMTc6Mjc6MzMrMDM6MDAiIHN0
                        RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIvPiA8
                        cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NGRm
                        Y2JhZTYtMTk0Ny1lMjQ1LWIxOTQtNWUxZWUzZDg1NjczIiBzdEV2dDp3aGVuPSIyMDE4LTA5LTEw
                        VDEwOjQxOjM2KzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0Mg
                        MjAxOCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhp
                        c3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPkY4
                        QTlBRUM5QUQzNDEwRkRENEMwQzM4QTUzMTc1NTU0PC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90
                        b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwv
                        eDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+E7PjwgAABuFJREFUWMOtmU+PHEkRxX8RmVnV
                        PYPH3vWaExaIAwf4InwTrlyQ+A7c+QSIExcuKyTQwhUkkPhzWSNYadfGa3vt8Uzbnq6qzAgO9aer
                        Z7rH7rF7lKpRTdXryJcvIl7miLvzAT73AAGejjf0bW/8+be/8H/94Zdv+/ZnA+gPxhvxuqf/+Zuf
                        +CfLiljiu0b+APgO8HDvGw8+/bmfnJyAZ6qqOoSWei8Vr//3d/fmEceLjhgy3ukhwHkv8IsXL4gx
                        oqq4O13XHbyaO4Ht7As0BBBBVXBpD4C0sBe46zpUlRgjIsKBkox7gUt7ThsjRqDWSGlWh5Dw4NqI
                        QwjTuMlnJ7CIIK64OFYJXiuP/vYr/yDA4zWEQEqJ09NTDiZ6B3TPtQQ8BqiP6E4fvD8V48fdERFS
                        StMs3gvY3VCMII4vbmH1t7gTCk8/+5l/EI7dnRgjMUbquubs7Ow9qRCbgDsqwuKEauFIaHn++af+
                        QTgupbBYLKbIHz9+fPOIswkFgyDknIkxkpe3KEcndC//cXPgEMJUH8brYrGgqipU9ebAMSxQF9QF
                        twssFzj6NqW+y8eh4cnvf+rvpYqJmpwnnquqYrVa3SziooY4YE5NS9ut8OoES7cINZh2fPOfz/wG
                        CeJb0eecAVgul6SUSCnx/Pnzw2tFMAAfhmFe6PyItAx0qnhVwdl/b87xqAB33+I5pUTTNIcDN5aB
                        gLsCfXtqm0JdHUFY4FrjdgqP/ugHAe/Sas4ZGfhVVcyMsl5zIHAEDPfSX21YjlBjMWKifeVrVzdT
                        xbyT9J3dNq1rppYDqluglIINQAAuBmK4RIJHFEGkObxWjFGN0ZZSBgOj072DI1YNOBmkDFNPUN6A
                        XeAhUkSJCiWf3zzzxr7Xti2UQkrpSkYeliCuuG0WT8sK2peIHCNao2Lk/OpmEbv7VvS5bYkxTlpv
                        2/bAiB10+DEieEdgRV6fEkKiCzW1N0izOpyKXQ5zvV7D4I5U9QY6VnABVEAiASGR8W5FsUJIkRCU
                        rjuQinlizCtdzplSyqTl+XPvVI9z1xCmxbOeFu0Xsu1eoSEjSfDghwGPDmjuiBgU0rYtqoqqXuud
                        d3fp0pFxPOhW0RERuuYcpUFDQjTy1V9/7e/eTEvZ4nCukjHq0TtfXFwc0KXzBSIB1TglycYS9LxT
                        JTxF2jffcFDEczc0r8tmNnEbY9y7B9yd0pzj0mvZqOlKpMsVbZcwj3RZyAgeInRP4PGf/J1U0XMc
                        +65cH0+O3t1xsX5GbzJt22K2pnv1ivQ24Ddf/sU/+e6Pufv973F06yNMq36X2q8chg7yu+D2+UtK
                        /QVNvHMFWK7UhNW/HTM4XoJWoBU2qKSPuO8uKg1YhtU5uMOdH8m1EVsXEImYpb6vURA3EAEcHdNY
                        FLOISk3XtVci1n0aHodfUw9EBPZUwrizAIWABAEBGbqIj4nCIEEN/Valt6VvB1bVYdqX+t++fd6s
                        k++lYv3iS/caSIawABYzC6D0fUVQBDyCRIgKKbB+8dD3Auec+4iHqN1sSun5uDyTEMKVDNxQ8eqR
                        12J4XEKoQDJO6eMTAS9b9JiCqiCaQCFq3g1cmqavD2PEszpx2eHPO7js2bdMVGTvkAiiFXjArAPK
                        5DhRAZWhfjjqhgoQIq6B4AbnX/sVYHdHhs5w5VDkunMh0ak2+6xra6+Ghy5VhBRA0+CA+mE4hk+7
                        KPFeuqIOnoGEa41GI9tqG3g8A5prVfb8vqubj9qfz0p5/cxryXhKEOOmQ1wCGOvz7O4wAi6xl0ES
                        urOeZ2XmE3Zm3DURj8+N2g8hTO5IsebSizKdCW3RMXB8ZRHN+rUICQ8VWLOjuonArHFeBpFLM9qo
                        xdHZLqAHlmoD4D4E68g4HBTZeLlBy3NQ8L5uSOz1vHroussHX+7OV+rD5dnM1BFCgFKIhIhLIBQf
                        Ih449v7q4huON0dyvZZl/LsNWZp7VVlCCQEz28qufaco82e2ZqM6yLQ/Q5KUUJYfS5GIW4uUDlyB
                        QFHosCnTRh2LK+IK4jiGUfen501HKIXWFG7dEx0jNLOeiku7z30uf1TF5JhKoWma6TxfAZZ374s2
                        BlmAN7h2iCyBBS6Ki04dZHJIssB1icgrpH0JLWhW0kf3ZUvHZgZmG4fJ9s50bgxl2KECWClYzpSc
                        SbP/PkyF3vWYUjKhW0NpISlBql6iAGq4GUropVte98nUtJSmYc0Rx3fuy04ndPH0cw8JqqoiBwha
                        Y2N6a68cyqYIlVKQizWlFKp7P5RrLdb67JmzviBoRsSIaVt6fa3uJZo7sMURi+MTJC2ut1iL2/eE
                        28Drrx3rsNz0zdOs59X1dyL6JKREODqCVEOIVw48/w/oY/xfH0O2nQAAAABJRU5ErkJggg==
                        "
            preserveAspectRatio="none"
            height="283.14395"
            width="79.860992"
            transform="scale(-1)"
          />
          <path
            style={style_1}
            onClick={() => onColorChange("t31", "c1")}
            id="31-1"
            d="m 95.914078,290.3011 c -0.381496,-0.74817 -0.650043,-1.55381 -0.79375,-2.38125 -0.371304,-2.13789 0.09335,-4.31917 0.264584,-6.4823 0.160162,-2.02328 0.06232,-4.05676 0,-6.08541 -0.169793,-5.52674 -0.07829,-11.09466 -1.058334,-16.53646 -0.619314,-3.4388 -1.661523,-6.79087 -2.910416,-10.05417 -1.823753,-4.76538 -4.09013,-9.35525 -5.820829,-14.15521 -1.268152,-3.51712 -2.243082,-7.13151 -3.30729,-10.71562 -1.819299,-6.12716 -3.90398,-12.18036 -5.42396,-18.38854 -0.907469,-3.70645 -1.611934,-7.46239 -2.11667,-11.24479 -1.09868,-8.2333 -1.248617,-16.56673 -1.05833,-24.87083 0.298361,-13.02044 1.353421,-26.51934 -3.43958,-38.62917 -0.827979,-2.09194 -1.829846,-4.13762 -2.27372,-6.34324 -0.203093,-1.00918 -0.287525,-2.04486 -0.58719,-3.02969 -0.124387,-0.40879 -0.286473,-0.81227 -0.319072,-1.23832 -0.0163,-0.21302 9.2e-4,-0.43056 0.07041,-0.63259 0.06949,-0.20203 0.193354,-0.38807 0.365593,-0.51448 0.167146,-0.12267 0.373136,-0.18498 0.579634,-0.20354 0.206498,-0.0186 0.41461,0.005 0.618916,0.0399 0.693159,0.11972 1.353938,0.3779 2.03459,0.55542 1.220341,0.31828 2.490902,0.37434 3.74378,0.51867 1.703068,0.19619 3.383026,0.55727 5.08188,0.7871 4.109463,0.55596 8.27795,0.33882 12.424061,0.25794 2.905402,-0.0567 5.813014,-0.0459 8.715206,-0.19374 3.77672,-0.19237 7.55872,-0.65746 11.18529,-1.72919 1.35222,-0.39961 2.6783,-0.88215 4.00085,-1.37107 0.10748,-0.0397 0.21496,-0.0795 0.32317,-0.11721 0.0423,-0.0147 0.0853,-0.0293 0.13001,-0.0328 0.0447,-0.003 0.0919,0.005 0.12724,0.0328 0.0213,0.0166 0.0373,0.0395 0.0477,0.0644 0.0104,0.0249 0.0154,0.0519 0.0167,0.0789 0.003,0.054 -0.009,0.10741 -0.0176,0.16076 -0.0209,0.13123 -0.0222,0.26469 -0.0234,0.39757 -0.051,5.45087 -0.10311,10.90298 -0.33922,16.34897 -0.32909,7.5906 -1.01539,15.16266 -1.32292,22.75416 -0.93915,23.18351 1.65809,46.399 0.79375,69.58542 -0.39462,10.58586 -1.51025,21.18105 -0.79375,31.75 0.34099,5.02992 1.09421,10.10852 0.26458,15.08125 -0.27165,1.62824 -0.71223,3.22887 -1.32291,4.7625 -1.7178,4.31396 -4.77344,8.03346 -8.46667,10.84791 -0.88622,0.67535 -1.81627,1.30532 -2.8362,1.7539 -1.01993,0.44857 -2.13815,0.71103 -3.249219,0.62735 -1.224388,-0.0922 -2.412104,-0.6148 -3.307291,-1.4552 z"
          />
          <path
            style={style_2}
            onClick={() => onColorChange("t31", "c2")}
            d="m 71.870073,119.28104 v 0 l 1.81901,0.33073 2.11667,0.33073 3.77031,0.59532 7.044526,0.26458 15.490901,-0.3125 8.65285,-1.26285 4.49013,-1.44993 1.1693,-0.46773 0.11693,-0.0468 0.0468,-0.0234 0.0117,-0.18709 0.47942,-1.56686 0.37418,-2.05798 0.28063,-2.43215 1.40316,-11.038232 3.55469,-8.98026 8.8093,-23.05785 1.5875,-6.87917 -1.32292,-19.57917 -3.43958,-13.49375 -3.70417,-8.46666 -11.90625,-8.20209 -18.520838,-1.8520796 -21.166669,2.9104196 -7.9375,9.525 -10.31875,15.875 -2.11666,11.64166 3.175,10.31875 4.23333,15.34584 2.38565,12.35942 2.80633,15.341272 1.6838,11.03823 v 2.99342 l 0.14032,1.02899 0.23386,0.46772 0.65481,0.0468 2.45209,0.68881 1.45018,0.25386 z"
            id="31-2"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};
