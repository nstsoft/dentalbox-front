import SvgIcon from "@mui/material/SvgIcon";
import type { Segment4, FiveZonesChart, FiveZoneTooth } from "@types";
import type { FC } from "react";
import { TOOTH_SVG_STYLE } from "@utils";

type TeethMapProps = {
  tooth: FiveZoneTooth;
  onColorChange: (tooth: keyof FiveZonesChart, segment: keyof Segment4) => void;
};

export const T27Svg: FC<TeethMapProps> = ({ tooth, onColorChange }) => {
  const style_1 = { fill: tooth.segments.c1 || "none", ...TOOTH_SVG_STYLE };
  const style_2 = { fill: tooth.segments.c2 || "none", ...TOOTH_SVG_STYLE };
  const style_3 = { fill: tooth.segments.c3 || "none", ...TOOTH_SVG_STYLE };
  const style_4 = { fill: tooth.segments.c4 || "none", ...TOOTH_SVG_STYLE };
  return (
    <SvgIcon className="tooth-svg">
      <svg viewBox="0 0 210 297" version="1.1">
        <g>
          <image
            y="-23.331198"
            x="-203.65796"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAABGCAYAAABVN21EAAAACXBIWXMAAAsTAAALEwEAmpwYAAAG
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
                        MjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA5LTA3VDEzOjExOjQ5KzAzOjAw
                        IiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTA5LTA3VDEzOjExOjQ5KzAzOjAwIiB4bXA6TW9kaWZ5
                        RGF0ZT0iMjAxOC0wOS0wN1QxMzoxMTo0OSswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlp
                        ZDo4MzNjZDAzZi1jZjU1LWMyNDItYjUyNS0zZmZlOGRjMTQ1YWEiIHhtcE1NOkRvY3VtZW50SUQ9
                        ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDphN2NmNzg2OC1kOWZmLTYwNGYtOTAzMC01ZjJjODc1NDE5
                        Y2IiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowM2IzZWNhNy0xNDlhLTQ1NGMt
                        ODQ2Ni02Zjg5MjA4YWRjYzYiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1h
                        Z2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0i
                        Y3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowM2IzZWNhNy0xNDlhLTQ1NGMtODQ2
                        Ni02Zjg5MjA4YWRjYzYiIHN0RXZ0OndoZW49IjIwMTgtMDktMDdUMTM6MTE6NDkrMDM6MDAiIHN0
                        RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIvPiA8
                        cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODMz
                        Y2QwM2YtY2Y1NS1jMjQyLWI1MjUtM2ZmZThkYzE0NWFhIiBzdEV2dDp3aGVuPSIyMDE4LTA5LTA3
                        VDEzOjExOjQ5KzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0Mg
                        MjAxOCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhp
                        c3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPkY4
                        QTlBRUM5QUQzNDEwRkRENEMwQzM4QTUzMTc1NTU0PC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90
                        b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwv
                        eDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+OD+8nAAADXVJREFUaN7NmtuPXclVxn9rVdXe
                        55xut+9xPMbjRMGTTC5DFIkJDwgknnjJn8ArErwkiCek8B8QBEgIiQckHnhA0SCkCIg0CoMEIaMJ
                        aGCScTBMpCQztmM74263+1z2pWrxsC/effpc7LESpaQt9dm7us7aX631rW+tOpgZ3ZVS+pyZfWx4
                        r7uipc8PPr9sZmcff46fjJY+ES29bBbPmcXcYnpxeY2U0sur1l5zDW35PTMzMTNWjEvA3e6DWdwz
                        4ari3m5vvWxmiAiAAd/mycaLZjYWkfeBH26YdxUQ4BTQfecfDo292j7MgTvAOeBGbzDp04ZFxZmZ
                        ORHpFnkR+N6GLx4BixX3PwH8z4r7nwJSu+YnWzC+B7yMmf29mX1h1VYki5eW7u2Z2UefdCtTSs+t
                        fWb20ppny+7zvJl91szw7ZZ/bRUkgt5dunXYXk8yrorIuxuel0/iNsCjdqc/L2Z2o4X7qYeBNwxF
                        6mMP0p0z6OWDE/PNfOvn9YZlnwd2gQho+1Il8K621m8db/7L3/7RkqGXDLsuyHWM57r7r3/9r28s
                        7t1bhdplEbkCXEkpnQN4641v2FvfftVOYsAN4F7rq98HJgDr2ODYePsfvmx1OeP69etMPv07sm7e
                        /772JxYOv4uqcu0Lfzmc583siog8ZoAffdW++x/fRKi4fv062We+JNvs0G0Tbn3rzy2lhHOO0Wi0
                        ce50OmU8HpNSWn5UHzMU2H/wAFVlNBpx69atJ3K7rcbObn2Li9k+GueU4fLmxea3kMwxOjXhv//u
                        dzdumVULgivYHZdUi7tPYus1v21GCIEsy2AW8d4PgoWLIkzaaH0A4Jzr5/gtK5dliYgQQji27oZx
                        eiOyN7/xFXPjMZUIURTvsse0Jtxvs9ADgPKtvzJ1iZTlWD5iN0RuvfrFtegm5ogIooGQjbn52h9v
                        C55io7FHR0d473HONX4o62NgPp/jnMPM8N4TQmA6nS6buAN4gDzPSSlhZoQQODzcSt83dZD6fhn4
                        yPBpVt/HOY8ZjQ6o1/N4Wd9FBVKYYNkOowBqJfs/+NcBYjrtOFbimGhQp4Q4R6i3+60HPr4mR6Oq
                        eO9JKSEiVGVJWLNQVVWoKs45QghE53DO8fDhQ86umO+ca91JEJH+8zY2OLOShv7zz8z7RFRHVIeI
                        kRYH61eqCzyRRRKSb/w2ZTnV4Wpxpfkpkil1iqh3jAIcvvEV22bslZXeXBQ451BVVBURoa7rjdE9
                        nN8xw0m/bV0sy4gx9uiqKvP5fCuyP1q9rQ9wAikEovc4SVCtRzbWC5wOkkGYkNwIm/945XwngSpG
                        ojTulklNMd3oty8p8N46pDqeDSFsfXMzQ1X7v7MsW+WHvmODgXgnpdT4eYv0mvGWAqtfPdXNlZ2F
                        7Cw5NdXs9tqVxGq8GpAwi6RsDG5EUCPd/BtrY+MCcBG4oCkh4rAUkJAhAjEttrLB6i9filLvPbPZ
                        bCOyMuDhzs8BFosFEzhYYo9/NrPfEBFGoxGx4/Jn0QaRDA07hBzKerp2XlLBnCJqmAn4HHxOpkZd
                        3l/h47d9pkLUCZqdR5yS2EgGL2w1NqWE9x7vfaMRNoxuN1JKx1hh1Y7MZrNf6+Z3628ZO2uN9dmI
                        aEJK4H2GZTkyGnPj618+8frv/ddXDefBeaBB1hCiUzKXqIujk8Ye3iZ3cywfYfkIVYeIrqlI0meA
                        F/wgQhfL2WuYmbIsI89z3r8/XckcHZJD3ux8tiiKlVpiPB7jve/ndf8/LIMQywX9DvAdbXP1iTB0
                        fodkGXU1RShZhAlMdriYL7jz6peOoZuKaW9cwhDVnoac1mAnjU1lwTh4khsRNccsndBJIlJLoyc2
                        B9hoNMLMqOuauq573TmZTDg4OFiZ7Ya70rGDqq7MfHme91zc+fkHZoOdz/2+zA1cfQTFQzTsUusp
                        3G7An8q48Y9/0KNbm4AG0IDYGBDqWGAs8CLoUp335iu/bbYzJo5znPOk1PCz6jOUNTFGUkpUVdXn
                        /SzL2N3dpSxL3vvmX1jHGEOO9d5TFEXPDsNnP3ztT63boRACzjmqquq17QdKCo2He0JcIMURabKH
                        iXDkx7gd5VJ8wOG9f+fuqzft9HyKH+0RvYJUxLSgLGcENXCKqcAPXrGjoyNm997gwpkz6KkdHvkx
                        O5lSp5IkNPM+qLHee8yq5s2rCu89sWru55MJ1JHDg8PGZ3fHTFr926Gqor0vv/322xRFwaW9PXZ3
                        dymco279uygKVLZW4luQ9WeI6TZGpC6mLXELFY56souGERP/CDnYZ/bgLlIcke+dQUNgpEpZlhzu
                        P6BeTPF2k53TZ9C9y8zzDDThzfBWMls8whuoPYOxWZb1UZ1SOqY/O7Wf7+wwVqGYNzXXw3v3er5M
                        KTEROH36NGEywk12sSwjiRDbzFjXde+rW1TXZmMl2yVNayQaJjOSZW03EmJqBfk4oPkYTu0yLitG
                        RdFTlXMOzXIk88SQYaokUttFDHiXU8cpagtcUry5Z0M2Pko9umaGdBoAOaa2vPeoOkJbtXY7kNSR
                        FKI81rpDHVHXVb8Lz+azYYJYQizhrDNCMAOV1L+AiRBNEKdEU0wNaR2wl47WJArfGl0TiXXRiHaB
                        2hK1PYNE7PoA3TXky+7vzuAhaqs07vBZ93fHrWZGjPHY+k+NrLoxESMJJK3BPGLLnZWmPaOdqyRb
                        aWjq/tG0RSn1rkSM1FFxfvxsyC6jMfy8jOhwzhDxZb27vGbb0t+qlzciG+sZkiJqCTUFIkLjqzUC
                        OGIESw4TQQik1Eq9dotVaowKp03j34iICtb6p6INsgnG490PbmxXJXRbGmOEFBulpIr3gUk2Ivgx
                        PstwmiPiWlQbXRHrOWU1I9Zlkwnr2FLb47VZ4/NPZayVU6J5onnmaQ/yC+STi+STi2STHbIwwemo
                        adhJ6nuhiCLNWQPehBwwqynLObGcsZjtMz28Q73YR2WfoIaTSKyOPrixR0dH7GYZ58+f5/zl55Hx
                        JcjOATvNmZq5JqDMQNKAQwdBZm3FIJCPRjDyTPZyzl0Yw+x9FlPH7P4dirYK3lA9/+pGY/OzL3Lu
                        F34duXCuO4PAUtm6RddYq9pgk8e8awN6k0gya441kmCmwBh1p2DveUZ7L6HnCvz4Dd555x1m+7ds
                        cvZKF4VnDD4ETETk3zYae+3aNdxIwawtO+QEI4CtjP4+4w0YoKt6H2eshEjTvcmuXuVTeY4cr3IP
                        ZNBv2MwGMYELiLU+qQpJ20i27mCvRfxxKjYzjNbQllcTsf3cvmRP2K7t/34Yd+48FtN2nq2xX1rV
                        nx1WqdbR0eDek0TxMOOty4S0L1lV1bolXllxDpZ+BfT16ic3LYQAkzFJPeKaxpnr8rc2SUGRJze2
                        gbAxWlrDCYgq2JxYlKSjkrCzB5NLsgrZq0u3Xu/Rav1LdWvj5tlG+7JdnWcr+gydsSfq5Orhj80c
                        4IV0oi5KvabdXotqg2CLoi0ZdyxgxZNcwDmhrmZrV/xsi+7Z4fmA9x6WcvlPdXTfM+jQrDL2n4B3
                        gX3gF5ntm08LxIfm5M1yIKxF1ESxlT2qlpqGgd9+pQ30kxExIhBI+IafMqU8uG3bVNc7lGWr+rWP
                        UH4G6HZUx4YuzglIqvoA9U0Nb+JW1PJ67Ooqia3GdL4rCZM06JinhovNIXhQj0nAUcJs37brWRGk
                        7Vf91BFdrkKGHcgldPWkLKxBDBNFcbgEJBt0RlN/biBDZ1RpriUkl0sgkqC4le18FSEJ4BUvAktn
                        DOuRbXsF/WdkZeZZrhJkKbutylpDRIcVx6oO+kZjRRxYI55VIVrdBtgYGPfRvyxaegMSjQI7wQLd
                        5NhcnY6QTmV4rJMqvbHVZj07RMosoeqbEkVbTdCW1Gb0fQQzQ1oX6ItATiK/UhMMMqSINIaviRV/
                        UrzsUZVF2wFMIIlkOUhARUF2MEuYLJqyp0VZaLfT4mMf7rVZ05HsarDGltQ+H4Hm/csJNVjCiKjk
                        m90gXLgiMUbKomiicVjvY40oVMVpczYrS2cJotoIkxX9haGS08E5b3/MkWK/CzFGdOmEcu2vj6qf
                        3DK0IOTSZDLnQDxI3vpw6k/KmjXSsdYQVjc+GyNtCwdc1oqj0KyFbxE1zCokVWALKCoWc2N04SPy
                        RDVYuHBFyve/b4tFQZ7njT+p9SV0b6ykE92ZlBJYgjoiVdVUxd7hMsWcQ8W1YlwHpVBqGiV9t1JX
                        HLluIf5i/7bFYs5kbA264wDmsd7HYoO0WcPHMUKMpNKoqkTtmuMjikfkuYdcmm64c8dKIUkRqgiF
                        Ucwhf+6j8nSNOSDf24OZUszfb+p8D04H4sUe96usjmhVUdc1Khn57i75zoebL52aLR4d4FEkeGJ7
                        Et6dR8SqwsqacPYFyc+uO8x+ipQ6f3DXfHzUdsAfU1FVJRIQxaMhZ3T60lrlUxzcsVQtUAXfBmtK
                        CXf+uH+a2SURyYe/h/BPk8fH5y4JR7XFouirXVUl5PmbhHCP8Yd+c+tOnbksVPtGuYCqxszuO++/
                        dlyB8fHWabvf0N54amR/ZsO4jvB/A+OfE7itLeS/dbIW+3mxmxe7tolvKedmWy38fAxhCnzMzNTM
                        ClW9A/D/6+wBQKlxIVoAAAAASUVORK5CYII=
                        "
            preserveAspectRatio="none"
            height="324.39139"
            width="199.26901"
            transform="scale(-1,1)"
          />
          <path
            onClick={() => onColorChange("t27", "c1")}
            style={style_1}
            d="m 111.13498,2.7095246 c 1.10748,0.1875337 2.13489,0.7392779 2.98105,1.4779818 0.84616,0.7387039 1.51931,1.6591711 2.07034,2.6379688 1.07744,1.9138712 1.69904,4.0465698 2.24506,6.1739258 1.38775,5.406891 2.34517,10.919426 2.99342,16.463802 0.91498,7.825716 1.21498,15.70811 1.6838,23.573174 0.31967,5.362862 0.71814,10.721639 0.93545,16.089624 0.27768,6.859366 0.25949,13.732196 0.74835,20.579752 0.39208,5.491935 1.10995,10.961517 1.30962,16.463807 0.0545,1.50284 0.0714,3.01708 0.37418,4.49012 0.11285,0.54911 0.26604,1.10324 0.21128,1.66115 -0.0411,0.41905 -0.19878,0.81907 -0.39687,1.19063 -0.47436,0.88977 -1.17651,1.63272 -1.85209,2.38125 -2.07252,2.29633 -3.9961,4.77411 -6.48229,6.61458 -1.36861,1.01315 -2.8913,1.81701 -4.49791,2.38125 -2.36982,0.83228 -4.89716,1.13807 -7.40833,1.19063 -3.68974,0.0772 -7.379462,-0.38149 -10.980214,-1.19063 -2.607554,-0.58596 -5.195247,-1.36448 -7.54063,-2.64583 -1.552931,-0.84841 -3.019485,-1.94617 -3.96875,-3.43959 -0.587301,-0.92396 -0.958803,-1.9727 -1.19062,-3.0427 -0.38461,-1.77524 -0.393641,-3.60754 -0.39688,-5.42396 -0.0166,-9.30718 0.07566,-18.617403 0.52917,-27.913543 0.457045,-9.368661 1.280673,-18.716143 2.24896,-28.045833 0.628807,-6.058713 1.325836,-12.147374 3.04271,-17.991666 2.562481,-8.722763 7.304116,-16.610574 11.37708,-24.738542 0.885514,-1.7671155 1.748344,-3.5615023 2.933514,-5.1433361 1.18517,-1.5818339 2.73356,-2.9581349 4.60711,-3.5879139 0.18521,-0.062258 0.37292,-0.1170347 0.56224,-0.1653648 0.5619,-0.1434388 1.13988,-0.2300886 1.71979,-0.2315104 0.46443,-0.00114 0.92702,0.052191 1.38906,0.099219 0.2514,0.025589 0.50325,0.049364 0.7524,0.091555 z"
          />
          <path
            onClick={() => onColorChange("t27", "c2")}
            style={style_2}
            d="m 58.971286,2.6424051 c 0.634557,0.1797522 1.213757,0.5229449 1.729,0.9346465 0.515243,0.4117016 0.971008,0.8920945 1.41746,1.3775369 1.306025,1.4200862 2.564423,2.9230062 3.3676,4.6772165 1.087917,2.376107 1.272629,5.057576 1.30962,7.670635 0.06715,4.743927 -0.296949,9.481707 -0.56127,14.21874 -0.23649,4.23826 -0.393214,8.480504 -0.56127,12.722029 -0.264281,6.670112 -0.556678,13.345636 -0.37417,20.018486 0.226997,8.299446 1.188322,16.584094 0.93544,24.882792 -0.09328,3.061286 -0.349855,6.152075 0.18709,9.167347 0.208431,1.170465 0.540345,2.331016 1.12253,3.367596 0.740539,1.31853 1.851656,2.38186 2.80633,3.55468 1.292502,1.58784 2.313493,3.39741 3.74178,4.86431 1.1458,1.17678 2.552451,2.11612 4.11595,2.61924 0.676966,0.21784 1.377902,0.35331 2.05797,0.56127 0.278351,0.0851 0.557095,0.18312 0.84771,0.19946 0.110094,0.006 0.220464,5.2e-4 0.33073,0 0.07491,-3.5e-4 0.149856,0.002 0.22473,-8e-4 0.03136,-0.001 0.06338,-0.003 0.0935,0.006 0.02472,0.007 0.04735,0.0215 0.0643,0.0409 0.02076,0.0237 0.03241,0.0538 0.0468,0.0819 0.01277,0.0249 0.02808,0.0489 0.0351,0.076 0.0069,0.0266 0.0054,0.0545 0.006,0.0819 0.0011,0.0491 0.0093,0.0977 0.0175,0.14617 0.01938,0.11456 0.03897,0.22911 0.0548,0.34421 0.01878,0.13652 0.03226,0.27373 0.0506,0.41031 0.01862,0.13866 0.04223,0.2766 0.0661,0.41445 0.02078,0.11999 0.04175,0.23995 0.0641,0.35966 0.02916,0.15622 0.06066,0.31202 0.0951,0.46716 0.147944,0.66637 0.35072,1.32143 0.62225,1.94769 0.06867,0.15839 0.141745,0.31495 0.22217,0.46771 0.107303,0.20381 0.227575,0.40063 0.35551,0.59217 0.495508,0.74185 1.106415,1.40435 1.79016,1.97738 0.972312,0.81488 2.085894,1.44628 3.23313,1.98782 1.710584,0.80746 3.508525,1.42416 5.34372,1.88258 3.41826,0.85385 6.946174,1.15718 10.455494,1.47063 0.0316,0.003 0.0634,0.006 0.0951,0.004 0.006,-2.9e-4 0.0113,-7.3e-4 0.0169,-3.6e-4 0.006,3.6e-4 0.0113,0.002 0.0162,0.004 0.006,0.004 0.011,0.01 0.0142,0.0163 0.003,0.007 0.005,0.0138 0.007,0.0209 0.005,0.0206 0.009,0.0413 0.0124,0.062 0.29451,1.59008 0.32457,3.21582 0.34727,4.83278 0.10495,7.47476 0.0711,14.95245 0.33073,22.42344 0.0981,2.82199 0.23798,5.64309 0.26458,8.46666 0.0102,1.08183 0.004,2.16691 0.13229,3.24115 0.0158,0.13218 0.0334,0.26801 0,0.39687 -0.0206,0.0795 -0.0609,0.15431 -0.11825,0.21315 -0.0574,0.0588 -0.13194,0.10131 -0.21248,0.11758 -0.10085,0.0204 -0.20566,-2.9e-4 -0.30352,-0.032 -0.0979,-0.0317 -0.19218,-0.0745 -0.29179,-0.10027 -0.23615,-0.061 -0.48476,-0.0227 -0.7276,0 -1.07029,0.1 -2.14129,-0.11245 -3.20921,-0.2352 -3.040746,-0.3495 -6.110729,0.0279 -9.167354,0.18708 -6.829213,0.35562 -13.709361,-0.37967 -20.49792,0.445 -8.021585,0.97446 -15.642588,4.10073 -22.75417,7.9375 -2.922574,1.57676 -5.811162,3.29232 -8.99583,4.23333 -0.577666,0.17069 -1.165078,0.31587 -1.720456,0.54908 -0.555378,0.23321 -1.084725,0.56296 -1.454544,1.03842 -0.103502,0.13307 -0.195514,0.27837 -0.326679,0.38428 -0.06558,0.0529 -0.140851,0.0953 -0.222697,0.11547 -0.08185,0.0202 -0.170585,0.0171 -0.247844,-0.0166 -0.0872,-0.038 -0.15529,-0.11337 -0.194519,-0.20004 -0.03923,-0.0867 -0.05115,-0.18397 -0.04527,-0.27893 0.01175,-0.1899 0.09135,-0.36786 0.146291,-0.55002 0.145095,-0.4811 0.118483,-0.99483 0.0935,-1.49671 -0.729726,-14.65939 1.076512,-29.31953 1.32638,-43.99494 0.399719,-23.47654 -3.184179,-46.923498 -2.11666,-70.379166 0.541458,-11.896998 2.276816,-23.706665 4.23333,-35.454167 0.656175,-3.939871 1.343216,-7.897865 2.67473,-11.663528 1.331514,-3.765662 3.349939,-7.3629696 6.3211,-10.0323048 1.429489,-1.2842744 3.072092,-2.3427815 4.86682,-3.029622 1.318147,-0.5044532 2.710513,-0.8060933 4.11595,-0.9354434 0.761912,-0.070123 1.542794,-0.088379 2.27896,0.1201563 z"
          />
          <path
            onClick={() => onColorChange("t27", "c3")}
            style={style_3}
            d="m 153.22993,5.1416772 c -0.77767,0.1461186 -1.53526,0.3986509 -2.24507,0.7483547 -1.3458,0.6630487 -2.51509,1.6795883 -3.36142,2.9183601 -0.84633,1.238772 -1.36807,2.696802 -1.50288,4.191009 -0.11802,1.308012 0.0552,2.622179 0.18709,3.928862 0.50155,4.967975 0.40809,9.973979 0.37417,14.967093 -0.0551,8.108695 0.0484,16.219192 0.37418,24.321527 0.23586,5.865702 0.58674,11.767119 -0.18709,17.586335 -1.16459,8.757743 -4.83619,16.995348 -9.16734,24.695703 -2.55686,4.545839 -5.37138,8.972939 -8.79317,12.909119 -0.42384,0.48755 -0.85669,0.96722 -1.29483,1.44196 -0.45246,0.49026 -0.91058,0.97528 -1.37118,1.45791 -0.67826,0.71069 -1.36207,1.4164 -2.01879,2.14704 -0.86973,0.96763 -1.69104,1.978 -2.56315,2.94349 -1.14267,1.26502 -2.37754,2.45665 -3.77031,3.43958 -2.01455,1.42173 -4.33768,2.38559 -6.74688,2.91042 -1.61698,0.35225 -3.27306,0.50998 -4.92786,0.52916 -0.37481,0.004 -0.74965,0.002 -1.12448,0 -0.11047,-4.8e-4 -0.22137,-8.9e-4 -0.33073,-0.0165 -0.0193,-0.003 -0.0393,-0.006 -0.0579,0 -0.0177,0.006 -0.0321,0.0193 -0.0409,0.0356 -0.009,0.0163 -0.0122,0.0351 -0.0122,0.0537 9e-5,0.0371 0.0134,0.0727 0.02,0.10916 0.007,0.0408 0.006,0.0826 0.008,0.12403 0.008,0.19222 0.0754,0.37617 0.11984,0.56334 0.0744,0.31302 0.0845,0.63723 0.0935,0.95883 0.0841,3.00036 0.0999,6.00215 0.11693,9.00364 0.02,3.53163 0.0416,7.06359 0.14032,10.5939 0.1437,5.13774 0.4508,10.27171 0.46772,15.41143 0.002,0.50711 5.5e-4,1.0151 0.0468,1.5201 0.0292,0.31935 0.0774,0.63822 0.0702,0.95882 -0.002,0.0713 -0.006,0.14273 -0.002,0.21396 0.004,0.0712 0.0172,0.14292 0.0486,0.20699 0.0389,0.0793 0.10492,0.14382 0.18167,0.18758 0.0768,0.0438 0.16389,0.0675 0.25178,0.0765 0.17578,0.0181 0.35167,-0.0212 0.52537,-0.0536 1.50491,-0.28125 3.05298,-0.0641 4.58367,-0.0935 0.65547,-0.0126 1.30925,-0.0707 1.96443,-0.0935 2.59523,-0.0905 5.17437,0.37082 7.76418,0.56127 2.79884,0.20582 5.61164,0.095 8.41498,0.2258 3.29289,0.15361 6.56453,0.6405 9.78959,1.32292 4.40005,0.93105 8.71715,2.22543 12.96458,3.70416 3.77461,1.31412 7.53372,2.79312 10.84792,5.02709 0.98327,0.66278 1.92601,1.39114 2.96529,1.96211 1.03927,0.57098 2.19945,0.98387 3.38471,0.9483 0.51312,-0.0154 1.02749,-0.11648 1.49251,-0.33394 0.46503,-0.21746 0.8792,-0.55493 1.15332,-0.98897 0.3873,-0.61325 0.4726,-1.37527 0.40893,-2.09779 -0.0637,-0.72251 -0.2643,-1.4248 -0.40893,-2.13555 -0.44117,-2.168 -0.3598,-4.4042 -0.26458,-6.61458 0.25077,-5.82148 0.58434,-11.63939 0.79375,-17.4625 0.3487,-9.69636 0.35294,-19.40194 0.26458,-29.10417 -0.0609,-6.68915 -0.15839,-13.45269 1.32292,-19.97604 0.75422,-3.321423 1.91057,-6.542908 2.62286,-9.873576 1.87393,-8.76259 0.60676,-17.84681 -0.37418,-26.75368 -0.51493,-4.675511 -0.94907,-9.359856 -1.49671,-14.03165 -1.11067,-9.474909 -2.69457,-18.922781 -5.42557,-28.0633 -1.47055,-4.921839 -3.38854,-9.92885 -7.10937,-13.4703836 -1.8235,-1.7356355 -4.07697,-3.0739442 -6.5481,-3.5546845 -0.8613,-0.167558 -1.74288,-0.2305285 -2.61925,-0.1870887 z"
          />
          <path
            onClick={() => onColorChange("t27", "c4")}
            style={style_4}
            d="m 105.55394,166.49427 c 0.44047,0.0361 0.8848,0.025 1.32292,-0.0331 0.21022,-0.0279 0.41885,-0.0665 0.62838,-0.0992 0.4051,-0.0632 0.81387,-0.10412 1.2237,-0.11576 0.39131,-0.0111 0.78281,0.004 1.17409,0.0165 0.54555,0.0168 1.09162,0.0266 1.63711,0.008 0.45243,-0.0154 0.90394,-0.0504 1.35599,-0.0744 0.40202,-0.0213 0.80457,-0.034 1.20716,-0.0331 0.65131,0.001 1.30211,0.0384 1.9513,0.0909 1.09615,0.0887 2.18816,0.22185 3.28249,0.33073 1.27852,0.12721 2.56061,0.22131 3.84472,0.26458 0.97526,0.0329 1.95124,0.0364 2.92696,0.0496 2.10343,0.0285 4.20834,0.10211 6.30039,0.32246 1.89868,0.19998 3.78299,0.52043 5.65547,0.89297 3.13235,0.6232 6.2358,1.39287 9.29349,2.3151 2.3536,0.70987 4.67964,1.50996 6.97838,2.38125 1.52482,0.57795 3.03979,1.18818 4.49792,1.91823 2.1091,1.05598 4.085,2.35526 6.08541,3.60495 0.82952,0.51821 1.66947,1.03109 2.57969,1.38906 0.63146,0.24834 1.3083,0.4215 1.98438,0.36381 0.27821,-0.0237 0.55145,-0.0861 0.82682,-0.1323 0.24128,-0.0405 0.49259,-0.068 0.7276,0 0.10177,0.0294 0.20226,0.0797 0.26459,0.16537 0.0469,0.0645 0.0687,0.14459 0.0751,0.22413 0.006,0.0795 -0.002,0.15944 -0.009,0.23889 -0.0824,0.87905 -0.10008,1.76293 -0.0992,2.64583 0.002,2.33065 0.13567,4.67474 0.66145,6.94531 0.58373,2.52084 1.63885,4.90282 2.62676,7.29435 1.50778,3.65005 2.87068,7.35793 4.30304,11.03823 1.71896,4.41668 3.54777,8.82562 4.49013,13.47039 0.51254,2.52624 0.75751,5.09907 0.93544,7.67063 0.25847,3.73562 0.37719,7.48559 0.18709,11.22532 -0.20088,3.95182 -0.75915,7.93218 -2.24507,11.5995 -1.2652,3.12257 -3.17272,5.94454 -5.23848,8.60608 -3.52968,4.54766 -7.5936,8.72761 -12.34785,11.97368 -3.43046,2.34222 -7.19799,4.18525 -10.47697,6.73521 -2.74335,2.13341 -5.14676,4.76123 -8.2319,6.36101 -2.82466,1.46471 -6.06785,1.97316 -9.24943,1.93277 -3.18158,-0.0404 -6.33069,-0.60559 -9.45943,-1.18443 -5.80615,-1.07418 -11.62453,-2.20713 -17.21216,-4.11593 -3.38711,-1.15708 -6.68802,-2.60172 -9.72861,-4.49014 -1.364522,-0.84746 -2.675388,-1.78331 -4.08086,-2.56097 -1.405472,-0.77767 -2.926453,-1.39989 -4.525224,-1.55497 -1.646518,-0.15971 -3.309423,0.18365 -4.8643,0.74835 -2.943018,1.06885 -5.53312,2.90256 -8.23191,4.49011 -3.524564,2.07331 -7.290576,3.75123 -11.22532,4.86431 -4.134239,1.16952 -8.42859,1.70941 -12.72203,1.8709 -4.444666,0.16718 -9.018921,-0.0936 -13.0962,-1.8709 -4.262172,-1.8579 -7.659826,-5.22475 -10.85115,-8.60607 -3.485727,-3.69325 -6.885337,-7.5359 -9.35443,-11.97369 -2.602066,-4.67679 -4.115569,-9.98934 -4.11595,-15.34127 -3.62e-4,-5.07971 1.335431,-10.05229 2.61924,-14.96709 1.269142,-4.85865 2.496713,-9.72804 3.74178,-14.59292 1.665403,-6.50726 3.362411,-13.00754 5.23848,-19.45722 1.378171,-4.73797 2.853002,-9.44876 4.11595,-14.21874 0.151175,-0.57097 0.299677,-1.14465 0.37418,-1.73057 0.06576,-0.51718 0.07462,-1.04705 0.23386,-1.54348 0.06196,-0.19315 0.145928,-0.37847 0.23386,-0.56127 0.07307,-0.1519 0.15045,-0.30454 0.263994,-0.42913 0.05677,-0.0623 0.122411,-0.11706 0.196506,-0.15723 0.07409,-0.0402 0.15685,-0.0655 0.24108,-0.0685 0.08215,-0.003 0.163892,0.0153 0.24146,0.0425 0.07757,0.0272 0.151626,0.0634 0.22626,0.0978 0.11023,0.0509 0.222722,0.0984 0.340664,0.12723 0.117942,0.0288 0.242173,0.0384 0.360916,0.0131 0.127831,-0.0273 0.244853,-0.0941 0.344885,-0.17817 0.100031,-0.0841 0.184254,-0.18536 0.263155,-0.28956 0.09363,-0.12365 0.180626,-0.25235 0.27803,-0.37305 0.311458,-0.38596 0.724906,-0.68271 1.17408,-0.89297 0.39192,-0.18346 0.810045,-0.30287 1.2237,-0.42995 1.086565,-0.33381 2.155363,-0.72555 3.19981,-1.17409 2.489395,-1.06907 4.82764,-2.45446 7.22059,-3.72481 3.332072,-1.7689 6.782109,-3.31997 10.33665,-4.58367 3.268439,-1.16199 6.629109,-2.08142 10.05601,-2.61924 0.838777,-0.13164 1.681128,-0.24038 2.5257,-0.32741 2.763854,-0.28479 5.547526,-0.33661 8.32545,-0.28063 3.243411,0.0654 6.489748,0.27722 9.72861,0.0935 1.014788,-0.0576 2.026921,-0.15389 3.04019,-0.23386 1.22964,-0.097 2.461654,-0.17004 3.695,-0.18709 1.029745,-0.0142 2.060465,0.0106 3.086964,0.0935 0.73455,0.0593 1.46632,0.14837 2.19829,0.23386 0.46594,0.0544 0.93556,0.10748 1.40317,0.0701 0.24174,-0.0193 0.48567,-0.0627 0.72497,-0.0234 0.18784,0.0308 0.36329,0.11123 0.53788,0.18709 0.18036,0.0784 0.36245,0.15274 0.54611,0.22303 z"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};
