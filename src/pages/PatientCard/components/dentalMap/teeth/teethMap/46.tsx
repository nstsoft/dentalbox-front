import SvgIcon from "@mui/material/SvgIcon";
import type { Segment4, FiveZonesChart, FiveZoneTooth } from "@types";
import type { FC } from "react";
import { TOOTH_SVG_STYLE } from "@utils";

type TeethMapProps = {
  tooth: FiveZoneTooth;
  onColorChange: (tooth: keyof FiveZonesChart, segment: keyof Segment4) => void;
};

export const T46Svg: FC<TeethMapProps> = ({ tooth, onColorChange }) => {
  const style_1 = { fill: tooth.segments.c1 || "none", ...TOOTH_SVG_STYLE };
  const style_2 = { fill: tooth.segments.c2 || "none", ...TOOTH_SVG_STYLE };
  const style_3 = { fill: tooth.segments.c3 || "none", ...TOOTH_SVG_STYLE };
  const style_4 = { fill: tooth.segments.c4 || "none", ...TOOTH_SVG_STYLE };
  return (
    <SvgIcon className="tooth-svg">
      <svg viewBox="0 0 210 297" version="1.1">
        <g>
          <image
            y="-312.16962"
            x="-5.1152802"
            id="image6455"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAABKCAYAAAArHg1FAAAACXBIWXMAAAsTAAALEwEAmpwYAAAG
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
                MjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA5LTA3VDEzOjQzOjU4KzAzOjAw
                IiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTA5LTA3VDEzOjQzOjU4KzAzOjAwIiB4bXA6TW9kaWZ5
                RGF0ZT0iMjAxOC0wOS0wN1QxMzo0Mzo1OCswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlp
                ZDoyYmQyM2YwOS1jYzU3LTlmNDYtOWUwOS1hMzUzNjQ0YTBkZWIiIHhtcE1NOkRvY3VtZW50SUQ9
                ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyY2UxNzA1My0wMDk1LTAyNDItYTkyZC1hNzYxNTk5ZmVk
                MmEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozZmM2M2UxYi1iOGMzLTBiNDUt
                ODgwZS04MmUyOTgwY2EyYjgiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1h
                Z2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0i
                Y3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozZmM2M2UxYi1iOGMzLTBiNDUtODgw
                ZS04MmUyOTgwY2EyYjgiIHN0RXZ0OndoZW49IjIwMTgtMDktMDdUMTM6NDM6NTgrMDM6MDAiIHN0
                RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIvPiA8
                cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MmJk
                MjNmMDktY2M1Ny05ZjQ2LTllMDktYTM1MzY0NGEwZGViIiBzdEV2dDp3aGVuPSIyMDE4LTA5LTA3
                VDEzOjQzOjU4KzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0Mg
                MjAxOCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhp
                c3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPkY4
                QTlBRUM5QUQzNDEwRkRENEMwQzM4QTUzMTc1NTU0PC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90
                b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwv
                eDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+d/O40wAADV5JREFUaN7Vm9uPJNddxz+/36lT
                VT3dO7tj79rOhuCYBCFCCCKK8oIEDzzxRyBe+A/yhECChzzwiHhDQYoQISCUiBcUFJBQgoKQycax
                wHZsR2vH65X34t2dW9/qcs6Ph7pMT093T896jJQjlaa665yqb/0u39/l9GBmtMeXF85PHdHs18yM
                GOOZOTHGz69b1x5/ama/155/8Zy5q47fMLPfMbOXlq8pzXgRmLJuWDAAEfnv5Usi8pqZPcv68Z/A
                vwCfB17h4sOA7wO/uHwhaW/62vq18QvAg013F5HHGy6X7d/XngL4rwPvt+fHZ19rtaq+0v7NLY6T
                p1D1whF2Ptr69cdWk975yY++ugHchpcrf//jAr5o8+vH7a/box9/7Y+Pf/Y9W7qSAy8BnzULzy9e
                uHPrb+3Vb3/FePDPf7CNbdz+wdfsjW/9oU1vfdUuYlMKfG7ThCePHzMYDLhz587ypTnwLuibIu6U
                TxwdHeGc44O33/7dbUAURcFgMOCDDz7gouDTjTeePCZPauL+q9vfdfoBzw6OGD/83+3mF/tkSQHh
                6MLgN6Kq65okSS500xAC3nvyPOfNl79lSwQxBIar5qdpemHwG0csJ6Qa2E0LPvz+H51rk/Xd71gS
                p+ByXDqkvv/DZVqdAJPTiw4xlyI+583v/aVdGvgQAiJClmXs7++viSKxV01ZNrSuqmRZRl3X50ch
                s35Nt/5SwNciqAOnBjZfNeUTmHza4EWDPCkOUReJHiwVBvmc8St/sVaa5VvftNTVOOdQVSgOtgZ/
                rjGLCADOObz3q6bc6+YAzGYzVBVVxTmHc47Dw0NGa+4/m81wziEiqCohhMuTvBpEDM08liW8+a9/
                vtEm69k9vCqVy6hcxo4zwvz+2vnV8V2cC0QVogqO2eWBFxFEBOccaZoynU43s+R0ekrqzjnm8/na
                +ePxuNeqqvb2fzlsE+aIGdE5NBmQuSfY23+39gnV5DG5lkR/BbKruASM9U4b5o8YqGHOU8oOpnKJ
                DrvAFt57RGQt63TslCRJb8Od9DfNd86RZdmFU85zwad+AOYo3YiQDhmKURy9s15TGiEBw+GSDBIP
                iefOD//mjLYev/Edwzs085CNiGSoCfWb37RLYRuAGCM7eU4IgZAkzGbrnapjmtqsl7yIrFxzcHCA
                976nyW7uInt9JMkjASRg/irBXcH5kjoer5z6/o++YS5JcUlKNEOdA5+BzwiTw7MmeXwXUk9MHGiK
                uAxQROxywHfe75wjSRKSJFnLCJPJpLdvM+tZyjlHURQrs8kub+ok3hcal0OVihlUUZAFG7736t+f
                eYJNDyD1BKdEdUR1kGSYS6nDh6cnv/OPRriP+JTKOSAlEhCLhHB8SWazoIFOit57njx5sjYPcs51
                nYVeost2fHxw0Guys/dOA9vmN1uDr+uIaoL6FJdm1MfvngVfP4HEEVUARTXB1OHUkyVCfPsfem1N
                9l9nlJRY7jEdNL7VCkk1vVzwMcaeSbz3K3MQaxlmMTp3tr/MOIeHh33cEBFijL2mnobnd9pjCZEi
                OGI1xWugSEfgdxmlJfsv/1kvSXv726ZSIeJQTZBQorHCVBCneImE6iS4mRg+85imRCeYBSTUIAbE
                bbDvKXAN+GLbdJqus/e6rokx9jaa5zmPHj06SQuqqo+qnQYWWUNVqaoKgFv//g0bDAZ9lrrIUBcY
                IwVubOpkOZ8QMYgT6mKMS64Q0hGD1AjlCSuU5RFOIxEITk5eGkgSj5qhzOHBP1l68Crs7BCyDMMj
                mhDqEqFqpbVV7My2yio7IPP5vM9bsiwjz3Ne/u7XrfMJoOfthV5mr4nj42PuvP463nsGg0HPSs45
                Qgi95NfUDSvTg59upkjBTMiYU4VjfDIkJgnlzg6+ilx9+F/MX7lnUgVyEyQ0a9SBEYgxIFozTOY8
                fPiQJPU889x1SG9Q6AAxh+Cxch/VmiAR3OhyKinnXM80i3YvlZDnOVy5wu3btxEcg8EAVe0ZpKqq
                pjOQJEyLAlXlypUr5HlO7RxVjKjzmBmhrk8x1RbDnQtek5S6LBFTlEg5n5Imyqx0ZKkguzlDcuZP
                HlFOj6hnMEr3SLVAiwopxhztHzCZzBiNdrG9GxQ7VzAiIoYmQrQak4jEgEbDbee3o2SbyNrxdccq
                WZY10kUYDoeksWZggclkwoMHDzg4niDZiLquseIYQuTaaMTu7i5FliGqDQlwoiFtfeQCPO/PBR/r
                ppJCDcVR1WMsqUmAGsHtPE+y8wIz/yGaH3KtPqCczbHJPqkImqf4fEg9vME0z8nztDG/aoKIIdSE
                UKPiMHWIGHWYskWMPZ+TuqhnZkjLPnVd91FxOp1y7do1bt68yfwwpZxEbGcIoV2XKEm2g432SJKE
                2WxCWZb4pPGlRZbpNF1V1Tbg8/NtHodKkyU6Ik4g1iUqDWU69jk+2Ke++kmGz/0SmX2OsiypQ9HS
                ngMJ1PPHTMcHhNgCD22Aj1Wj2TayOjHcll3FC9t8Fy0ttvbZXjs4OGB8XDMYPIP3niRJes0U5RTq
                Y5zFhUjaZZpt7rOU028xfnAu+DrMSXx+Klg1oCOIEFEMYyBzLMwoju5xquxQwUmTZYoKYgkWDaR3
                2ea+UZq8CCGE8eXwfBcde4nISYa5ustgp7LJfhdDtfEfZGWlZnZS/27bNTsffChxMiC25hJa1ReV
                J5BBkqMMcIMUpylRGyp0HdhQE2JBFedYXSLMoS4QKfASEY24CKKGWWhtXy8HfFcddfm2Jo48z7mS
                7ZHt7JHkI9AhpBmIB0m7pKgRZwwgNVgB5RzqMfV8wmy2Tzk9pg5F07sRIYTQ50Ibdge7N5slZrYj
                Imt7eAU7lDLEBr/CYPclstEzDPIR6k+TmS0VEr1vuIXzgWCiJLvC0GqGoWQ+H1Mc36c6uk8xucu8
                qqhlreQD8JNW6PNkE3CAvb09bn7mM3DzsyDXQXOISmw1sszRi459iqna8yidnUcS59gZjdgZfQKe
                HfDc9QH36ord3d11cN7oXAxANtHS+OF7lvqadDgE704BlW4bVLp4IP3nxZfS1kEbbuk2tEHahd18
                ESAajOfEAPrMi3J+DNqUPLSdW1o7XJTqqnx/8fOquYv9mVUb2cQIF+zbJOtTg4AlEbRupspJe8Kk
                kdpJge3aiGkQDbFWG9JIvf/cWNDCfRwmDhEFBNSIVmyD/bd1eWduVceAludZ2oFe5aDLkt303eK6
                rhJj+wj7H4nBdYGzjcTxI/NWIJKAMyw6RBWx+rQTdhGmjZi9E3DKxHuL7+ZbH4ClsV3NGlp1c0y3
                N5tqZXAqy75eXbThj2OcknSrlfL4w3PfQAXurNzhCEdoIphLsZCC6IkUT5mMNkfnBBcci8xkKuAU
                EkeoC56abZo8ZsFeF/KVyx69dtt8adv8ZiXT1OMHJj4BpxgOEQ8YZpEOe8QQlYbePpLJtD1K0jYi
                O1CHxqeUfFVVTRdrwebXSetSJd9qebFrfDHw5dismjf9Q7foTNJxRfOwls85c3UJ2Jrv1zltNAFx
                pCKw/65tDT5ixkKPfVm6i851mZJfrtK6+uE8u9fTH0SoZzhdBHoSWWPLT4uk0pFMFMXU9eSzSH2L
                4jshJUVkUUAJZg7MN7pyEKy+mMNaG1Vl6aHL/fZe+kJfCTUv22qG1VoybGOtfBK99OJs0/TVjSCK
                oq28IzBAiGCzPkL2tt+8dQtSFvWIiPUaFBG0671Lw179q4gDHFEiRsRtYZrJio3UZru+l3BbEXHS
                LViVLZ7tM8rp/GBdRG1BOnW9Vhqmqc7NcVaAH1DWh2RVCWqYatObktDsDLoR0SIaayIVsc1DXOzy
                81YDsXU2dSemBYikfYrdSFpQSXuN2AXo+Kxh7d6QrpZkRQ4vbb9FWlZYZIfFbHFVzt45h6ii3a63
                ujN5fZdhxnMC4NpKqrj3U8sGHnIFJ82vPsQDWaMwOSkrDYNYtjeMJ+ZiBlYt2HTLVlFB2768tOl2
                rNq5JQSDaUVVCP75l+TC3YNsNKKcHiFI80OhrtFkAaGpRRuIdbO7IdZburVdAzMjhqplkmYH3dri
                umOm0JqXE2vafhhVUSBVwA+uPp3k+/3SR++bDzWpF/DaCF6kbXMIRmhBx0ZiITYMVHGrqmJRRf0t
                VcXFCp+5XpO4tC/EG4oMUEeYB0IZmaRX2b16XT4S+GbT9J7FcopZTdhpJCjtRm+U2PXCsSoQqxqr
                6lsq6V/7G7/8V6cyjwdvmWStJl3a7hi2L2+BUFQwq/F+AHvnF+Ad+C+1PZEfn7dg+uh901jjXeyT
                pxgjVaCJkD4j33th7YNnj++ahArvug1na5tbEYsp/rlPbZ13dOC/APzP1snI9EOzYkwIoWcbfA7D
                F2Tb9ZTTtjvWmI0mHnY/daGESWKML4rIe/wcDm2Bf+nnEnz79xbw5ae/TfzklqnvS5daPl5wv38V
                8By4CfrOORP3gP3LBL+pxf2b7fWHwHtP2TH8WMdFJP8LwK8C/7b03V2af7/oAuz+Bgl/GvjZ/4fk
                l8fd9vgT4C3gu+3n7ocCj8xsKCKLwF8A7p+qNMED3sxURMYfBfz/ASivre36PE+cAAAAAElFTkSu
                QmCC
                "
            preserveAspectRatio="none"
            height="336.43414"
            width="213.681"
            transform="scale(1,-1)"
          />
          <path
            onClick={() => onColorChange("t46", "c1")}
            style={style_1}
            d="m 91.578089,291.69779 c -0.655616,-0.41728 -1.142604,-1.04854 -1.59026,-1.6838 -0.749736,-1.06394 -1.431166,-2.18029 -1.96443,-3.3676 -1.300917,-2.89649 -1.679317,-6.10832 -2.05797,-9.26088 -0.516596,-4.30103 -1.062352,-8.59901 -1.49671,-12.90912 -1.273402,-12.63591 -1.58752,-25.35714 -2.99342,-37.979 -0.564365,-5.06674 -1.304108,-10.11216 -2.05798,-15.15419 -0.596027,-3.98633 -1.201084,-7.97204 -1.6838,-11.97367 -0.611024,-5.06529 -1.075971,-10.32059 -3.55468,-14.78001 -0.308033,-0.55418 -0.647382,-1.09625 -0.861543,-1.69302 -0.214161,-0.59677 -0.294575,-1.26727 -0.0739,-1.86166 0.126995,-0.34206 0.345904,-0.64091 0.56126,-0.93545 0.736234,-1.00694 1.46294,-2.02169 2.24507,-2.99341 1.411967,-1.75423 2.999806,-3.36188 4.67721,-4.86431 2.107523,-1.88768 4.378879,-3.62491 6.92228,-4.8643 2.801911,-1.36537 5.881301,-2.09842 8.98026,-2.43216 3.209247,-0.34562 6.541771,-0.25629 9.541521,0.93545 2.72806,1.08381 5.02169,3.00894 7.29646,4.8643 2.43262,1.9841 4.92112,3.94241 6.92228,6.36102 0.82794,1.00066 1.56624,2.07326 2.24507,3.1805 0.73012,1.19089 1.39487,2.4285 1.87088,3.74178 0.36942,1.01921 0.62499,2.09828 0.56127,3.1805 -0.0967,1.6421 -0.90888,3.1409 -1.49671,4.67722 -0.50887,1.32994 -0.85615,2.71712 -1.12253,4.11595 -0.34162,1.79392 -0.55166,3.61004 -0.74836,5.42558 -1.01142,9.33522 -1.67786,18.70379 -2.43215,28.0633 -0.71346,8.85289 -1.51148,17.73612 -3.55468,26.3795 -2.02468,8.565 -5.24709,16.79042 -8.23191,25.06988 -1.24332,3.4488 -2.54119,7.05864 -5.23848,9.54152 -0.56216,0.51747 -1.18178,0.97959 -1.87089,1.30962 -1.718011,0.82279 -3.711014,0.76563 -5.612661,0.65481 -1.099799,-0.0641 -2.251112,-0.15682 -3.1805,-0.74835 z"
          />
          <path
            onClick={() => onColorChange("t46", "c2")}
            style={style_2}
            d="m 149.2656,292.3111 -4.18016,-2.20357 -1.87088,-2.99341 -1.12253,-7.10937 -1.49671,-20.95394 -2.24507,-21.70228 -5.23848,-23.19899 -2.05798,-8.98026 -2.05797,-9.26089 -1.87089,-7.76418 -1.44993,-2.19829 -0.88867,-1.96443 -4.44336,-7.29646 -5.56589,-5.14494 -4.84271,-3.8272 -4.53099,-2.38125 -6.014341,-0.85415 h -0.28063 l -0.12945,-0.006 -0.0413,-0.0331 -0.0331,-0.11576 0.0165,-0.38034 v -0.99218 l -0.1323,-5.82084 -0.23151,-11.97239 v -7.54063 l -0.13229,-2.24896 -0.13229,-1.71979 0.26458,-0.79375 1.19063,-0.26458 1.587501,-0.13229 4.89479,-0.52917 6.87917,-0.79375 11.24479,-2.11667 13.75833,-4.89479 12.43542,-4.89479 6.21771,-2.64583 3.43958,-1.45521 2.38125,-0.13229 3.175,0.26458 0.79375,1.19063 0.79375,1.5875 0.13229,1.85208 0.0548,16.80538 0.37418,50.51393 0.74836,35.17268 -2.24507,31.80507 -3.36759,22.82482 -3.74178,11.5995 -2.40627,2.59633 -2.64584,0.66146 h -1.85208 v 0 z"
          />
          <path
            onClick={() => onColorChange("t46", "c3")}
            style={style_3}
            d="m 39.026029,293.91914 c 0.593198,-0.16309 1.170203,-0.38501 1.7198,-0.66146 2.134526,-1.07368 3.791675,-2.94338 4.96093,-5.02708 1.765085,-3.14552 2.489154,-6.75073 3.21511,-10.28383 0.615416,-2.99512 1.249538,-5.98636 1.87089,-8.98026 1.746719,-8.41631 3.397592,-16.87347 5.98683,-25.06988 1.040395,-3.29344 2.232761,-6.54663 2.99342,-9.91569 1.121704,-4.96818 1.284743,-10.0948 1.87089,-15.15419 0.636736,-5.49605 1.775444,-10.92528 3.18051,-16.27671 0.78374,-2.98501 1.651494,-5.9517 2.24506,-8.98026 0.71439,-3.64505 1.070501,-7.48615 2.99342,-10.66406 0.123903,-0.20477 0.253845,-0.40581 0.38241,-0.60768 0.112388,-0.17647 0.224106,-0.35412 0.356596,-0.51604 0.13249,-0.16193 0.287181,-0.30868 0.470234,-0.41 0.230038,-0.12732 0.493394,-0.17746 0.750673,-0.23164 0.257279,-0.0542 0.519942,-0.11697 0.737607,-0.26445 0.168405,-0.1141 0.300697,-0.27287 0.42995,-0.42995 1.379595,-1.67659 2.68678,-3.41271 4.10104,-5.06016 2.992207,-3.48558 6.532394,-6.61005 10.7487,-8.43359 3.190756,-1.38 6.664228,-1.97293 10.12031,-2.34818 0.114907,-0.0125 0.230269,-0.0247 0.3458,-0.0213 0.05071,0.002 0.101643,0.006 0.15201,0 0.01857,-0.002 0.0377,-0.006 0.0526,-0.0175 0.01141,-0.009 0.01954,-0.0211 0.02488,-0.0344 0.0053,-0.0133 0.0081,-0.0275 0.01022,-0.0416 0.0099,-0.0656 0.0078,-0.13242 0.006,-0.19878 -0.01422,-0.51266 -0.0117,-1.02561 -0.0126,-1.53846 -0.0033,-1.90216 -0.05376,-3.80393 -0.11575,-5.70508 -0.185065,-5.6761 -0.473233,-11.3533 -0.35692,-17.03122 0.01214,-0.5924 0.02867,-1.18484 0.0234,-1.77734 -0.0035,-0.38984 -0.01638,-0.77952 -0.0234,-1.16931 -0.0156,-0.86657 -0.0023,-1.73675 -0.11693,-2.59585 -0.04907,-0.36763 -0.121668,-0.73708 -0.0884,-1.10648 0.0061,-0.0677 0.01575,-0.13519 0.0182,-0.20314 0.0022,-0.0619 -0.0017,-0.12466 -0.01934,-0.18405 -0.01768,-0.0594 -0.0499,-0.11549 -0.09759,-0.15505 -0.05862,-0.0486 -0.135429,-0.0689 -0.21047,-0.0819 -0.300722,-0.0522 -0.608674,-0.0101 -0.91206,0.0234 -2.812329,0.3103 -5.644916,-0.13765 -8.46913,-0.30881 -2.906796,-0.17616 -5.826409,-0.0587 -8.73125,-0.26458 -6.415653,-0.45476 -12.600193,-2.4697 -18.78542,-4.23333 -5.798974,-1.65349 -11.687296,-3.10775 -17.19792,-5.55625 -3.424629,-1.52164 -6.67167,-3.41394 -10.05416,-5.02709 -0.546626,-0.26069 -1.106252,-0.51699 -1.70528,-0.60602 -0.247836,-0.0368 -0.501734,-0.0443 -0.74835,0 -0.104997,0.0189 -0.208822,0.0472 -0.305488,0.0923 -0.09667,0.0451 -0.186197,0.10747 -0.255782,0.18833 -0.106446,0.12369 -0.161419,0.28492 -0.183101,0.44665 -0.02168,0.16174 -0.01238,0.32582 -0.004,0.48879 0.112415,2.18039 0.05668,4.36556 0,6.54811 -0.374071,14.40451 -0.787957,28.80887 -0.93545,43.21748 -0.27836,27.19301 0.392232,54.38603 1.12253,81.57066 0.308228,11.47348 0.627114,22.94733 0.74836,34.42431 0.02377,2.25032 0.04062,4.50961 0.37417,6.7352 0.05772,0.38516 0.127121,0.77579 0.30487,1.12232 0.289325,0.56406 0.833704,0.95108 1.38906,1.25677 0.748146,0.41181 1.55312,0.71744 2.38125,0.92604 0.62744,0.15805 1.271201,0.261 1.91823,0.26459 0.443985,0.002 0.888215,-0.042 1.32292,-0.1323 z"
          />
          <path
            onClick={() => onColorChange("t46", "c4")}
            style={style_4}
            d="m 98.436059,132.54964 c -0.352909,-0.0304 -0.708608,-0.0284 -1.06115,0.006 -0.07122,0.007 -0.142308,0.0152 -0.2134,0.0234 -0.550292,0.0633 -1.101727,0.12069 -1.6552,0.14287 -0.796596,0.0319 -1.594314,-0.009 -2.38952,-0.0661 -1.759377,-0.12577 -3.513318,-0.32828 -5.27513,-0.41341 -1.464875,-0.0708 -2.932288,-0.0603 -4.3987,-0.0827 -0.920869,-0.0141 -1.841549,-0.0412 -2.76159,-0.0827 -0.822414,-0.0371 -1.644536,-0.0858 -2.46393,-0.16536 -1.786003,-0.17349 -3.555099,-0.49362 -5.3082,-0.87643 -2.20636,-0.48178 -4.389775,-1.06304 -6.56498,-1.67018 -2.606444,-0.72751 -5.202274,-1.49247 -7.80521,-2.23243 -2.045795,-0.58158 -4.096063,-1.14774 -6.13502,-1.75286 -1.589486,-0.47172 -3.172688,-0.96733 -4.72943,-1.53789 -3.332789,-1.22151 -6.530614,-2.78143 -9.69036,-4.3987 -1.731543,-0.88627 -3.454767,-1.79115 -5.22552,-2.59622 -0.119341,-0.0543 -0.239177,-0.10817 -0.36381,-0.14883 -0.239426,-0.0781 -0.492488,-0.10594 -0.74414,-0.11576 -0.182034,-0.007 -0.364799,-0.005 -0.5457,0.0165 -0.12555,0.0149 -0.25215,0.0399 -0.3638,0.0992 -0.02649,0.0141 -0.052,0.03 -0.07912,0.0428 -0.02711,0.0128 -0.05626,0.0226 -0.08625,0.0233 -0.04323,9.5e-4 -0.08627,-0.018 -0.11575,-0.0496 -0.02233,-0.024 -0.03683,-0.0543 -0.04638,-0.0857 -0.0096,-0.0313 -0.01444,-0.0639 -0.01972,-0.0962 -0.0712,-0.43624 -0.218078,-0.856 -0.3638,-1.2733 -1.2831,-3.6744 -2.529966,-7.36436 -3.55897,-11.11785 -1.906998,-6.956141 -3.066772,-14.131929 -5.56916,-20.896734 -1.017275,-2.750041 -2.252069,-5.418957 -3.175,-8.20208 -1.030614,-3.107843 -1.663379,-6.330393 -2.38125,-9.525 -0.744662,-3.313829 -1.584517,-6.612951 -2.052036,-9.977087 -0.467519,-3.364137 -0.555219,-6.819794 0.199956,-10.131243 1.048088,-4.595872 3.679204,-8.709519 6.87917,-12.17084 4.540361,-4.91119 10.206495,-8.620794 15.87499,-12.17084 6.830806,-4.277974 13.781451,-8.413734 21.16667,-11.6416596 4.700497,-2.0544897 9.687058,-3.7559341 14.81667,-3.70417 5.026047,0.050719 10.066586,1.8807059 13.75834,5.2916696 1.336026,1.234409 2.48512,2.654163 3.723546,3.986466 1.238425,1.332304 2.592893,2.596701 4.213954,3.421864 2.187608,1.11355 4.700279,1.352841 7.143751,1.5875 3.08464,0.296234 6.22279,0.612922 9.26041,0 3.43653,-0.693415 6.54436,-2.545833 9.26042,-4.7625 3.03043,-2.473233 5.7245,-5.4711176 9.26041,-7.1437496 2.62763,-1.2429779 5.56545,-1.6722191 8.46667,-1.85208 4.81233,-0.2983399 9.71398,0.060915 14.2875,1.5875 6.62492,2.2113166 12.22227,6.7404036 17.19792,11.6416596 1.85211,1.82442 3.6491,3.723061 5.12469,5.863498 1.47559,2.140437 2.62685,4.540654 3.07739,7.101092 0.59956,3.407313 -0.0595,6.891112 -0.52917,10.31875 -0.541,3.948568 -0.83031,7.92732 -1.05833,11.90625 -0.43119,7.524171 -0.64873,15.097417 -2.11667,22.48959 -1.24769,6.283061 -3.39344,12.405547 -3.96875,18.785407 -0.34106,3.782187 -0.12362,7.601267 -0.52916,11.377087 -0.17753,1.65289 -0.47431,3.29623 -0.51972,4.95801 -0.0213,0.78039 0.0127,1.56519 -0.0935,2.33861 -0.0225,0.16384 -0.0513,0.32682 -0.0702,0.49111 -0.0117,0.10136 -0.0198,0.2042 -0.0519,0.30105 -0.0161,0.0484 -0.0381,0.0951 -0.0683,0.13627 -0.0302,0.0412 -0.0686,0.0767 -0.11365,0.10056 -0.0528,0.0279 -0.11311,0.0391 -0.17279,0.0403 -0.0597,0.001 -0.1191,-0.007 -0.17801,-0.0169 -0.27844,-0.0453 -0.55286,-0.11554 -0.81851,-0.21047 -0.15472,-0.0553 -0.30752,-0.1195 -0.44433,-0.21047 -0.0742,-0.0493 -0.14349,-0.10639 -0.2224,-0.14765 -0.13167,-0.0688 -0.2824,-0.09 -0.42995,-0.10748 -1.5396,-0.18297 -3.09644,-0.0939 -4.64675,-0.0744 -0.30361,0.004 -0.60804,0.005 -0.9095,0.0413 -0.0565,0.007 -0.11422,0.0153 -0.16411,0.0426 -0.0517,0.0283 -0.0909,0.0746 -0.13768,0.11032 -0.0842,0.0643 -0.18959,0.0925 -0.28939,0.12815 -0.1595,0.057 -0.30997,0.13621 -0.4616,0.21171 -0.56664,0.28215 -1.15583,0.51592 -1.74227,0.7542 -2.20389,0.89546 -4.37932,1.85917 -6.57149,2.78295 -4.31907,1.82005 -8.70235,3.48475 -13.11478,5.06507 -2.5299,0.90609 -5.07025,1.78478 -7.57369,2.76159 -1.77315,0.69186 -3.53342,1.43481 -5.37435,1.91823 -0.91096,0.23921 -1.83742,0.41368 -2.76159,0.59531 -2.83606,0.55738 -5.66099,1.1844 -8.52316,1.5867 -1.15434,0.16225 -2.3135,0.28776 -3.47283,0.40926 -2.33566,0.24479 -4.67323,0.47347 -7.00414,0.76005 -0.65795,0.0809 -1.31557,0.16642 -1.97612,0.22216 -0.29645,0.025 -0.59358,0.044 -0.88867,0.0819 -0.455972,0.0585 -0.908385,0.16202 -1.368091,0.16371 -0.06825,2.5e-4 -0.136504,-0.002 -0.20462,-0.006 z"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};