
import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import * as R from 'ramda';

import implant from '../../images/teeth-icons/implant.png';
import crown from '../../images/teeth-icons/crown.png';
import removed from '../../images/teeth-icons/removed.png'

class T43 extends Component {

    constructor ( props ) {
        super( props );
        this.colorSet = [ 'none', 'rgb(102, 89, 89)', 'rgb(176, 71, 71)', 'rgb(51, 87, 163)', 'rgb(57, 143, 40)' ];

    }

    changeColor = ( event ) => {
        const { isToothToggleable } = this.props;
        if (!isToothToggleable) return;
        
        let segment = event.target;
        let code    = segment.attributes.seg.value;
        let indexOf = this.colorSet.indexOf( segment.style.fill ) + 1;

        if ( indexOf === 5 ) {

            indexOf = 0;

        }

        let newColor = this.colorSet[ indexOf ];

        let teeth = {

            '43': {

                [code]: { color: newColor },
                removed: false,
                implant: false

            }

        };

        this.props.setTeethChart( teeth, '43' )

    };

    render () {

        if( R.path(['tooth', '43','implant'], this.props) ){return <img  src={implant} />}
        if( R.path(['tooth', '43','crown'], this.props)){return <img   src={crown} />}
        if( R.path(['tooth', '43','removed'], this.props)){return <img   src={removed} />}

        let style_1 = {
            'fill': R.path( ['tooth', '43', '43-1', 'color'], this.props ) || 'none',
            'stroke': '#000000',
            'strokeWidth': '0.26438332px',
            'strokeLinecap': 'butt',
            'strokeLinejoin': 'miter',
            'strokeOpacity': '0'
        };
        let style_2 = {
            'fill': R.path( ['tooth', '43', '43-2', 'color'], this.props ) || 'none',
            'stroke': '#000000',
            'strokeWidth': '0.26438332px',
            'strokeLinecap': 'butt',
            'strokeLinejoin': 'miter',
            'strokeOpacity': '0'
        };
        return (
        <svg
            viewBox="0 0 210 297"
            version="1.1">
            <g>
            <image
                y="-295.78082"
                x="48.030975"
                id="image6505"
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
                    transform="scale(1,-1)"/>
                <path
                    seg="43-1"
                    onClick={this.changeColor}
                    style={style_1}
                    d="m 126.44853,124.38233 c -0.76792,0.3072 -1.51155,0.6751 -2.22166,1.09915 -1.26359,0.75457 -2.42218,1.68692 -3.74178,2.33861 -1.72152,0.85018 -3.64183,1.18747 -5.51911,1.59025 -2.11204,0.45314 -4.21156,1.00176 -6.36101,1.21603 -1.80174,0.17961 -3.61903,0.12202 -5.42558,0 -2.06185,-0.13927 -4.116994,-0.36211 -6.173926,-0.56126 -1.956324,-0.18941 -3.976909,-0.37548 -5.7062,-1.30963 -1.588219,-0.85794 -2.797422,-2.27825 -4.30304,-3.27405 -1.260063,-0.83339 -2.69769,-1.35046 -4.11595,-1.87088 -0.338063,-0.12405 -0.678918,-0.2502 -0.98221,-0.44434 -0.234928,-0.15038 -0.44956,-0.34248 -0.714419,-0.42997 -0.13243,-0.0437 -0.276762,-0.0592 -0.412074,-0.0254 -0.06765,0.0169 -0.132473,0.046 -0.188562,0.0875 -0.05609,0.0414 -0.103306,0.0953 -0.134885,0.15745 -0.03598,0.0708 -0.05103,0.15054 -0.05791,0.2297 -0.0069,0.0791 -0.006,0.15881 -0.01229,0.23802 -0.03223,0.40681 -0.24845,0.77427 -0.3508,1.16931 -0.121846,0.47029 -0.07931,0.9652 -0.0468,1.44993 0.04596,0.68519 0.07016,1.37164 0.0935,2.05798 0.274416,8.06831 0.431495,16.14017 0.67716,24.20941 0.459317,15.087 1.228232,30.16265 1.85208,45.24375 0.412163,9.96375 0.761011,19.93008 1.05833,29.89792 0.428163,14.3545 0.760043,28.80665 3.70417,42.8625 1.180819,5.63747 2.789526,11.21623 5.29167,16.40416 0.775723,1.60838 1.691678,3.23916 3.175,4.23334 1.167631,0.78259 2.581403,1.0969 3.96875,1.32291 0.894756,0.14576 1.800506,0.2616 2.705836,0.21458 0.90532,-0.047 1.81634,-0.26444 2.58582,-0.74374 0.74544,-0.46433 1.32449,-1.15 1.85208,-1.85209 0.81004,-1.07795 1.53159,-2.22475 2.11668,-3.43958 1.16453,-2.41791 1.77002,-5.05972 2.38125,-7.67292 0.74081,-3.16721 1.50312,-6.3307 2.11667,-9.525 0.79067,-4.1164 1.33279,-8.27606 1.85207,-12.43541 1.58858,-12.7244 2.96806,-25.47701 3.95105,-38.26246 0.95847,-12.46653 1.53979,-24.9611 2.61924,-37.41773 0.69331,-8.00066 1.59189,-15.98269 2.61924,-23.94735 0.92095,-7.13982 1.94622,-14.27086 3.3676,-21.32811 0.29814,-1.48026 0.61397,-2.95892 0.80433,-4.45686 0.11567,-0.91017 0.18477,-1.83155 0.0992,-2.74504 -0.0858,-0.91639 -0.32647,-1.83887 -0.16536,-2.74506 0.0419,-0.23565 0.11074,-0.4671 0.13002,-0.70567 0.01,-0.11928 0.007,-0.24023 -0.0182,-0.35728 -0.0249,-0.11705 -0.0723,-0.2303 -0.14579,-0.32473 -0.0933,-0.11992 -0.22843,-0.20669 -0.3763,-0.24175 -0.14787,-0.0351 -0.30752,-0.0182 -0.44477,0.0471 z"
                    id="43-1"
                />
                <path
                    seg="43-2"
                    onClick={this.changeColor}
                    style={style_2}
                    d="m 129.05191,124.29068 c -0.232,-0.12632 -0.49764,-0.19019 -0.76171,-0.18313 -0.18061,0.005 -0.35859,0.042 -0.53788,0.0643 -0.22086,0.0275 -0.44396,0.0325 -0.6665,0.0292 -0.2369,-0.003 -0.4774,-0.0158 -0.70743,0.0409 -0.0659,0.0163 -0.13043,0.0381 -0.19338,0.0636 -0.0732,0.0296 -0.14423,0.0642 -0.21497,0.0992 -1.52665,0.75616 -2.91919,1.75374 -4.39043,2.61276 -0.80922,0.47249 -1.64604,0.9047 -2.53008,1.21543 -1.10324,0.38778 -2.26325,0.58093 -3.40651,0.82683 -1.72515,0.37105 -3.42493,0.86553 -5.16716,1.1456 -1.86789,0.30027 -3.76888,0.35115 -5.65944,0.28063 -2.73692,-0.10209 -5.45727,-0.45671 -8.185126,-0.70158 -0.718658,-0.0645 -1.438774,-0.12151 -2.15152,-0.23386 -1.16136,-0.18307 -2.311976,-0.51882 -3.32083,-1.12254 -0.830502,-0.49699 -1.544711,-1.16208 -2.29183,-1.77734 -0.411704,-0.33904 -0.834842,-0.664 -1.26285,-0.98221 -0.423605,-0.31494 -0.852959,-0.62393 -1.30962,-0.88867 -0.434671,-0.25199 -0.892121,-0.46273 -1.35639,-0.65481 -0.369343,-0.1528 -0.743512,-0.29406 -1.12254,-0.42095 -0.426066,-0.14264 -0.860377,-0.26798 -1.26284,-0.46773 -0.362631,-0.17998 -0.696701,-0.41912 -1.07577,-0.56126 -0.230931,-0.0866 -0.475279,-0.13581 -0.70158,-0.23386 -0.14504,-0.0628 -0.285888,-0.14951 -0.37417,-0.28063 -0.05448,-0.0809 -0.08641,-0.17523 -0.105624,-0.27086 -0.01922,-0.0956 -0.02625,-0.19323 -0.0347,-0.29041 -0.218232,-2.51201 -1.381231,-4.82729 -2.42036,-7.12468 -1.451317,-3.20869 -2.695478,-6.50617 -3.96875,-9.78958 -1.937384,-4.995969 -3.946392,-9.97032 -5.55625,-15.081242 -1.408652,-4.47214 -2.508248,-9.038273 -3.96875,-13.49375 -1.402624,-4.278912 -3.147507,-8.496192 -3.70416,-12.96459 -0.91051,-7.308897 1.431521,-14.619568 4.23333,-21.43124 1.591622,-3.869503 3.342756,-7.674652 5.29167,-11.37709 1.917372,-3.642518 4.026357,-7.185546 6.35,-10.58333 1.882963,-2.753392 3.906979,-5.411404 6.08541,-7.9375 1.895581,-2.1981054 3.976356,-4.3460353 6.61459,-5.5562501 1.580695,-0.725099 3.304373,-1.0849162 5.02708,-1.32292 3.773934,-0.5213948 7.610896,-0.4836839 11.377086,-1.05833 3.26218,-0.4977441 6.49231,-1.4555395 9.78958,-1.32292 3.49866,0.1407193 6.86221,1.5184115 9.78958,3.43958 3.61517,2.3725584 6.63467,5.5601481 9.26042,8.9958401 3.22404,4.218539 5.90319,8.854035 7.9375,13.75833 3.90011,9.402358 5.38835,19.738024 4.7625,29.89792 -0.62942,10.217801 -3.34496,20.196924 -6.61459,29.89791 -2.0222,5.999849 -4.26237,11.928332 -6.08541,17.991662 -0.75283,2.50388 -1.43395,5.0289 -2.18983,7.53186 -0.66108,2.18904 -1.38243,4.37491 -1.6838,6.64165 -0.10911,0.82068 -0.16559,1.66134 -0.46772,2.43215 -0.14583,0.37204 -0.34757,0.72211 -0.59634,1.03483 l -0.22051,0.26501 z"
                    id="43-2"
                />
            </g>
        </svg> )
    }
}

const mapStateToProps = state => {

    return state;

};

const mapDispatchToProps = dispatch => {

    return {

        setTeethChart: ( data, type ) => dispatch( actions.setTeethChart( data, type ) ),

    };
    
};

export default connect( mapStateToProps, mapDispatchToProps )( T43 );








