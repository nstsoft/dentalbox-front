import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import * as R from 'ramda';

import implant from '../../images/teeth-icons/implant.png';
import crown from '../../images/teeth-icons/crown.png';
import removed from '../../images/teeth-icons/removed.png'

class T33 extends Component {

    constructor ( props ) {

        super ( props );
        this.colorSet = [ 'none', 'rgb(102, 89, 89)', 'rgb(176, 71, 71)', 'rgb(51, 87, 163)', 'rgb(57, 145, 40)' ];

    }

    changeColor = ( event ) => {
        const { isToothToggleable } = this.props;
        if (!isToothToggleable) return;
        
        let segment = event.target;
        let code = segment.attributes.seg.value;
        let indexOf = this.colorSet.indexOf ( segment.style.fill ) + 1;

        if ( indexOf === 5 ) {
            indexOf = 0;
        }

        let newColor = this.colorSet[ indexOf ];

        let teeth = {

            '33': {

                [code]:  { color: newColor },
                removed: false,
                implant: false,

            },

        };

        this.props.setTeethChart ( teeth, '33' );

    };

    render () {

        if( R.path(['tooth', '33','implant'], this.props) ){return <img   src={implant} />}
        if( R.path(['tooth', '33','crown'], this.props)){return <img  src={crown} />}
        if( R.path(['tooth', '33','removed'], this.props)){return <img   src={removed} />}

        let style_1 = {

            'fill':           R.path ( [ 'tooth', '33', '33-1', 'color' ], this.props ) || 'none',
            'stroke':         '#000000',
            'strokeWidth':    '0.26458332px',
            'strokeLinecap':  'butt',
            'strokeLinejoin': 'miter',
            'strokeOpacity':  '0',

        };

        let style_2 = {

            'fill':           R.path ( [ 'tooth', '33', '33-2', 'color' ], this.props ) || 'none',
            'stroke':         '#000000',
            'strokeWidth':    '0.26458332px',
            'strokeLinecap':  'butt',
            'strokeLinejoin': 'miter',
            'strokeOpacity':  '0',

        };

        return (
            <svg
                viewBox="0 0 210 297"
                version="1.1"
            >
                <g>
                    <image
                        y="-295.78082"
                        x="-161.02501"
                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAABcCAYAAAALb2dzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAG
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
                        MjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA5LTA3VDE2OjU5OjQyKzAzOjAw
                        IiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTA5LTA3VDE2OjU5OjQyKzAzOjAwIiB4bXA6TW9kaWZ5
                        RGF0ZT0iMjAxOC0wOS0wN1QxNjo1OTo0MiswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlp
                        ZDpjYWE0MGFkYi0yOWVhLTI0NGEtOGEwNC1mODkzNmRkYTVjZDAiIHhtcE1NOkRvY3VtZW50SUQ9
                        ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDphNTM4MzhkNi03MmYyLWU4NGMtOGM3Mi04ZjA0M2MyOTIy
                        NDkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplOTNhYjlhMy1iMDNiLWNmNDMt
                        OTM0Zi05MGUwZTkyN2MwMTQiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1h
                        Z2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0i
                        Y3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplOTNhYjlhMy1iMDNiLWNmNDMtOTM0
                        Zi05MGUwZTkyN2MwMTQiIHN0RXZ0OndoZW49IjIwMTgtMDktMDdUMTY6NTk6NDIrMDM6MDAiIHN0
                        RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIvPiA8
                        cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Y2Fh
                        NDBhZGItMjllYS0yNDRhLThhMDQtZjg5MzZkZGE1Y2QwIiBzdEV2dDp3aGVuPSIyMDE4LTA5LTA3
                        VDE2OjU5OjQyKzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0Mg
                        MjAxOCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhp
                        c3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPkY4
                        QTlBRUM5QUQzNDEwRkRENEMwQzM4QTUzMTc1NTU0PC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90
                        b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwv
                        eDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YXYpbwAACPxJREFUaN7Fmk2PJEcRhp+IzKqa
                        /bZ2l/UuRsLGsgWWBRcsjvwEJA78Bm6c+BtIXMyBM8hIXLj6jIQAGa8RCGzEYmP8sbZ3WTw9M91V
                        mREc6mOqe3qmq2d2xyWVpqunKuvNyIg3It9ocXe+gOMyMBtdP618MYesXN+Po4vngQy8O2moR6/7
                        vbt3ERGe++6PZUsg5eoXvUVeAv4JXABenjLSvbt3mc1m7O7u8u/f/mTb9d1b/SIC3wLe6q7/NnWk
                        /OCvPHP9Ohnn4cfvn3mtdM16bTz+8Ydfe1EUVFVFjBFVfSxA7m770PyTP9NcvoxVBVoVhAuBe7/7
                        uZ8VyNZH0zQURYGIICLEGJnNZpwrEHvnlx51lxACKZZYUeJlhdSfnAlI3PaB3d1dVBVVRURApAWV
                        0vlapJ5/wE4QNBa4KFnAgxLZw99+zc8NyHw+J4SAiODuiMhgof39/XN01nqfSjKmQsIxhCKUlCFQ
                        15+dH5CU0mCFGGPrJ4CqMp/PzxGIz9HCcL2AFpdJGvCioMKw+cPzA5JzRlVx94FRpYucc7WIACqC
                        o2gocG+HCFrjdo7O2rNpb4Xx5/OleAk4SpYCDxVIQDzjKmT8/ICo6mCJ3ld6q2yRhe1MQP7zp18d
                        TtkVXHEiLgWiCiKnNsBWQMzsMMf0eLrie/X7TcF3JiApzTEBV8FFMQQkAQmRgEjg3Td+McVR/IxA
                        0lKOKctyyQohBOq6njJUdSYgYj44Kh4QIkpAXVsrqZAXe1OGunmmeqRpGjTnI7zSs6yITLXIGcNX
                        GjSEboENMFwMEwNRRAPkSez63mNh1n727s54yxpCwMyevEVs0eACLpAVPCoqsR1GAuaC5sWptp2n
                        YtZVvxj/71woPpABwR00O163/GHWcgtBcd89h6UxGzhkzKr9dW+pJ740OTe4SJux3IihLZqzQBbF
                        NCA6GYivAvnRtlHTW8PMlqzRn6ddmp9OR5EQpT3FMWsp37JgoogESnf233zVt3WLrX1klU1jjEs8
                        oqosFosn66wp7+EI5hDEsVTj2VAgSQcsQEqPtt7u6llZtb8enxOr+WdOT2jm3SMKzMlpjoRAQ8Ql
                        gDo7wciLSRa5d+ZcM87Gq/vgEAJN00wZ6qunBqLBBx6JJLLNMWi/E8gCqkLOkySKPgNfOZWPjD+P
                        mbb3l6Fwmn7c2R6IN4dOqU5KNeJOEEFcUFc0BkIR+fgvv5lKsc2pLLLKrKtKUR9ZW2gl/9oKyP6b
                        r3ohHZkFQcRRM3KzSxkTQsYEiBEpCuaz+09GQ6vrevABd8e72c/n86V80zPsturRZIs0i0dEkYFH
                        hKJNep4Rz6gr5kIOAakqpP7oCQFpmiX2HOsj6yJny2otTL471/+j1IxFbesRMZw8VPNIjWiDdzXK
                        xZDZf+NnUyOnmuwjKSWqqhoUI6NnU++sktuI8UNlYDabcfFxO+ss7xCKa+ilb6AXvkQsd4hhB+kI
                        zCyTcybXu+S9Tyl33+HB5w+5NW34C5OB3Llzh5vPPgvXvwbhGmgEjyMpQrplegrSNbgWefj+5PZJ
                        IVOL3fz5PQ9VBeVOV3F2ROYdEGvlcNeufKyNdHCAFlfRS9c3cf7tSc66+PwzNzPoapAe/JFJjP/f
                        5aGJmXha+Fqzh6uDOu4Z9wwuCDq8uN8BDgCjQXSsmT1GIJ1SdJI0tZqZ6fo4j4/Q9j71kozEot3x
                        O4gfXRb3llPEu0pOhRyEGMAevb/JEb+/EYgvFgNbrs58nUXG2bnnkwl+srcRSJNnhAgmitP2aFwO
                        H/NWisZFkRBH5UKBSkEIGZWDTa95fdoi9l0IX+8T7ezpkqAPEdSl4ilv+OhEiyz++4Fb6RAzZhHR
                        eETWFG9zsbihbofRIwUSKogBLSvmn73rp3bWlFLr+V2H6oj/TCHD7tlN9x4PZPaRl9RoqHAtEAmA
                        dsnNj4q+4rh4t8kfDRtKvKgoJcOj461yLJB6f3+pQ8Vpdvnu0EVOiJF0QvQo8OX1m7oDpAALEaRs
                        JQBk4JGjLx2co1UbyV3NUpC0bFmWk4F8uD5Q2sy6Wrn3f6f4x9I93S7wYPcTn1yPLB6852EnQAFG
                        QKRAcNxtEJzE179UpP+cgdiq06JQRMQcrfem+8igBPU7fWRJ8tpOHZJhrJOi56hFZg88qHV9mIhQ
                        tiA8Me73jGWr5VnQAhcHT7i397mAB0EtT7RIp7X3uWXdDMYV/FnUhBOBWJ61+5eudzfoIS4gdph9
                        R/XHek9tb/BWLwAJbf9PgN0PN/drxj26lamsyS8yOXKW/GqNXq/rOUjbSYy6EG04xLVttJOBdHsf
                        scHHfAqQEAI55401x2n11O7Z1zYCkXiZ5IbnBUJCmHcRU+BSDr5xLMOunWvbER1+W+X6981Rc+Wm
                        mFlrlZ5JR/rqOg1+s9btG5dzbQxeuPWiSJ2g8W6YDLkGa3CXLhMvD3qYHFtTtep06CltpEoCIrcn
                        Z9+cM6R0+LI+k3b6yBSLuPshH3X7nJwzlOUPJwNRrmANaK5RqXFtwDNQYERc2hx7qLuuZOG2mG0l
                        LjckZUgNSSu4eFMmA4kXL9I0DWY2aPDjrvcUi4y1FHImpURRFFtWaJduSI7X4CChC0esxlm0s5N+
                        ttLJEssy55DGRBDbQ2wPskOdKK7dka1r1os3bkvTNHjTDJEzdChGatG6fc3YT9wdb5oTd34bM1dR
                        3aTOCnWN5oYgDdgct+VsPNB+XzC4gWUkZ6RpmDWC3nhBTg0kPHVL3L3VU0dRtBq6q9UYvSKQM3Vd
                        U1XVBjF5oj5S33/PQ0yESwoxtLWKSMsNIjgy5BbtRZsmkxeJplZ2bj0nj0VVLK9epWka6vmcVNdD
                        NFnO0H0erJUzqa5JdU1d1yeCcPevb2UR9/wWKX9z8eg+wTMh9uXCcuo2d8yE7AE3Zefpr5xkiVeA
                        P24L5HvivE3ev8zB3lVs0VnBKnd/XkVeAB6K6ksSyh9w9Zmt0rM8wd/Ffwe4z9pfldsF0IOtfcQn
                        /jJ85fi9uz99jGsebO2s7v6KwKVTFkG1ka+sWOn4DHnM+Yq7v9j1ZaK53z7h3uPOb69+Z+4vr7v3
                        /4YVO7m0XwuLAAAAAElFTkSuQmCC
                        "
                        preserveAspectRatio="none"
                        height="305.74844"
                        width="112.99403"
                        transform="scale(-1)"/>
                    <path
                        seg="33-1"
                        style={style_1}
                        onClick={this.changeColor}
                        id="33-1"
                        d="m 82.607451,124.38233 c 0.767923,0.3072 1.51155,0.6751 2.22166,1.09915 1.263593,0.75457 2.422182,1.68692 3.74178,2.33861 1.721517,0.85018 3.641825,1.18747 5.51911,1.59025 2.11204,0.45314 4.211558,1.00176 6.361009,1.21603 1.80174,0.17961 3.61903,0.12202 5.42558,0 2.06185,-0.13927 4.117,-0.36211 6.17393,-0.56126 1.95632,-0.18941 3.97691,-0.37548 5.7062,-1.30963 1.58822,-0.85794 2.79742,-2.27825 4.30304,-3.27405 1.26006,-0.83339 2.69769,-1.35046 4.11595,-1.87088 0.33806,-0.12405 0.67892,-0.2502 0.98221,-0.44434 0.23493,-0.15038 0.44956,-0.34248 0.71442,-0.42997 0.13243,-0.0437 0.27676,-0.0592 0.41207,-0.0254 0.0677,0.0169 0.13248,0.046 0.18857,0.0875 0.0561,0.0414 0.1033,0.0953 0.13488,0.15745 0.036,0.0708 0.051,0.15054 0.0579,0.2297 0.007,0.0791 0.006,0.15881 0.0123,0.23802 0.0322,0.40681 0.24845,0.77427 0.3508,1.16931 0.12185,0.47029 0.0793,0.9652 0.0468,1.44993 -0.046,0.68519 -0.0702,1.37164 -0.0935,2.05798 -0.27442,8.06831 -0.4315,16.14017 -0.67716,24.20941 -0.45932,15.087 -1.22823,30.16265 -1.85208,45.24375 -0.41216,9.96375 -0.76101,19.93008 -1.05833,29.89792 -0.42816,14.3545 -0.76004,28.80665 -3.70417,42.8625 -1.18082,5.63747 -2.78953,11.21623 -5.29167,16.40416 -0.77572,1.60838 -1.69168,3.23916 -3.175,4.23334 -1.16763,0.78259 -2.5814,1.0969 -3.96875,1.32291 -0.89475,0.14576 -1.80051,0.2616 -2.70583,0.21458 -0.90533,-0.047 -1.81635,-0.26444 -2.58583,-0.74374 -0.74544,-0.46433 -1.32449,-1.15 -1.85208,-1.85209 -0.81004,-1.07795 -1.53158,-2.22475 -2.116673,-3.43958 -1.164528,-2.41791 -1.770018,-5.05972 -2.38125,-7.67292 -0.740815,-3.16721 -1.503117,-6.3307 -2.11667,-9.525 -0.790666,-4.1164 -1.332799,-8.27606 -1.852076,-12.43541 -1.588587,-12.7244 -2.968057,-25.47701 -3.95105,-38.26246 -0.958473,-12.46653 -1.539785,-24.9611 -2.61924,-37.41773 -0.693313,-8.00066 -1.591894,-15.98269 -2.61924,-23.94735 -0.920952,-7.13982 -1.946218,-14.27086 -3.3676,-21.32811 -0.298135,-1.48026 -0.613969,-2.95892 -0.80433,-4.45686 -0.115666,-0.91017 -0.184769,-1.83155 -0.0992,-2.74504 0.08584,-0.91639 0.326467,-1.83887 0.16536,-2.74506 -0.04189,-0.23565 -0.110738,-0.4671 -0.130019,-0.70567 -0.0096,-0.11928 -0.0067,-0.24023 0.01822,-0.35728 0.0249,-0.11705 0.07228,-0.2303 0.145795,-0.32473 0.09335,-0.11992 0.228426,-0.20669 0.376296,-0.24175 0.14787,-0.0351 0.307526,-0.0182 0.444774,0.0471 z"
                  />
                    <path
                        seg="33-2"
                        style={style_2}
                        onClick={this.changeColor}
                        id="32-2"
                        d="m 80.004071,124.29068 c 0.232004,-0.12632 0.497639,-0.19019 0.76171,-0.18313 0.180611,0.005 0.358588,0.042 0.53788,0.0643 0.220856,0.0275 0.443964,0.0325 0.6665,0.0292 0.236901,-0.003 0.4774,-0.0158 0.70743,0.0409 0.06594,0.0163 0.130431,0.0381 0.19338,0.0636 0.07317,0.0296 0.144234,0.0642 0.21497,0.0992 1.526655,0.75616 2.919192,1.75374 4.39043,2.61276 0.809224,0.47249 1.646037,0.9047 2.53008,1.21543 1.103241,0.38778 2.263249,0.58093 3.40651,0.82683 1.725149,0.37105 3.424931,0.86553 5.167166,1.1456 1.867883,0.30027 3.768883,0.35115 5.659433,0.28063 2.73692,-0.10209 5.45727,-0.45671 8.18513,-0.70158 0.71866,-0.0645 1.43877,-0.12151 2.15152,-0.23386 1.16136,-0.18307 2.31198,-0.51882 3.32083,-1.12254 0.8305,-0.49699 1.54471,-1.16208 2.29183,-1.77734 0.4117,-0.33904 0.83484,-0.664 1.26285,-0.98221 0.4236,-0.31494 0.85296,-0.62393 1.30962,-0.88867 0.43467,-0.25199 0.89212,-0.46273 1.35639,-0.65481 0.36934,-0.1528 0.74351,-0.29406 1.12254,-0.42095 0.42607,-0.14264 0.86038,-0.26798 1.26284,-0.46773 0.36263,-0.17998 0.6967,-0.41912 1.07577,-0.56126 0.23093,-0.0866 0.47528,-0.13581 0.70158,-0.23386 0.14504,-0.0628 0.28589,-0.14951 0.37417,-0.28063 0.0545,-0.0809 0.0864,-0.17523 0.10562,-0.27086 0.0192,-0.0956 0.0263,-0.19323 0.0347,-0.29041 0.21823,-2.51201 1.38123,-4.82729 2.42036,-7.12468 1.45132,-3.20869 2.69548,-6.50617 3.96875,-9.78958 1.93738,-4.995969 3.94639,-9.97032 5.55625,-15.081242 1.40865,-4.47214 2.50825,-9.038273 3.96875,-13.49375 1.40262,-4.278912 3.14751,-8.496192 3.70416,-12.96459 0.91051,-7.308897 -1.43152,-14.619568 -4.23333,-21.43124 -1.59162,-3.869503 -3.34276,-7.674652 -5.29167,-11.37709 -1.91737,-3.642518 -4.02636,-7.185546 -6.35,-10.58333 -1.88296,-2.753392 -3.90698,-5.411404 -6.08541,-7.9375 -1.89558,-2.1981054 -3.97636,-4.3460353 -6.61459,-5.5562501 -1.5807,-0.725099 -3.30437,-1.0849162 -5.02708,-1.32292 -3.77393,-0.521395 -7.6109,-0.4836837 -11.37709,-1.05833 -3.26218,-0.497744 -6.492309,-1.4555394 -9.789579,-1.32292 -3.498655,0.1407193 -6.862209,1.5184114 -9.78958,3.43958 -3.615174,2.3725584 -6.634675,5.5601481 -9.26042,8.9958401 -3.224041,4.218539 -5.903194,8.854035 -7.9375,13.75833 -3.900106,9.402358 -5.38835,19.738024 -4.7625,29.89792 0.629417,10.217801 3.344959,20.196924 6.61459,29.89791 2.022196,5.999849 4.262371,11.928332 6.08541,17.991662 0.752832,2.50388 1.43395,5.0289 2.18983,7.53186 0.661077,2.18904 1.382429,4.37491 1.6838,6.64165 0.109113,0.82068 0.165585,1.66134 0.46772,2.43215 0.14583,0.37204 0.347565,0.72211 0.59634,1.03483 l 0.22051,0.26501 z"
                      />
                </g>
            </svg>
        );
    }
}

const mapStateToProps = state => {

    return state;

};

const mapDispatchToProps = dispatch => {

    return {

        setTeethChart: ( data, type ) => dispatch ( actions.setTeethChart ( data, type ) ),

    };

};

export default connect ( mapStateToProps, mapDispatchToProps ) ( T33 );
