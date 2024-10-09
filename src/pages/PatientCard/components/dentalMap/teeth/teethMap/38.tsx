import SvgIcon from "@mui/material/SvgIcon";
import type { Segment4, FiveZonesChart, FiveZoneTooth } from "@types";
import type { FC } from "react";
import { TOOTH_SVG_STYLE } from "@utils";

type TeethMapProps = {
  tooth: FiveZoneTooth;
  onColorChange: (tooth: keyof FiveZonesChart, segment: keyof Segment4) => void;
};

export const T38Svg: FC<TeethMapProps> = ({ tooth, onColorChange }) => {
  const style_1 = { fill: tooth.segments.c1 || "none", ...TOOTH_SVG_STYLE };
  const style_2 = { fill: tooth.segments.c2 || "none", ...TOOTH_SVG_STYLE };
  const style_3 = { fill: tooth.segments.c3 || "none", ...TOOTH_SVG_STYLE };
  const style_4 = { fill: tooth.segments.c4 || "none", ...TOOTH_SVG_STYLE };
  return (
    <SvgIcon className="tooth-svg">
      <svg viewBox="0 0 210 297" version="1.1">
        <g>
          <g>
            <g transform="matrix(1,0,0,-1,-2.7258342,299.79307)">
              <image
                y="-23.331198"
                x="4.388947"
                height="324.39139"
                width="199.26901"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAABGCAYAAABVN21EAAAACXBIWXMAAAsTAAALEwEAmpwYAAAG VWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0w TXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRh LyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEz LTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3Jn LzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0i IiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJo dHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFk b2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0 dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5v cmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0Mg MjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA5LTA3VDEzOjExOjQ5KzAzOjAw IiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTA5LTA3VDEzOjExOjQ5KzAzOjAwIiB4bXA6TW9kaWZ5 RGF0ZT0iMjAxOC0wOS0wN1QxMzoxMTo0OSswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlp ZDo4MzNjZDAzZi1jZjU1LWMyNDItYjUyNS0zZmZlOGRjMTQ1YWEiIHhtcE1NOkRvY3VtZW50SUQ9 ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDphN2NmNzg2OC1kOWZmLTYwNGYtOTAzMC01ZjJjODc1NDE5 Y2IiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowM2IzZWNhNy0xNDlhLTQ1NGMt ODQ2Ni02Zjg5MjA4YWRjYzYiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1h Z2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0i Y3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowM2IzZWNhNy0xNDlhLTQ1NGMtODQ2 Ni02Zjg5MjA4YWRjYzYiIHN0RXZ0OndoZW49IjIwMTgtMDktMDdUMTM6MTE6NDkrMDM6MDAiIHN0 RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIvPiA8 cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODMz Y2QwM2YtY2Y1NS1jMjQyLWI1MjUtM2ZmZThkYzE0NWFhIiBzdEV2dDp3aGVuPSIyMDE4LTA5LTA3 VDEzOjExOjQ5KzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0Mg MjAxOCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhp c3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPkY4 QTlBRUM5QUQzNDEwRkRENEMwQzM4QTUzMTc1NTU0PC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90 b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwv eDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+OD+8nAAADXVJREFUaN7NmtuPXclVxn9rVdXe 55xut+9xPMbjRMGTTC5DFIkJDwgknnjJn8ArErwkiCek8B8QBEgIiQckHnhA0SCkCIg0CoMEIaMJ aGCScTBMpCQztmM74263+1z2pWrxsC/effpc7LESpaQt9dm7us7aX631rW+tOpgZ3ZVS+pyZfWx4 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 ClW9A/D/6+wBQKlxIVoAAAAASUVORK5CYII= "
              />
              <path
                onClick={() => onColorChange("t38", "c1")}
                style={style_1}
                d="m 96.911929,2.7095246 c -1.107477,0.1875347 -2.134885,0.7392789 -2.981049,1.4779826 -0.846163,0.7387037 -1.519317,1.6591705 -2.070344,2.637968 -1.077439,1.9138708 -1.699048,4.0465698 -2.245064,6.1739258 -1.387755,5.40689 -2.345173,10.919426 -2.993419,16.463802 -0.914979,7.825716 -1.214977,15.70811 -1.683798,23.573174 -0.31967,5.362862 -0.718141,10.721639 -0.935445,16.089624 -0.277678,6.859366 -0.259484,13.732196 -0.748353,20.579752 -0.392087,5.491934 -1.109965,10.961517 -1.309621,16.463807 -0.05453,1.50284 -0.07144,3.01708 -0.374176,4.49012 -0.112853,0.54911 -0.266048,1.10324 -0.211286,1.66115 0.04113,0.41905 0.198785,0.81907 0.396875,1.19063 0.474361,0.88977 1.176506,1.63271 1.852083,2.38125 2.072515,2.29634 3.996102,4.77411 6.482292,6.61458 1.368609,1.01315 2.891305,1.81701 4.497916,2.38125 2.369823,0.83228 4.897157,1.13807 7.40833,1.19063 3.68974,0.0772 7.37946,-0.38149 10.98021,-1.19063 2.60755,-0.58596 5.19525,-1.36448 7.54063,-2.64583 1.55293,-0.84841 3.01949,-1.94617 3.96875,-3.43959 0.5873,-0.92396 0.9588,-1.9727 1.19062,-3.0427 0.38461,-1.77524 0.39364,-3.60754 0.39688,-5.42396 0.0166,-9.30718 -0.0757,-18.617403 -0.52917,-27.913543 -0.45704,-9.368661 -1.28067,-18.716143 -2.24896,-28.045833 C 122.66702,48.318371 121.96999,42.22971 120.25312,36.385418 117.69064,27.662656 112.949,19.774845 108.87604,11.646876 107.99053,9.8797607 107.1277,8.0853739 105.94253,6.5035401 104.75736,4.9217062 103.20897,3.545405 101.33542,2.915626 101.15021,2.8533683 100.9625,2.7985913 100.77318,2.7502612 100.21128,2.606822 99.633301,2.5201725 99.053384,2.5187508 c -0.46443,-0.00114 -0.927018,0.05219 -1.389062,0.099219 -0.2514,0.025589 -0.503241,0.049365 -0.752393,0.091555 z"
              />
              <path
                onClick={() => onColorChange("t38", "c2")}
                style={style_2}
                d="m 149.07562,2.6424051 c -0.63456,0.1797522 -1.21376,0.5229449 -1.729,0.9346465 -0.51524,0.4117016 -0.97101,0.8920945 -1.41746,1.3775369 -1.30603,1.4200862 -2.56442,2.9230062 -3.3676,4.6772165 -1.08792,2.376107 -1.27263,5.057576 -1.30962,7.670635 -0.0672,4.743927 0.29695,9.481707 0.56127,14.21874 0.23649,4.23826 0.39321,8.480504 0.56127,12.722029 0.26428,6.670112 0.55668,13.345636 0.37417,20.018486 -0.227,8.299446 -1.18832,16.584094 -0.93544,24.882792 0.0933,3.061286 0.34986,6.152075 -0.18709,9.167347 -0.20843,1.170465 -0.54035,2.331016 -1.12253,3.367596 -0.74054,1.31853 -1.85166,2.38186 -2.80633,3.55468 -1.2925,1.58784 -2.31349,3.39741 -3.74178,4.86431 -1.1458,1.17678 -2.55245,2.11612 -4.11595,2.61924 -0.67697,0.21784 -1.3779,0.35331 -2.05797,0.56127 -0.27835,0.0851 -0.55709,0.18312 -0.84771,0.19946 -0.11009,0.006 -0.22046,5.2e-4 -0.33073,0 -0.0749,-3.5e-4 -0.14986,0.002 -0.22473,-8e-4 -0.0314,-0.001 -0.0634,-0.003 -0.0935,0.006 -0.0247,0.007 -0.0474,0.0215 -0.0643,0.0409 -0.0208,0.0237 -0.0324,0.0538 -0.0468,0.0819 -0.0128,0.0249 -0.0281,0.0489 -0.0351,0.076 -0.007,0.0266 -0.005,0.0545 -0.006,0.0819 -0.001,0.0491 -0.009,0.0977 -0.0175,0.14617 -0.0194,0.11456 -0.039,0.22911 -0.0548,0.34421 -0.0188,0.13652 -0.0323,0.27373 -0.0506,0.41031 -0.0186,0.13866 -0.0422,0.2766 -0.0661,0.41445 -0.0208,0.11999 -0.0418,0.23995 -0.0641,0.35966 -0.0292,0.15622 -0.0607,0.31202 -0.0951,0.46716 -0.14794,0.66637 -0.35072,1.32143 -0.62225,1.94769 -0.0687,0.15839 -0.14174,0.31495 -0.22217,0.46771 -0.1073,0.20381 -0.22758,0.40063 -0.35551,0.59217 -0.49551,0.74185 -1.10641,1.40435 -1.79016,1.97738 -0.97231,0.81488 -2.08589,1.44628 -3.23313,1.98782 -1.71058,0.80746 -3.50852,1.42416 -5.34372,1.88258 -3.41826,0.85385 -6.94617,1.15718 -10.45549,1.47063 -0.0316,0.003 -0.0634,0.006 -0.0951,0.004 -0.006,-2.9e-4 -0.0113,-7.3e-4 -0.0169,-3.6e-4 -0.006,3.6e-4 -0.0113,0.002 -0.0162,0.004 -0.006,0.004 -0.011,0.01 -0.0142,0.0163 -0.003,0.007 -0.005,0.0138 -0.007,0.0209 -0.005,0.0206 -0.009,0.0413 -0.0124,0.062 -0.29451,1.59008 -0.32457,3.21582 -0.34727,4.83278 -0.10495,7.47476 -0.0711,14.95245 -0.33073,22.42344 -0.0981,2.82199 -0.23798,5.64309 -0.26458,8.46666 -0.0102,1.08183 -0.004,2.16691 -0.13229,3.24115 -0.0158,0.13218 -0.0334,0.26801 0,0.39687 0.0206,0.0795 0.0609,0.15431 0.11825,0.21315 0.0574,0.0588 0.13194,0.10131 0.21248,0.11758 0.10085,0.0204 0.20566,-2.9e-4 0.30352,-0.032 0.0979,-0.0317 0.19218,-0.0745 0.29179,-0.10027 0.23615,-0.061 0.48476,-0.0227 0.7276,0 1.07029,0.1 2.14129,-0.11245 3.20921,-0.2352 3.04075,-0.3495 6.11073,0.0279 9.16735,0.18708 6.82921,0.35562 13.70936,-0.37967 20.49792,0.445 8.02158,0.97446 15.64259,4.10073 22.75417,7.9375 2.92257,1.57676 5.81116,3.29232 8.99583,4.23333 0.57767,0.17069 1.16508,0.31587 1.72046,0.54908 0.55537,0.23321 1.08472,0.56296 1.45454,1.03842 0.1035,0.13307 0.19551,0.27837 0.32668,0.38428 0.0656,0.0529 0.14085,0.0953 0.2227,0.11547 0.0818,0.0202 0.17058,0.0171 0.24784,-0.0166 0.0872,-0.038 0.15529,-0.11337 0.19452,-0.20004 0.0392,-0.0867 0.0511,-0.18397 0.0453,-0.27893 -0.0118,-0.1899 -0.0914,-0.36786 -0.14629,-0.55002 -0.1451,-0.4811 -0.11848,-0.99483 -0.0935,-1.49671 0.72973,-14.65939 -1.07651,-29.31953 -1.32638,-43.99494 -0.39972,-23.47654 3.18418,-46.923498 2.11666,-70.379166 -0.54146,-11.896998 -2.27682,-23.706665 -4.23333,-35.454167 -0.65617,-3.939871 -1.34322,-7.897865 -2.67473,-11.663528 -1.33151,-3.765662 -3.34994,-7.3629696 -6.3211,-10.0323048 -1.42949,-1.2842744 -3.07209,-2.3427815 -4.86682,-3.029622 -1.31815,-0.5044532 -2.71051,-0.8060933 -4.11595,-0.9354434 -0.76191,-0.070123 -1.54279,-0.088379 -2.27896,0.1201563 z"
              />
              <path
                onClick={() => onColorChange("t38", "c3")}
                style={style_3}
                d="m 55.91247,8.0546074 c 1.29538,0.427261 2.391555,1.4237916 2.939963,2.6727146 0.510559,1.162726 0.548496,2.471958 0.53454,3.741764 -0.05205,4.736214 -0.711949,9.442272 -1.069078,14.165289 -0.282335,3.733873 -0.375446,7.482349 -0.267269,11.225318 0.195907,6.778482 1.051076,13.531195 1.069078,20.312483 0.01736,6.538758 -0.727767,13.223626 1.069079,19.510677 1.175296,4.112285 3.385449,7.841323 5.612659,11.492589 2.149461,3.523807 4.337577,7.02611 6.681737,10.423508 1.67045,2.42099 3.419219,4.78737 5.078121,7.21628 0.874861,1.28094 1.725416,2.58023 2.672697,3.80859 0.974633,1.26382 2.04787,2.44765 3.107007,3.64155 1.977945,2.22961 3.933758,4.52055 6.342978,6.27528 1.765625,1.28598 3.756781,2.26397 5.858629,2.85845 2.092157,0.59174 4.27553,0.802 6.449219,0.85045 0.37005,0.008 0.74034,0.0119 1.1103,0 0.0236,-7.6e-4 0.0473,-0.002 0.0709,0 0.0337,0.002 0.0668,0.009 0.10023,0.0139 0.0334,0.004 0.0679,0.006 0.10057,-0.002 0.008,-0.002 0.0159,-0.005 0.0242,-0.006 0.004,-4.4e-4 0.008,-4.3e-4 0.0124,3.3e-4 0.004,7.6e-4 0.008,0.002 0.0114,0.005 0.005,0.003 0.008,0.008 0.0101,0.0131 0.002,0.005 0.003,0.0106 0.004,0.0161 0.003,0.0152 0.004,0.0306 0.006,0.0459 0.003,0.0224 0.009,0.0448 0.007,0.0674 -0.001,0.0151 -0.005,0.0298 -0.009,0.0444 -0.005,0.0195 -0.009,0.0392 -0.0134,0.0589 -0.0196,0.0976 -0.0285,0.1969 -0.0413,0.29559 -0.0158,0.12167 -0.0374,0.2425 -0.0558,0.3638 -0.046,0.30279 -0.0721,0.60823 -0.0951,0.91364 -0.0256,0.34082 -0.0473,0.68194 -0.0662,1.0232 -0.16718,3.02557 -0.10923,6.05834 -0.11615,9.08852 -0.007,3.11089 -0.0827,6.22119 -0.1637,9.33104 -0.0652,2.50245 -0.13399,5.00481 -0.21048,7.50694 -0.0906,2.96192 -0.19191,5.92371 -0.23386,8.88671 -0.002,0.14681 -0.004,0.29363 -0.003,0.44045 2.3e-4,0.0331 6e-4,0.0661 0,0.0992 -0.007,0.39504 -0.15402,0.779 -0.14883,1.17408 0.001,0.11037 0.0148,0.22134 0,0.33073 -0.003,0.0252 -0.008,0.0505 -0.0186,0.0739 -0.0102,0.0233 -0.026,0.0448 -0.0475,0.0584 -0.0241,0.0152 -0.0537,0.0196 -0.082,0.0176 -0.0284,-0.002 -0.056,-0.01 -0.0833,-0.0176 -5.501004,-1.56476 -11.371101,-1.11113 -17.015491,-0.18897 -3.287565,0.53711 -6.55585,1.2301 -9.72861,2.24507 -5.717118,1.82892 -11.073885,4.68603 -16.83798,6.36102 -2.237971,0.65033 -4.529,1.11977 -6.735191,1.87088 -2.243285,0.76374 -4.403957,1.81965 -6.735193,2.24506 -1.603344,0.29258 -3.258286,0.27753 -4.864304,0 -1.059447,-0.18308 -2.123268,-0.49104 -2.993419,-1.12253 -0.654328,-0.47487 -1.180885,-1.12664 -1.496711,-1.87088 -0.543157,-1.27995 -0.44475,-2.72731 -0.374176,-4.11595 0.316731,-6.23206 -0.119742,-12.47395 -0.374177,-18.70887 -0.376394,-9.22351 -0.354348,-18.45796 -0.374179,-27.68912 -0.01724,-8.02449 -0.07474,-16.12644 -1.870887,-23.94735 -0.86691,-3.774753 -2.131959,-7.449322 -2.993416,-11.225323 -2.123178,-9.306464 -1.742649,-19.052311 0,-28.437477 0.911507,-4.90899 2.188579,-9.74122 3.367595,-14.592916 1.708299,-7.029719 3.217941,-14.127446 5.612659,-20.953907 1.795878,-5.119388 4.094243,-10.082689 7.10937,-14.592935 0.561346,-0.839702 1.152119,-1.6690105 1.884085,-2.3650224 0.731967,-0.6960119 1.618692,-1.2573466 2.606042,-1.4702985 0.887911,-0.1915048 1.809448,-0.095072 2.712787,0 0.500105,0.052633 1.00065,0.1046425 1.496708,0.1871134 0.491703,0.081747 0.978436,0.1933747 1.456621,0.3340629 z"
              />
              <path
                onClick={() => onColorChange("t38", "c4")}
                style={style_4}
                d="m 172.45604,181.27343 c -0.21008,-0.42585 -0.50397,-0.81016 -0.8599,-1.12448 -0.6916,-0.61074 -1.58223,-0.93613 -2.44739,-1.25677 -1.77085,-0.6563 -3.53131,-1.34839 -5.22552,-2.18282 -1.13279,-0.55792 -2.23348,-1.17826 -3.34037,-1.78593 -3.55603,-1.95223 -7.18972,-3.78026 -10.9802,-5.22552 -4.07953,-1.55547 -8.33516,-2.66242 -12.66693,-3.20808 -2.79528,-0.35211 -5.61624,-0.47052 -8.4336,-0.46302 -2.71227,0.007 -5.42384,0.13079 -8.13593,0.0992 -2.51511,-0.0293 -5.02645,-0.19196 -7.53869,-0.31558 -0.90376,-0.0445 -1.80798,-0.0839 -2.71278,-0.0935 -1.06645,-0.0113 -2.13566,0.019 -3.19267,0.16107 -0.37511,0.0504 -0.74836,0.11486 -1.12448,0.1571 -0.58741,0.066 -1.18239,0.0774 -1.7694,0.008 -0.0771,-0.009 -0.15406,-0.0196 -0.23151,-0.0248 -0.0551,-0.004 -0.11039,-0.005 -0.16537,0 -0.0849,0.007 -0.16841,0.0277 -0.24805,0.0579 -0.0599,0.0227 -0.11756,0.0509 -0.17733,0.0739 -0.0598,0.023 -0.12243,0.0409 -0.18647,0.0419 -0.0921,0.001 -0.18114,-0.0324 -0.27285,-0.0413 -0.13251,-0.0129 -0.26451,0.0262 -0.38861,0.0744 -0.0589,0.0229 -0.11871,0.0483 -0.1819,0.0496 -0.0391,8e-4 -0.0777,-0.008 -0.11575,-0.0165 -0.4118,-0.0948 -0.81508,-0.22304 -1.2237,-0.33073 -0.989895,-0.26089 -2.007763,-0.40044 -3.026172,-0.50436 -1.461072,-0.14909 -2.930167,-0.22606 -4.398698,-0.2067 -1.858686,0.0245 -3.71232,0.20318 -5.556249,0.43821 -2.193039,0.27953 -4.37616,0.63906 -6.54017,1.09141 -2.506738,0.52399 -4.990406,1.17343 -7.402279,2.03434 -3.696152,1.31933 -7.202632,3.1272 -10.895312,4.45622 -2.934578,1.05617 -5.969217,1.80371 -8.96276,2.6789 -1.514489,0.44277 -3.020101,0.91877 -4.497916,1.47175 -0.998041,0.37346 -1.984899,0.78252 -3.009636,1.07487 -0.911398,0.26002 -1.849467,0.42634 -2.794661,0.49609 -1.35311,0.0999 -2.717792,0.002 -4.051433,-0.24804 -0.471075,-0.0881 -0.940304,-0.19559 -1.389062,-0.36381 -0.384094,-0.14398 -0.751769,-0.33223 -1.091406,-0.56224 -0.267535,-0.18118 -0.520971,-0.38999 -0.819092,-0.51459 -0.08141,-0.034 -0.166149,-0.0616 -0.253682,-0.0727 -0.08753,-0.0111 -0.178243,-0.005 -0.260811,0.0259 -0.110448,0.0416 -0.201268,0.12691 -0.262556,0.22777 -0.06129,0.10087 -0.09471,0.21669 -0.111623,0.3335 -0.0382,0.26383 0.005,0.53185 0.04677,0.79513 0.434736,2.73724 0.732909,5.51984 0.467723,8.27867 -0.524152,5.45296 -3.190277,10.42787 -5.612662,15.34127 -2.835025,5.75037 -5.419501,11.68571 -6.735191,17.96051 -1.61979,7.72512 -1.26765,15.73079 -0.374178,23.57317 0.616853,5.41438 1.527296,10.92015 4.115951,15.71545 3.083586,5.71212 8.282785,9.94255 13.470383,13.84456 5.395113,4.0581 10.93881,7.94276 16.83798,11.22532 3.989035,2.21968 8.20816,4.18287 12.722029,4.86431 7.646966,1.15442 15.336528,-1.45728 22.450642,-4.49013 5.082008,-2.16653 10.061541,-4.56846 14.967091,-7.10937 3.3197,-1.71949 6.74368,-3.54275 10.47697,-3.74177 3.67522,-0.19592 7.25339,1.21741 10.47697,2.99342 5.49197,3.02577 10.44908,7.20822 16.4638,8.98025 3.74979,1.10474 7.77924,1.20303 11.5995,0.37418 3.83994,-0.83312 7.42339,-2.56927 10.85114,-4.49013 4.91683,-2.75531 9.64757,-5.96116 13.47038,-10.10279 5.71971,-6.19674 9.19287,-14.4089 9.72861,-22.82481 0.50806,-7.98117 -1.5299,-15.8878 -3.74177,-23.57317 -3.04519,-10.58083 -6.45791,-21.06857 -10.66405,-31.24381 -0.89014,-2.15337 -1.81842,-4.3003 -2.43216,-6.54811 -0.20319,-0.74417 -0.37131,-1.4974 -0.56126,-2.24506 -0.18377,-0.72333 -0.38801,-1.44162 -0.55258,-2.16956 -0.0873,-0.38609 -0.16341,-0.77487 -0.26459,-1.15756 -0.0344,-0.1302 -0.0721,-0.26233 -0.0661,-0.39687 0.003,-0.0578 0.0132,-0.11526 0.0113,-0.17307 -9.6e-4,-0.0289 -0.005,-0.0579 -0.0147,-0.0852 -0.01,-0.0273 -0.0249,-0.0528 -0.0461,-0.0725 -0.0195,-0.0181 -0.0439,-0.0309 -0.0699,-0.0367 -0.026,-0.006 -0.0535,-0.005 -0.0789,0.004 z"
              />
            </g>
          </g>
        </g>
      </svg>
    </SvgIcon>
  );
};