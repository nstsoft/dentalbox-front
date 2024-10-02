
import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import * as R from 'ramda';

import implant from '../../images/teeth-icons/implant.png';
import crown from '../../images/teeth-icons/crown.png';
import removed from '../../images/teeth-icons/removed.png'

class T42 extends Component {

    constructor ( props ) {
        super( props );
        this.colorSet = [ 'none', 'rgb(102, 89, 89)', 'rgb(176, 71, 71)', 'rgb(51, 87, 163)', 'rgb(57, 142, 40)' ];

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

            '42': {

                [code]: { color: newColor },
                removed: false,
                implant: false

            }

        };

        this.props.setTeethChart( teeth, '42' )

    };

    render () {

        if( R.path(['tooth', '42','implant'], this.props) ){return <img  src={implant} />}
        if( R.path(['tooth', '42','crown'], this.props)){return <img  src={crown} />}
        if( R.path(['tooth', '42','removed'], this.props)){return <img   src={removed} />}

        let style_1 = {
            'fill': R.path( ['tooth', '42', '42-1', 'color'], this.props ) || 'none',
            'stroke': '#000000',
            'strokeWidth': '0.26428332px',
            'strokeLinecap': 'butt',
            'strokeLinejoin': 'miter',
            'strokeOpacity': '0'
        };
        let style_2 = {
            'fill': R.path( ['tooth', '42', '42-2', 'color'], this.props ) || 'none',
            'stroke': '#000000',
            'strokeWidth': '0.26428332px',
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
                y="-296.64957"
                x="50.177521"
                id="image6552"
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
                    transform="scale(1,-1)"/>
                <path
                    seg="42-1"
                    onClick={this.changeColor}
                    style={style_1}
                    d="m 135.73285,120.35332 c -0.25078,0.09 -0.50027,0.18351 -0.74836,0.28063 -1.00296,0.39264 -1.98285,0.84347 -2.99342,1.21608 -1.85241,0.683 -3.79562,1.09813 -5.75297,1.35639 -3.54513,0.46775 -7.13633,0.42574 -10.71083,0.32741 -2.34408,-0.0645 -4.69204,-0.15321 -7.01582,-0.46772 -2.50647,-0.33924 -4.97258,-0.93984 -7.39001,-1.6838 -1.385578,-0.42641 -2.756345,-0.90005 -4.115952,-1.40316 -1.183177,-0.43782 -2.387037,-0.90399 -3.64823,-0.93545 -0.342934,-0.009 -0.686284,0.0154 -1.02898,0 -0.127654,-0.006 -0.255478,-0.0169 -0.38302,-0.009 -0.127542,0.008 -0.256452,0.0358 -0.36534,0.10268 -0.105587,0.0648 -0.188553,0.1653 -0.23386,0.28063 -0.04046,0.103 -0.05114,0.21576 -0.04595,0.3263 0.0052,0.11054 0.02575,0.21971 0.04595,0.32851 0.403968,2.17645 0.681891,4.37551 0.86125,6.58185 0.68303,8.40212 -0.06394,16.84445 -0.39688,25.26771 -0.562655,14.23478 0.05866,28.48579 0.26459,42.7302 0.170851,11.818 0.05568,23.63927 -0.26459,35.45417 -0.404028,14.90487 -1.134174,29.82961 -0.26458,44.71458 0.119513,2.04572 0.271491,4.10388 0.79375,6.08542 0.646043,2.4512 1.842786,4.72256 3.175,6.87917 1.193056,1.93134 2.559555,3.84548 4.497922,5.02708 2.03384,1.2398 4.49755,1.54892 6.87917,1.5875 1.69081,0.0274 3.39968,-0.0697 5.02708,-0.52917 0.53506,-0.15107 1.06388,-0.34308 1.53379,-0.64022 0.46992,-0.29713 0.88048,-0.7064 1.11204,-1.21186 0.28142,-0.61428 0.28039,-1.32287 0.17217,-1.98983 -0.10822,-0.66695 -0.3171,-1.31392 -0.43675,-1.97892 -0.25062,-1.39286 -0.10416,-2.82194 0,-4.23333 0.13056,-1.76906 0.19423,-3.54971 0.52917,-5.29167 0.57065,-2.96787 1.90707,-5.72327 3.175,-8.46667 1.80774,-3.91138 3.50234,-7.87612 5.02708,-11.90625 1.73784,-4.59341 3.25474,-9.2717 4.49792,-14.02291 1.34474,-5.13937 2.36814,-10.35967 3.175,-15.61042 2.39078,-15.55841 2.87849,-31.36266 2.38124,-47.09583 -0.1785,-5.64796 -0.48327,-11.2911 -0.79375,-16.93334 -0.3302,-6.0006 -0.66449,-12.05424 0.26459,-17.99166 0.73831,-4.71826 2.26488,-9.29108 2.91041,-14.02292 0.35844,-2.6274 0.44238,-5.28615 0.39688,-7.9375 -0.0166,-0.97025 -0.0506,-1.94015 -0.0661,-2.91042 -0.004,-0.24808 -0.007,-0.49622 -0.0165,-0.74414 -0.005,-0.12148 -0.0112,-0.24298 -0.0248,-0.3638 -0.006,-0.0556 -0.014,-0.11102 -0.0232,-0.16619 z"
                    id="42-1"
                />
                <path
                    seg="42-2"
                    onClick={this.changeColor}
                    style={style_2}
                    d="m 135.84702,119.98208 c -0.86695,0.42406 -1.74971,0.81578 -2.64583,1.17409 -1.47718,0.59064 -2.99325,1.09109 -4.54753,1.4304 -2.35265,0.5136 -4.7699,0.65374 -7.17682,0.7276 -3.11962,0.0957 -6.24386,0.0828 -9.35963,-0.0992 -1.37154,-0.0801 -2.74237,-0.19311 -4.10105,-0.39687 -1.59615,-0.23937 -3.17152,-0.60343 -4.72942,-1.02526 -2.39689,-0.649 -4.755522,-1.43523 -7.077612,-2.31511 -0.740665,-0.28065 -1.491838,-0.57411 -2.28203,-0.62838 -0.58333,-0.0401 -1.168465,0.0521 -1.75286,0.0331 -0.242702,-0.008 -0.484787,-0.035 -0.72761,-0.0331 -0.110278,8.4e-4 -0.220714,0.008 -0.33073,0 -0.04579,-0.003 -0.09299,-0.009 -0.13229,-0.0331 -0.02599,-0.0157 -0.04733,-0.0385 -0.06304,-0.0645 -0.01571,-0.026 -0.02593,-0.055 -0.032,-0.0848 -0.01214,-0.0595 -0.0079,-0.12091 -0.0042,-0.1815 0.136156,-2.20663 -0.479772,-4.38159 -1.05833,-6.51537 -2.393162,-8.82624 -4.243425,-17.795026 -6.74688,-26.59062 -1.878478,-6.599808 -4.121092,-13.089323 -6.35,-19.57917 -1.177723,-3.429143 -2.352114,-6.859925 -3.43958,-10.31875 -0.655152,-2.083794 -1.280858,-4.187272 -1.5875,-6.35 -0.424404,-2.993289 -0.225455,-6.068299 0.52917,-8.99583 1.121971,-4.352635 3.438236,-8.314554 6.133881,-11.911461 2.695646,-3.596908 5.784129,-6.878124 8.682779,-10.313539 3.12559,-3.704379 6.198034,-7.725413 10.58334,-9.7895898 2.271634,-1.0692653 4.784482,-1.5478023 7.290092,-1.7077054 2.50561,-0.1599031 5.01931,-0.011039 7.52658,0.1202054 3.62156,0.1895728 7.24955,0.3427554 10.84791,0.79375 5.62936,0.7055467 11.23754,2.170943 16.13958,5.0270898 3.10098,1.806769 5.90959,4.182659 7.9375,7.14375 0.96039,1.402334 1.73913,2.924197 2.38125,4.49791 1.44292,3.536312 2.19464,7.319894 2.64584,11.11251 0.62605,5.262416 0.68764,10.577845 0.52916,15.875 -0.18875,6.309043 -0.69283,12.636235 -2.11666,18.78541 -1.35982,5.872722 -3.54196,11.516315 -5.55625,17.19792 -2.06576,5.826803 -3.96281,11.72008 -5.42396,17.72708 -0.9711,3.99234 -1.74827,8.02903 -2.64583,12.03854 -0.10693,0.47765 -0.21574,0.9556 -0.36381,1.42214 -0.12975,0.40882 -0.28949,0.80844 -0.39687,1.2237 -0.0392,0.15148 -0.0715,0.30665 -0.0661,0.46302 5.1e-4,0.0149 0.001,0.03 -7.9e-4,0.0448 -0.002,0.0148 -0.008,0.0295 -0.018,0.0402 -0.009,0.009 -0.0206,0.0146 -0.0328,0.0179 -0.0122,0.003 -0.0248,0.004 -0.0373,0.006 -0.0397,0.004 -0.08,0.008 -0.11693,0.0234 -0.0301,0.0123 -0.0571,0.031 -0.085,0.0475 -0.028,0.0166 -0.058,0.0314 -0.0904,0.0345 -0.0265,0.003 -0.0537,-0.003 -0.077,-0.0161 -0.0233,-0.0129 -0.0425,-0.033 -0.0544,-0.0569 z"
                    id="42-2"
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

export default connect( mapStateToProps, mapDispatchToProps )( T42 );








