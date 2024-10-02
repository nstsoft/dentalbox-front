import SvgIcon from "@mui/material/SvgIcon";
import type { Segment2, FourZonesChart, FourZoneTooth } from "@types";
import type { FC } from "react";
import { TOOTH_SVG_STYLE } from "@utils";

type TeethMap11Props = {
  tooth: FourZoneTooth;
  onColorChange: (tooth: keyof FourZonesChart, segment: keyof Segment2) => void;
};

export const T12Svg: FC<TeethMap11Props> = ({ tooth, onColorChange }) => {
  const style_1 = { fill: tooth.segments.c1 || "none", ...TOOTH_SVG_STYLE };
  const style_2 = { fill: tooth.segments.c2 || "none", ...TOOTH_SVG_STYLE };
  return (
    <SvgIcon>
      <svg viewBox="0 0 210 297" version="1.1">
        <g>
          <image
            y="2.6508107"
            x="50.177513"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABMCAYAAAAMTLXVAAAACXBIWXMAAAsTAAALEwEAmpwYAAAJ
                                    F2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0w
                                    TXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRh
                                    LyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEz
                                    LTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3Jn
                                    LzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0i
                                    IiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRw
                                    Oi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9i
                                    ZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8x
                                    LjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29t
                                    L3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5h
                                    ZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9w
                                    IENDIDIwMTggKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wOS0wN1QxNzoyNzozMysw
                                    MzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wOS0wN1QxNzoyNzo0NiswMzowMCIgeG1wOk1v
                                    ZGlmeURhdGU9IjIwMTgtMDktMDdUMTc6Mjc6NDYrMDM6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5n
                                    IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE2MzdmMWY1LWFiYzItMDg0ZS05M2M5LWNjNzVh
                                    MjIwOTlhZSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjljMzM2OTAz
                                    LTZjYzItZmU0Zi04OWQxLTBjNWYzYWI1MWJlNCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4
                                    bXAuZGlkOmJhMTdkNTE4LWIyYjYtMjk0MS1iYmE1LTAxOTQ0YmFhNzM2ZCIgcGhvdG9zaG9wOkNv
                                    bG9yTW9kZT0iMyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rp
                                    b249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YmExN2Q1MTgtYjJiNi0yOTQx
                                    LWJiYTUtMDE5NDRiYWE3MzZkIiBzdEV2dDp3aGVuPSIyMDE4LTA5LTA3VDE3OjI3OjMzKzAzOjAw
                                    IiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cyki
                                    Lz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlk
                                    OmJmOTRkYWZmLTY3NjUtNGM0ZC04MWI5LTQ2ZmM1Njg3MDBkYSIgc3RFdnQ6d2hlbj0iMjAxOC0w
                                    OS0wN1QxNzoyNzo0NiswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9w
                                    IENDIDIwMTggKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0
                                    aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFk
                                    b2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2
                                    ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9i
                                    ZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIg
                                    c3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNjM3ZjFmNS1hYmMyLTA4NGUtOTNjOS1jYzc1YTIy
                                    MDk5YWUiIHN0RXZ0OndoZW49IjIwMTgtMDktMDdUMTc6Mjc6NDYrMDM6MDAiIHN0RXZ0OnNvZnR3
                                    YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdl
                                    ZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0
                                    UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YmY5NGRhZmYtNjc2NS00YzRkLTgxYjktNDZmYzU2ODcw
                                    MGRhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmJhMTdkNTE4LWIyYjYtMjk0MS1iYmE1LTAx
                                    OTQ0YmFhNzM2ZCIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmJhMTdkNTE4LWIy
                                    YjYtMjk0MS1iYmE1LTAxOTQ0YmFhNzM2ZCIvPiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3Jz
                                    PiA8cmRmOkJhZz4gPHJkZjpsaT5GOEE5QUVDOUFEMzQxMEZERDRDMEMzOEE1MzE3NTU1NDwvcmRm
                                    OmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8L3JkZjpEZXNj
                                    cmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj+BtnoA
                                    AAczSURBVGjevZrLjiRHFYa/cyIiq8rT3Yw9YFuDxEUj5BUI2JgnYA1PwKOw8BaJNXs2IDasEBs2
                                    LDBeGGEvkC0ZezQeja259cx01y0jzmGRl8kuqqurerorpVRFV2dknvjjP/+5ZIm7/wL4EfB74L/s
                                    +RB378YHwEk7DkAFLAEDfDjp/t/e8xdPvuDo6IjbP/+tvIoBcTA+GYwLMFs34csP/+DPjo85unHj
                                    ShDQXSfMv/gL3zqqiclZLGb7N8DdCSGQUqKu6/0a8ODff3JSQEcJjQIh8/XHf/S9GXB6ekpKiRAC
                                    VVUxHo958ODB/hCol6eYKqZKrip8MkGmn8L9v/peDDAzVJspIkJVVYQQeHzv3n4Q8OUJIo3bL3UM
                                    4yNuVcbJww/YGwKdASLSo7BYLPZjQBTFcFCBNGrOcUQmic//8bttefDTSxvQrd7dERFSSsQYGY/H
                                    PH78eNvbjC/PAQrioAi5CCGOqasKRmNSvg93/7wNCvJKHBiOQwjEGIkxEkLg+OHDbW7zFfDOumB0
                                    MQISew50LrlIB3gsHMYXnDz5iJvrp/6sfdZD4K02wr4J/H0nA2KMiAjujrtTSiGlRFYlpcR0Oj1v
                                    6vuD8SeD8Tu7bYGm/uHRF1guVNURdThgNBJKmfH0/gc7qKLlnb2g8wSAnDNVVaGqhBBQVZ4/f76L
                                    Cny2oxcA5ohDIJPLHIsHzamCVglO71+jFLv3aqiqPRGrquq/28CDK0hI3MHaE8MsU3xMGt2EEJGY
                                    yLOn12fAKgd6QsbGmVR157iwkwHBDMNwcQRDBYorsZrgokiIJD+9XgS6fGCIwDBCDtXyyg0oqq2U
                                    C3gzFgJuAhpAA06+Xi8YFDKICCEESilnPOSyhcnFHNA0iAuAGEEML0vErTl1dI0JSRsLutV3qzaz
                                    Hp0hQle/BSJIKWj7QDxgZQFe9y4q4vvhwPBzmCldqxeAYwjGS0EqeYFQdob+0rXh6pFz7lFYVcqr
                                    3wIExVFePrDUpwSpcQzEd17Tzgh0atf5fCnlTMb8Kg2KrUmoqrgExBXKFHVFQ4Uzx72+PgTWrdLM
                                    zqCwKxl3QkAAF8UQ3AXEMF9QLPThOIRyvRwYVsdDNdwTAgXzggbBUdQdJSN5TkkJ00C6Ti+o6/pM
                                    PtARs67rvlJa/f+VGqBW46qYCB4KBcekzRVbQiYtPH3/Pb8WA3LOqGqvBate0dWIs9nsmjhgM1wC
                                    2cBs3JLPKSIoEDDGZGz7zPiXcVcOyGtNVyQdHrZe0cYDW5BLs0UnJyfb3vJXWxtgT/7jk7ff5Y3v
                                    fYfD129ShxEqidDudrEldT2jPvyER3fvbnvXj2Rrv51+7jafozcmkCKuI9wVNQcRIIMaLB7CixfY
                                    +A568PYFAcJ+vf0W5BG44aaIB7yUXh3cjEYYA+KH5GqEm5zH8J8AhlOB/mYHA/KFUc/dkVYHcs6k
                                    9Zf9i+ZVAAjLrQ3IZUZMCYuKEpqaQATcmh2Q0MiwJlBDysYiddl1ihT44db9oVYDGKIwGGsIZ+LF
                                    tkL08VYGBG9UQ2Lb5zLcC6yk464RQiKpwrO7fiVKOHvytYcQXiJwDhe8VceuYqqXyyuS4voFkiIk
                                    BRJ4bPKBwXTFwQqQcK0gGpkrMqCvittVd5XQal3QkNIbLqhuxYULr/BHn/k4CF6NQSfggkhAxNuz
                                    TUpoTvdGmDxGtBqxeHTPX8mAUgq07F5FZVMtKCFslSFdaICpQZJm9SScGqdGXJusGD1zm6ZmdNAR
                                    oiMCGU6/8ksZsDh+4DFG6PI/Nqx4UBW5GbSeoKqw4e3aRgOsnmJJoAKV1MYBaxiPNVogjbB33TOV
                                    0opcpGgiBMPK/HIG9Axf5/MtEus6Z2fqiEH1tJsBJ196UHBN2Eri5O548+KgUcMWCZc1hYw6LueW
                                    7D8+14CSc/8+YJ0/r1PC8yLlebxx90o3EIAgzT4jiiOYDB/SdMvE26L4jHvWbWNZNhom4ijwLnBn
                                    XfTrYjuD/R4q37qV96vtvrtACyLwz/XkCDRLDrgbIk5AKAgqjTdAc4nT9AXcQdqfGjhGwYi9Xqx/
                                    im6shN2xlsHdKlR1swKuwr0Gsa28QG/dkVk2xGokL3GbgmdEKmSQbHUcaLpj1iujYAQp/fZdSgdU
                                    leVyCV3na+VmQy34P+0YyPIGBDbHy9Gt74vMFBagZQFMwUuzWkk4sd37AdEkNCdzpCxwgyAH5/Xc
                                    6guDUTWZUC8W5Jz73hAb9lRWcoZhprwu1704Y/jGt6Wkm/h0gc4zYjMoUyQUVDNIQdQQHBXA51Cf
                                    osuMLJcsPcBrB+f0G3S7jGj8+puiquQWCTej1HXfJe8+c85Yzlgp5Pmc+XzevE0ZH54HmcouLZXp
                                    8bHHxTM0GKp+NhC546bUbixNCHHC5I23NpVmt4GZ7NxinT5xlqeY1WfemKgIQoQU4fD2ugd3P4zq
                                    ju8Cd+WyPd5LHAL8APi0/fubwKP/Aa55+53psPUuAAAAAElFTkSuQmCC
                                    "
            preserveAspectRatio="none"
            height="293.99875"
            width="123.78899"
          />
          <path
            style={style_1}
            d="m 135.73283,178.94705 c -0.25078,-0.0899 -0.50027,-0.18351 -0.74836,-0.28063 -1.00296,-0.39264 -1.98285,-0.84347 -2.99342,-1.21608 -1.85241,-0.683 -3.79562,-1.09813 -5.75297,-1.35639 -3.54513,-0.46775 -7.13633,-0.42574 -10.71083,-0.32741 -2.34408,0.0645 -4.69204,0.15321 -7.01582,0.46772 -2.50647,0.33924 -4.97258,0.93984 -7.39001,1.6838 -1.385576,0.42641 -2.756342,0.90005 -4.115948,1.40316 -1.183177,0.43782 -2.387036,0.90399 -3.648228,0.93545 -0.342936,0.009 -0.686288,-0.0154 -1.028986,0 -0.127653,0.006 -0.255476,0.0169 -0.383017,0.009 -0.127541,-0.008 -0.25645,-0.0358 -0.365338,-0.10268 -0.105588,-0.0648 -0.188555,-0.1653 -0.233863,-0.28063 -0.04046,-0.103 -0.05114,-0.21576 -0.04595,-0.3263 0.0052,-0.11054 0.02575,-0.21971 0.04595,-0.32851 0.403972,-2.17645 0.681893,-4.37551 0.861251,-6.58185 0.683026,-8.40212 -0.06393,-16.84445 -0.396875,-25.26771 -0.562651,-14.23478 0.05866,-28.48579 0.264583,-42.7302 0.17085,-11.818003 0.05568,-23.639272 -0.264583,-35.45417 -0.404027,-14.904875 -1.134177,-29.829613 -0.264584,-44.714583 0.119513,-2.045722 0.271491,-4.103875 0.79375,-6.085416 0.646043,-2.451201 1.842788,-4.722555 3.175,-6.879166 1.193055,-1.9313401 2.559551,-3.8454794 4.497918,-5.0270838 2.03384,-1.2398027 4.49755,-1.548915 6.87917,-1.5874999 1.69081,-0.027393 3.39968,0.069664 5.02708,0.5291666 0.53506,0.1510752 1.06388,0.3430843 1.53379,0.6402186 0.46992,0.2971342 0.88048,0.7064077 1.11204,1.2118647 0.28142,0.6142821 0.28039,1.3228736 0.17217,1.9898278 -0.10822,0.6669542 -0.3171,1.313924 -0.43675,1.978922 -0.25062,1.392859 -0.10416,2.821945 0,4.233333 0.13056,1.769058 0.19423,3.549706 0.52917,5.291667 0.57065,2.967873 1.90707,5.723263 3.175,8.466667 1.80774,3.911377 3.50234,7.876116 5.02708,11.906249 1.73784,4.593413 3.25474,9.271701 4.49792,14.022917 1.34474,5.139367 2.36814,10.359664 3.175,15.610416 2.39079,15.558412 2.87849,31.36266 2.38124,47.09583 -0.1785,5.64796 -0.48327,11.2911 -0.79375,16.93334 -0.3302,6.0006 -0.66449,12.05424 0.26459,17.99166 0.73831,4.71826 2.26488,9.29108 2.91041,14.02292 0.35844,2.6274 0.44238,5.28615 0.39688,7.9375 -0.0166,0.97025 -0.0506,1.94015 -0.0661,2.91042 -0.004,0.24808 -0.007,0.49622 -0.0165,0.74414 -0.005,0.12148 -0.0112,0.24298 -0.0248,0.3638 -0.006,0.0556 -0.014,0.11102 -0.0232,0.16619 z"
            onClick={() => onColorChange("t12", "c1")}
          />
          <path
            style={style_2}
            d="m 135.847,179.31829 c -0.86695,-0.42406 -1.74971,-0.81578 -2.64583,-1.17409 -1.47718,-0.59064 -2.99325,-1.09109 -4.54753,-1.4304 -2.35265,-0.5136 -4.7699,-0.65374 -7.17682,-0.7276 -3.11962,-0.0957 -6.24386,-0.0828 -9.35963,0.0992 -1.37154,0.0801 -2.74237,0.19311 -4.10105,0.39687 -1.59615,0.23937 -3.17152,0.60343 -4.72942,1.02526 -2.39689,0.649 -4.755518,1.43523 -7.077607,2.31511 -0.740665,0.28065 -1.491838,0.57411 -2.282031,0.62838 -0.583331,0.0401 -1.168467,-0.0521 -1.752864,-0.0331 -0.2427,0.008 -0.484783,0.0349 -0.727605,0.0331 -0.110278,-8.4e-4 -0.220713,-0.008 -0.330729,0 -0.04579,0.003 -0.09299,0.009 -0.132291,0.0331 -0.02599,0.0157 -0.04733,0.0385 -0.06305,0.0645 -0.01572,0.026 -0.02594,0.055 -0.03201,0.0848 -0.01215,0.0595 -0.0079,0.12091 -0.0042,0.1815 0.136,2.20664 -0.479837,4.38158 -1.058333,6.51537 -2.392911,8.82631 -4.243365,17.79504 -6.746875,26.59062 -1.878519,6.5998 -4.121098,13.08932 -6.35,19.57917 -1.17772,3.42914 -2.352116,6.85993 -3.439584,10.31875 -0.655153,2.08379 -1.280857,4.18727 -1.5875,6.35 -0.424404,2.99329 -0.225457,6.0683 0.529167,8.99583 1.12197,4.35264 3.438237,8.31456 6.133884,11.91146 2.695647,3.59691 5.784132,6.87812 8.682783,10.31354 3.125589,3.70438 6.198029,7.72541 10.583333,9.78959 2.271634,1.06927 4.784482,1.5478 7.290092,1.70771 2.50561,0.1599 5.01931,0.011 7.52658,-0.12021 3.62156,-0.18957 7.24955,-0.34276 10.84791,-0.79375 5.62936,-0.70555 11.23754,-2.17094 16.13958,-5.02709 3.10098,-1.80677 5.90959,-4.18266 7.9375,-7.14375 0.96039,-1.40233 1.73913,-2.9242 2.38125,-4.49791 1.44292,-3.53631 2.19464,-7.31989 2.64584,-11.11251 0.62605,-5.26242 0.68764,-10.57785 0.52916,-15.875 -0.18875,-6.30904 -0.69283,-12.63623 -2.11666,-18.78541 -1.35982,-5.87272 -3.54196,-11.51632 -5.55625,-17.19792 -2.06576,-5.8268 -3.96281,-11.72008 -5.42396,-17.72708 -0.9711,-3.99234 -1.74827,-8.02903 -2.64583,-12.03854 -0.10693,-0.47765 -0.21574,-0.9556 -0.36381,-1.42214 -0.12975,-0.40882 -0.28949,-0.80844 -0.39687,-1.2237 -0.0392,-0.15148 -0.0715,-0.30665 -0.0661,-0.46302 5.1e-4,-0.0149 0.001,-0.03 -7.9e-4,-0.0448 -0.002,-0.0148 -0.008,-0.0295 -0.018,-0.0402 -0.009,-0.009 -0.0206,-0.0146 -0.0328,-0.0179 -0.0122,-0.003 -0.0248,-0.004 -0.0373,-0.006 -0.0397,-0.004 -0.08,-0.008 -0.11693,-0.0234 -0.0301,-0.0122 -0.0571,-0.031 -0.085,-0.0475 -0.028,-0.0166 -0.058,-0.0314 -0.0904,-0.0345 -0.0265,-0.003 -0.0537,0.003 -0.077,0.0161 -0.0233,0.0129 -0.0425,0.0331 -0.0544,0.0569 z"
            onClick={() => onColorChange("t12", "c2")}
          />
        </g>
      </svg>
    </SvgIcon>
  );
};
