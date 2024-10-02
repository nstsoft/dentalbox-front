import SvgIcon from "@mui/material/SvgIcon";
import type { Segment2, FourZonesChart, FourZoneTooth } from "@types";
import type { FC } from "react";
import { TOOTH_SVG_STYLE } from "@utils";

type TeethMap11Props = {
  tooth: FourZoneTooth;
  onColorChange: (tooth: keyof FourZonesChart, segment: keyof Segment2) => void;
};

export const T11Svg: FC<TeethMap11Props> = ({ tooth, onColorChange }) => {
  const style_1 = { fill: tooth.segments.c1 || "none", ...TOOTH_SVG_STYLE };
  const style_2 = { fill: tooth.segments.c2 || "none", ...TOOTH_SVG_STYLE };
  return (
    <SvgIcon>
      <svg viewBox="0 0 210 297" version="1.1">
        <g>
          <image
            y="9.3126507"
            x="52.848679"
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
          />
          <path
            style={style_1}
            d="m 89.826041,12.176043 c 0.381496,0.748173 0.650043,1.553814 0.79375,2.38125 0.371303,2.13789 -0.09335,4.319163 -0.264584,6.482291 -0.160162,2.023279 -0.06232,4.056766 0,6.085417 0.169793,5.526738 0.07829,11.094659 1.058334,16.536458 0.619314,3.438797 1.661522,6.790865 2.910416,10.054167 1.823754,4.765384 4.090133,9.355245 5.820833,14.155208 1.26815,3.517126 2.24308,7.131514 3.30729,10.715625 1.8193,6.127156 3.90398,12.180357 5.42396,18.388541 0.90747,3.70645 1.61193,7.46239 2.11667,11.24479 1.09868,8.2333 1.24862,16.56673 1.05833,24.87083 -0.29836,13.02044 -1.35342,26.51934 3.43958,38.62917 0.82798,2.09194 1.82985,4.13762 2.27372,6.34324 0.20309,1.00918 0.28753,2.04486 0.58719,3.02969 0.12439,0.40879 0.28647,0.81227 0.31907,1.23832 0.0163,0.21302 -9.2e-4,0.43056 -0.0704,0.63259 -0.0695,0.20203 -0.19335,0.38807 -0.36559,0.51448 -0.16715,0.12267 -0.37314,0.18498 -0.57963,0.20354 -0.2065,0.0186 -0.41461,-0.005 -0.61892,-0.0399 -0.69316,-0.11972 -1.35394,-0.3779 -2.03459,-0.55542 -1.22034,-0.31828 -2.4909,-0.37434 -3.74378,-0.51867 -1.70307,-0.19619 -3.38303,-0.55727 -5.08188,-0.7871 -4.10946,-0.55596 -8.277953,-0.33883 -12.424065,-0.25794 -2.9054,0.0567 -5.81301,0.0459 -8.715201,0.19374 -3.776723,0.19236 -7.558724,0.65745 -11.185294,1.72919 -1.352215,0.39961 -2.678297,0.88216 -4.000849,1.37107 -0.107483,0.0397 -0.214958,0.0795 -0.323172,0.11721 -0.04233,0.0148 -0.08532,0.0293 -0.130011,0.0328 -0.04469,0.003 -0.09193,-0.005 -0.127236,-0.0328 -0.02127,-0.0166 -0.03731,-0.0395 -0.04773,-0.0644 -0.01042,-0.0249 -0.01538,-0.0519 -0.01668,-0.0789 -0.0026,-0.0539 0.0092,-0.1074 0.01764,-0.16075 0.02087,-0.13123 0.02215,-0.26469 0.02339,-0.39757 0.05066,-5.45087 0.102996,-10.90298 0.339222,-16.34897 0.32925,-7.59059 1.015452,-15.16265 1.322917,-22.75416 0.93896,-23.18352 -1.658126,-46.399003 -0.79375,-69.58542 0.394634,-10.585858 1.510261,-21.181047 0.79375,-31.749999 -0.340998,-5.029915 -1.094216,-10.108521 -0.264583,-15.08125 0.27165,-1.628241 0.71223,-3.228869 1.322916,-4.7625 1.717803,-4.31396 4.773434,-8.033468 8.466667,-10.847917 0.886218,-0.675348 1.816269,-1.305322 2.8362,-1.753897 1.01993,-0.448575 2.138148,-0.711028 3.249217,-0.627352 1.224389,0.09221 2.412106,0.614806 3.307291,1.455208 z"
            id="11-1"
            onClick={() => onColorChange("t11", "c1")}
          />
          <path
            style={style_2}
            d="m 113.87005,183.1961 v 0 l -1.81901,-0.33073 -2.11667,-0.33073 -3.77031,-0.59532 -7.04453,-0.26458 -15.490896,0.3125 -8.652851,1.26285 -4.490128,1.44993 -1.169305,0.46773 -0.11693,0.0468 -0.04677,0.0234 -0.01169,0.18709 -0.479415,1.56686 -0.374179,2.05798 -0.280633,2.43215 -1.403164,11.03823 -3.554685,8.98026 -8.809297,23.05785 -1.5875,6.87917 1.322917,19.57917 3.439583,13.49375 3.704167,8.46666 11.906249,8.20209 18.520834,1.85208 21.166673,-2.91042 7.9375,-9.525 10.31875,-15.875 2.11666,-11.64166 -3.175,-10.31875 -4.23333,-15.34584 -2.38565,-12.35942 -2.80633,-15.34127 -1.6838,-11.03823 v -2.99342 l -0.14032,-1.02899 -0.23386,-0.46772 -0.65481,-0.0468 -2.45209,-0.68881 z"
            id="11-2"
            onClick={() => onColorChange("t11", "c2")}
          />
        </g>
      </svg>
    </SvgIcon>
  );
};
