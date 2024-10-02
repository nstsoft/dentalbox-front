import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import * as R from 'ramda'

import implant from '../../images/teeth-icons/implant.png';
import crown from '../../images/teeth-icons/crown.png';
import removed from '../../images/teeth-icons/removed.png'

class T28 extends Component {

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

            '28': {

                [code]:  { color: newColor },
                removed: false,
                implant: false,

            },

        };

        this.props.setTeethChart ( teeth, '28' );

    };

    render () {

        if( R.path(['tooth', '28','implant'], this.props) ){return <img className="rotated" src={implant} />}
        if( R.path(['tooth', '28','crown'], this.props)){return <img className="rotated" src={crown} />}
        if( R.path(['tooth', '28','removed'], this.props)){return <img className="rotated" src={removed} />}

        let style_1 = {
            'fill':           R.path( ['tooth', '28','28-1','color'],this.props  )|| 'none',
            'stroke':         '#000000',
            'strokeWidth':    '0.26458332px',
            'strokeLinecap':  'butt',
            'strokeLinejoin': 'miter',
            'strokeOpacity':  '0',
        };
        let style_2 = {
            'fill':           R.path( ['tooth', '28','28-2','color'],this.props  ) || 'none',
            'stroke':         '#000000',
            'strokeWidth':    '0.26458332px',
            'strokeLinecap':  'butt',
            'strokeLinejoin': 'miter',
            'strokeOpacity':  '0',
        };
        let style_3 = {
            'fill':           R.path( ['tooth', '28','28-3','color'],this.props  ) || 'none',
            'stroke':         '#000000',
            'strokeWidth':    '0.26458332px',
            'strokeLinecap':  'butt',
            'strokeLinejoin': 'miter',
            'strokeOpacity':  '0',
        };
        let style_4 = {
            'fill':           R.path( ['tooth', '28','28-4','color'],this.props  ) || 'none'  ,
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
                        y="2.3954239"
                        x="-175.26935"
                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAA/CAYAAABqzXG5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAG
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
                        MjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA5LTA3VDA5OjE2OjQ1KzAzOjAw
                        IiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTA5LTA3VDA5OjE2OjQ1KzAzOjAwIiB4bXA6TW9kaWZ5
                        RGF0ZT0iMjAxOC0wOS0wN1QwOToxNjo0NSswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlp
                        ZDowZTJhYzNmNC1iY2IyLTA4NGYtOGZmMS1iMGMwN2Q2NThmNTQiIHhtcE1NOkRvY3VtZW50SUQ9
                        ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxNGM2MjQxYi0zNjI2LTg1NDMtYmE5NS02ZWM3YWU1Y2E1
                        MjQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowZmZiN2Q0My1lNGRlLTYxNGMt
                        YTg0Ny0xYjIxM2ZhMGU4ODIiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1h
                        Z2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0i
                        Y3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowZmZiN2Q0My1lNGRlLTYxNGMtYTg0
                        Ny0xYjIxM2ZhMGU4ODIiIHN0RXZ0OndoZW49IjIwMTgtMDktMDdUMDk6MTY6NDUrMDM6MDAiIHN0
                        RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIvPiA8
                        cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MGUy
                        YWMzZjQtYmNiMi0wODRmLThmZjEtYjBjMDdkNjU4ZjU0IiBzdEV2dDp3aGVuPSIyMDE4LTA5LTA3
                        VDA5OjE2OjQ1KzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0Mg
                        MjAxOCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhp
                        c3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPkY4
                        QTlBRUM5QUQzNDEwRkRENEMwQzM4QTUzMTc1NTU0PC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90
                        b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwv
                        eDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHGxBgAAC+tJREFUaN6tmcuPZNlRxn9xHveR
                        WV1VPd093TZGYG+wV0gI8Q+wQGD+AxZsWCFgg8SatYWQBgskNhZCjIRACBlmbAsL8bAtC9kee4R4
                        yB4zPdP0uN9d1VX5uPeeE8HiPiqrKit7LCalq8rMuo/vfPFFxHciMTO2Hd//7j/aW1/5vH37S6/Z
                        +J2qHqrqfPz81te+aFddv3l8843P2zv/9pcvPdex5XX/y79p/u7r3OK/2Fu9NX0vIkcisgC4+80v
                        2P7jv+Xu3/2GseP1/a/9qX2c72H33+Thd76w89xLYN7+17+2pmk4ODhAVTk4ONh64cnJyZt1XaOq
                        l/5nZmF6gOsfcXBwwPvvv8+HBmN3/8r8o69y7XAfFeOomXHnF1+TbRdac/JZCZ56b85//v3vTis2
                        eBWRmxh3YBF8fYuMEcqCw/gjXnz7D69kJ2x+ePfdd5nNZsQYWS6XhDC/ehXO4Zwjxogu8lko4dH4
                        BubUdc1pzpgZZVny4MED9j8MM+3zf2deZ4xM263h1qevBGNmrB3EsmS/WHP/H35r64rvfOaXJGXw
                        CLOg2PrehwvTuFKAlNKVetkQNCJCVVWcnJzsPC+lRIxxuv9OMO99689NihIfCgxHVijjnR1IlCaD
                        OsFHjwuOpz/48lZ2cteBC7iixsqa//7nP7KdYE5OTogxIiKY2cjUl67C4r3HzAghUBQFMUYePny4
                        XZghTFkXY2S9Xu9mRk8fkaKD4BEDh2Bmv3IVGA0zoiVMgKpG4xw9/p/tJ2fD42hixMo9rP3gJWBU
                        cc4RQsA5N7Lzxi4Bj8fITNd1V2oGYDabbd57h4BdA/IKYX4D5xwiQpeOfnWnePHkZFgxh+IAZ0v4
                        4et2GbhgJrjiJhIPqNXRvP1528mMiFAUBSKCc+7K2I7MjCsOIRBCwHvP8fHxVuBmRoyRoijw3tM0
                        zdXMiAZUKqyYY7FAQyQvn12dhu0Cc0Ymk2QPypradzSn/3sZuE+o6+ikhmKf6Bva9bPddUZEEOfw
                        3uO9Z7lcXgkm5zyFc8wq7/1WNkfWAYqiwDm3lZmwSbviwHmIM6SYo4v7V4JRO5qaYIdHipogHalL
                        l8PkHOIc5gPmA951NOvF1cxsqnyMa855ZwX23k8L8d7jnNuaUSODmxHYdu8zATtFdAE59zUjzplL
                        y+l3PndJ9avv/bGV0uJCpI0eEYdznugBPQ/mna//iUmIuFhgUoAr8WJY7nbXGQDLGe/9VFmfPbss
                        tKOjo0kjI6Njn9rieyadjEyO4b0STHAel9doc0ou5qQ4Y152LF9crpark7vMoyLeo+YRFzAcIgac
                        N1u2vgdlRQ4Rs4Rqh4gN577E6aWUCCFMNSGEcOmitm2JMV5iZRs7I8sXdbOtCm+AmUFe0q2P+3rj
                        anJZEvb3efuLvzdd+YNv/Jn5usBVkTYK6iNIpmmXqDgyZw/84Ku/bTfKhCtKmjDHoeSuwbmAiL8a
                        TIwRM6NtW1R1Wk1RFAA8Gcz048ePqapqYmzMpG1e+OTkZLrPqJOU0pXMnBnn2SG+fR+XO1JKFEXB
                        sogUGDdmz3hx7xusH37LPu4SvrpJU+6BGdF5XLcgNKeY5UkL7//LH5ivS+K8JsWIOI+zFtEGE4/t
                        YmY2m5FSIudM0zQTIyEE5vP51HeKoqCqqin+IkLbtuScp552958+Z0+fPqWqquk+Y93axuAlMD/1
                        C78upA7JiXZ1RJAWEU/yJXnvkHB4i6qOnJweQW6IoogKokrbPiP4NdZCXivLR29xe/4ct7/PqpiR
                        iXgXSd0ppitEDWcv8cCqiqpOuimKYuordV1z/fp1Qgjcu3ePJ0+ekHMmD86/aRoWiwWqyv7+Pnt7
                        exMrIzMppXPdfudWRbOgWSj0BdpGgq9pxVASsSrowk2Ksubg6BHN4x9x+uQB3ntEPG3bIsEze+U6
                        ev2QdbWHiSIIagGco22WBLcGUdTSbjAhhL5nDCutZvWgeiPEQFFGGjLF9evkes56vR6yw1HXNUVd
                        4WJFW5Z9tXWO1Nm5TBr70jZ2zoFxcU6bPXOUnE5JucKHAlJDk1ZU80/i401eHD/DVQ1eF5TjTS2w
                        Ek8IFUVZ4ZyjXT3HTHGApoRpQ1TFzOMk7gZT1zVN06CqmPUd2HtPHhg9Pj7m9u3bXKsLXhw9RFI3
                        ZYd3BXU9pyznrJuW5XKJDHpzfgjj4H1UdepTV4KJ9Q2OV/cpc0eBJ3WLvrhJX/ZLecbxo+dcO/xJ
                        btz5NEllCFMGSdj6iMXJU7q0xgHipWfG9bXLoViGVXaE2Su7wRRFMWXHWCVTSsiQAUa/qqdPn+JP
                        lFjOBg20tN0S153grMV5udTvzAwZ7plzZm+vfgkz8QZqPwQUyRkXwLLHcJiB0W9nCltj3QekrutB
                        qqdwDnU6OMbQD3/MEHFobvuWoB1tbmjUUVaf2l1nxn3wNrVv68hjlozfjzVks5aY2bnzxtp0bcs+
                        /nw2hZJsfd0wE7AAnD0AUegrByLQD76s/4z0Ds4UZxkMcP0W2NQREFxWLGc68TC7sRvM5h5nc899
                        tnvUYfY2rHpoiqNPMtHps/Vx7bNJBFOb7quqsKtr9zHLfd9wgWTQWYFKjcgMiXOkjMRY412FdyXq
                        +saIDuDI5NygqYPU0OoK7U7JaUlBQ20tORleHEi7BYxxE+EJwGq1GmqMUVUV89krxOqQWF2H4hpE
                        DxJByimEfbzcNCaBBKa9Mbc1pAXanpIWz7EXifV6jWqLNs0lmxlGIABL5lz/2M9z8DM/y97BbcQH
                        IPaUmmF0/fN1CIPr6T/be5+FFqG/3huuChTXDG53vPKxY2z+DgvZ59pFiZxzXA+/bpQl7L8KUvcY
                        1G9sxvK4gxviKldOFHrNyZD6fThNW4QMixf9Ag8/I1dqpvO3iL4ka4FzQ3q6hIx+SJmE2xdBzgn4
                        wmQAwRAEEYdpQhyoCo6CLnXEl/mZizWlT2npjysmERd3i+OefTMTZbiHiMDGJGsrmO74gREEogOL
                        YBFVAfw0X+nNBGCC6cDIkLKXhkiq/VRrCGV/jsfw4EGio3l+37aD6bqhKcqVTuzHfW365M33iBBC
                        mHYKlzWTl0iowDl0aHQu6f8PzFgM0b7GaezTzHvwgaDry2Ds6KGFECbUH9VrM3ybgr84cz7PTDql
                        8B51HlyBw39EcMZhUl8SzPnJFUoAF9aXBayqMDiyzX70Ub0udvUNekhP/uN3zoFJPkHUscX0c2D7
                        McWxpdiMU4npxy0TZMhMFQc+YCG+1h0/eANNMzchHzzpR6mbsc9dQHiWXcMePOf8WVxYhvboAxMX
                        pizvaewditu4QV+AbVTCRQ76/1+wFLhetMO0HQU8kE3w1odJxZFzO2RvSr0NGNBu08rmCsdzth0v
                        y6re8cm5WY3f0GnoVwTe9fEEBxZwGCqrYYFhWr9p72v7h+SJgTN+zv6Ob4xx9OqGL93QRPXsHkC4
                        WG1HF3+RhZfVj3Pn2Fl4z2enna/Ek+UYJu3iSnxaQddhtWDZ9xIRQawG6zDphoXGwUrYdJNNIGI9
                        /aN2HDoYsNCbMVcMAJagCZISFJzvBwSuqqo3U0ow7Jcmj8rQZQfFOx+mLLiok/OrPfv9cvP/Uxdn
                        g2lV2qZhduMTMpmr/Pg9c05hXiBFQDXgfIFJ7N0buTdFuoCUoU29OfJA8Jj3YH7wOYO+pKAP+NB8
                        EYwOsQR6CkmxVUdqPfHVn5ap6PnZjK7rpsmSiPQ20ww17Y+UsJRo12u69Zpmtfqbdr0mDbOcS5m2
                        8d3ISD92ydjASNu2E5BztnP9/JEFPSJUFZTlYLSHFm8ddBla6Boh3v6kADRHj38ttyd/UYeElGW/
                        tOBB3GDI9Lw5yC0khU5plkZ551Oy1c9U11+VnDOkROo6UEVzRnMmdx2pbWnW6wkIQHl46/XZ3t7v
                        mxndYkG3XpPblpwSNuwcxyOlhKmS2pa2aSjn8y1d5ULanjx6z+Yhn/1i0imZAKGgun5nZ59YP39k
                        1q0JKM73u85NITedIlTIweFXinL+yy8FA2DP37Xx9yTnCzj4hKCrn8DV9z9UU1o8NtIKzeednCtq
                        KA9+jjj77rbL/g/Huj+cGv0pZQAAAABJRU5ErkJggg==
                        "
                        preserveAspectRatio="none"
                        height="292.64389"
                        width="162.58002"
                        transform="scale(-1,1)"/>
                    <path
                        seg="28-1"
                        onClick={this.changeColor}
                        style={style_1}
                        id="28-1"
                        d="m 132.69878,4.8744063 c -1.05768,1.9390844 -1.25668,4.3270651 -0.53454,6.4144687 0.68143,1.969712 2.09636,3.581849 3.20723,5.34539 1.23983,1.968274 2.1133,4.156515 2.6727,6.414469 0.84165,3.397217 0.97642,6.924817 1.06908,10.423513 0.0873,3.295847 0.14073,6.594973 0,9.888971 -0.16806,3.933465 -0.61253,7.849365 -1.06908,11.759858 -1.14224,9.783655 -2.36793,19.590012 -4.81085,29.132379 -1.28743,5.028884 -2.91426,9.98126 -5.07812,14.699824 -1.06361,2.319321 -2.25634,4.581251 -3.20724,6.949011 -1.11791,2.7836 -1.90861,5.7268 -3.4745,8.28535 -1.15805,1.89216 -2.70444,3.51269 -4.27631,5.07812 -1.56311,1.5567 -3.16433,3.07539 -4.81085,4.54359 -2.47193,2.20422 -5.1294,4.34093 -8.28536,5.34539 -2.24964,0.716 -4.645217,0.82051 -6.949015,1.33634 -0.14323,0.0321 -0.28754,0.0659 -0.434314,0.0668 -0.04757,2.9e-4 -0.09546,-0.003 -0.142493,0.004 -0.02352,0.004 -0.04675,0.01 -0.06826,0.0199 -0.02151,0.0101 -0.04129,0.0244 -0.05651,0.0426 -0.02592,0.0311 -0.03724,0.0722 -0.03987,0.11266 -0.0026,0.0404 0.0027,0.0809 0.0065,0.1212 0.02176,0.23353 -0.0093,0.46828 -0.03341,0.70158 -0.125718,1.21676 -0.06252,2.44411 -0.0057,3.66603 0.570846,12.27537 0.485019,24.57266 0.944941,36.85268 0.02536,0.67713 0.05235,1.35604 0,2.03162 -0.005,0.0644 -0.01071,0.12912 -0.0063,0.19359 0.0045,0.0645 0.0196,0.12937 0.05351,0.18438 0.03386,0.0549 0.08546,0.0979 0.143651,0.12579 0.05819,0.0279 0.122785,0.0411 0.187273,0.0432 0.128976,0.004 0.255162,-0.0343 0.377781,-0.0745 0.557579,-0.1829 1.114267,-0.41048 1.700893,-0.42522 0.395139,-0.01 0.786269,0.0778 1.181179,0.0945 0.33103,0.014 0.66182,-0.022 0.99219,-0.0472 1.82586,-0.13945 3.65908,0.0489 5.48065,0.23624 2.33216,0.23982 4.6646,0.47824 6.99256,0.75595 3.51296,0.41907 7.01667,0.92778 10.48884,1.6064 4.78538,0.93528 9.50318,2.19181 14.17411,3.59077 2.29061,0.68604 4.5727,1.40718 6.80357,2.26786 2.4015,0.92651 4.74189,2.01402 7.18155,2.83482 2.00205,0.67357 4.06359,1.16494 6.04762,1.88988 0.56827,0.20764 1.1339,0.43645 1.64026,0.76758 0.1235,0.0808 0.24343,0.16758 0.37343,0.23738 0.13,0.0698 0.27211,0.12263 0.41953,0.12897 0.0472,0.002 0.0945,-7.2e-4 0.14174,0 0.0322,4.9e-4 0.0643,0.003 0.0964,5e-4 0.0321,-0.002 0.0644,-0.009 0.0926,-0.0241 0.045,-0.0249 0.075,-0.0705 0.0945,-0.11812 0.0365,-0.0891 0.0414,-0.1874 0.0472,-0.28348 0.0325,-0.53739 0.10624,-1.07129 0.16536,-1.6064 0.45557,-4.12382 0.0394,-8.28644 -0.0944,-12.43319 -0.1638,-5.07732 0.0969,-10.15726 0.26727,-15.23436 0.27212,-8.10741 0.31425,-16.22422 0.80181,-24.32153 0.27393,-4.54942 0.68827,-9.08902 1.06908,-13.63074 1.26035,-15.0313 2.15403,-30.093429 2.67269,-45.168554 0.28499,-8.28331 0.45661,-16.580443 0,-24.856067 -0.31615,-5.729876 -0.93355,-11.443726 -1.87088,-17.105249 -0.86949,-5.251804 -2.0419,-10.535529 -4.54358,-15.234363 -2.12378,-3.989032 -5.1539,-7.445006 -8.55263,-10.4235116 -2.03281,-1.7814751 -4.22508,-3.4162815 -6.68174,-4.5435821 -0.94681,-0.4344672 -1.93403,-0.7929613 -2.95856,-0.9815113 -1.18079,-0.2173078 -2.39027,-0.2058309 -3.59077,-0.1889881 -0.88523,0.012419 -1.77532,0.027834 -2.64584,0.1889881 -0.81313,0.1505284 -1.6163,0.4357195 -2.26786,0.9449406 -0.46601,0.3642043 -0.84547,0.8384004 -1.09864,1.3729184 z"
                    />

                    <path
                        seg="28-2"
                        onClick={this.changeColor}
                        style={style_2}
                        id="28-2"
                        d="m 106.53589,3.3361231 c 0.79043,0.5326059 1.56273,1.0921276 2.3151,1.6772693 0.63621,0.4948016 1.26928,1.0202288 1.70089,1.700893 0.39995,0.6307355 0.6076,1.3680414 0.70035,2.1091141 0.0927,0.7410727 0.0754,1.4910205 0.0556,2.2376115 -0.0618,2.330896 -0.14635,4.661234 -0.18899,6.99256 -0.106,5.795486 0.0468,11.592194 0.18899,17.386906 0.14678,5.983577 0.28219,11.969217 0.18898,17.953868 -0.12889,8.275629 -0.68752,16.643396 0.94494,24.75744 0.69328,3.445899 1.77425,6.800186 2.64584,10.205358 0.88111,3.442377 1.55844,6.968226 3.02381,10.205354 0.61604,1.360876 1.36537,2.656353 2.07887,3.968753 0.40146,0.73845 0.79323,1.48508 1.27567,2.17336 0.46232,0.65958 1.00928,1.26484 1.65364,1.74814 0.15381,0.11536 0.31284,0.22357 0.47247,0.33073 0.11253,0.0755 0.22559,0.15072 0.33073,0.23624 0.0252,0.0205 0.0499,0.0416 0.073,0.0644 0.0252,0.025 0.0484,0.0519 0.071,0.0793 0.0356,0.0432 0.0705,0.0887 0.0877,0.14199 0.0168,0.0523 0.0154,0.10914 0.004,0.16287 -0.009,0.0414 -0.0233,0.0813 -0.0376,0.1211 -0.17204,0.47893 -0.32082,0.96597 -0.49278,1.44493 -0.13759,0.38323 -0.28989,0.76097 -0.43849,1.14007 -0.23048,0.58799 -0.45222,1.17971 -0.70576,1.75813 -0.1756,0.40062 -0.36634,0.79455 -0.56928,1.18203 -0.16073,0.30689 -0.32915,0.6098 -0.5079,0.90655 -0.13865,0.23018 -0.28348,0.45663 -0.43408,0.67918 -1.05285,1.5559 -2.37657,2.90685 -3.70885,4.23137 -2.1248,2.11241 -4.29463,4.18477 -6.61492,6.08038 -1.30556,1.0666 -2.66394,2.08032 -4.14859,2.87903 -0.93605,0.50358 -1.92042,0.92008 -2.94113,1.21661 -0.91198,0.26494 -1.8491,0.43329 -2.78757,0.57877 -1.055524,0.16363 -2.115766,0.29902 -3.165558,0.4961 -0.122187,0.0229 -0.244216,0.0467 -0.366162,0.0709 -0.226174,0.0449 -0.454666,0.0914 -0.685083,0.0827 -0.158689,-0.006 -0.315064,-0.0381 -0.47247,-0.0591 -0.873176,-0.11653 -1.753345,0.10937 -2.634022,0.12993 -1.160612,0.0271 -2.297821,-0.30227 -3.401785,-0.66146 -3.265231,-1.06239 -6.497354,-2.45214 -9.071426,-4.7247 -1.487775,-1.31351 -2.717457,-2.88808 -4.06324,-4.34673 -1.398471,-1.51575 -2.971478,-2.97882 -3.68527,-4.91369 -0.178231,-0.48313 -0.299047,-1.00884 -0.18899,-1.5119 0.104556,-0.47791 0.407711,-0.88904 0.747881,-1.24063 0.34017,-0.35159 0.724469,-0.65984 1.047509,-1.02723 0.637234,-0.72472 1.008993,-1.65248 1.199876,-2.59845 0.190884,-0.94596 0.211256,-1.91719 0.217534,-2.8822 0.03465,-5.32582 -0.339814,-10.645214 -0.47247,-15.969496 -0.149069,-5.983008 0.0073,-11.969008 0,-17.953868 -0.007,-5.801221 -0.166972,-11.62103 0.47247,-17.386906 0.501241,-4.519717 1.492234,-8.978945 2.83482,-13.323659 1.505035,-4.870411 3.448599,-9.59348 5.48066,-14.268601 2.164807,-4.980528 4.433537,-9.916241 6.52008,-14.93006 1.176577,-2.8272334 2.365151,-5.7820995 4.630183,-7.8429758 1.461338,-1.3296225 3.331005,-2.21356 5.291673,-2.4568452 1.36024,-0.1687825 2.75541,-0.032297 4.06324,0.3779762 0.50281,0.1577334 0.99308,0.3554217 1.46466,0.5905879 z"
                    />
                    <path
                        seg="28-3"
                        onClick={this.changeColor}
                        style={style_3}
                        id="28-3"
                        d="m 58.282534,1.5168526 c 0.586677,0.2932855 1.056218,0.7709991 1.52604,1.2286826 0.846528,0.8246579 1.734756,1.6157905 2.45685,2.5513392 1.017752,1.3186052 1.677319,2.8985645 1.98437,4.5357142 0.587606,3.1330284 -0.09537,6.3524684 -0.85044,9.4494044 -1.065421,4.36982 -2.28592,8.739179 -2.55134,13.229168 -0.199179,3.369427 0.143979,6.743672 0.37797,10.110861 0.349587,5.030639 0.455829,10.076879 0.37798,15.119049 -0.102148,6.616019 -0.519669,13.260936 0.26839,19.830647 0.476911,3.975805 1.391683,7.885998 2.40542,11.759859 1.064902,4.069381 2.242493,8.116332 2.99583,12.254733 0.348466,1.91427 0.606336,3.84883 1.104593,5.72968 0.498256,1.88085 1.252767,3.72679 2.486187,5.23163 0.516195,0.62979 1.109931,1.19244 1.63002,1.81901 0.07282,0.0877 0.145117,0.17825 0.18899,0.28348 0.04,0.096 0.05477,0.20043 0.06361,0.30402 0.0088,0.10358 0.01219,0.20792 0.03089,0.31019 0.0574,0.3139 0.25274,0.58165 0.39913,0.8652 0.08172,0.15828 0.148926,0.3236 0.22551,0.48443 0.243636,0.51165 0.579679,0.97311 0.92292,1.42404 1.339998,1.7604 2.819356,3.41015 4.33469,5.02209 0.989215,1.05228 1.9991,2.09351 3.14193,2.97656 2.174458,1.68018 4.759777,2.73537 7.34691,3.66165 0.982134,0.35164 1.977873,0.68963 3.011999,0.82682 0.790665,0.10489 1.594976,0.0906 2.385973,-0.0118 0.118176,-0.0153 0.236097,-0.0325 0.354353,-0.0472 0.199967,-0.0248 0.400966,-0.0422 0.602401,-0.0472 0.133832,-0.003 0.26773,-0.001 0.401598,0 0.05571,5e-4 0.111436,8.4e-4 0.167108,0.003 0.04072,0.002 0.08172,0.004 0.121108,0.0146 0.02369,0.006 0.04673,0.0153 0.07099,0.0188 0.01327,0.002 0.02674,0.002 0.04004,0.004 0.0133,0.002 0.02672,0.005 0.03779,0.0126 0.0049,0.003 0.0094,0.008 0.01257,0.0126 0.0032,0.005 0.0052,0.0109 0.0052,0.0169 -3.2e-5,0.007 -0.0029,0.0142 -0.0069,0.0202 -0.004,0.006 -0.009,0.0113 -0.01375,0.0167 -0.01168,0.0132 -0.02215,0.0275 -0.03101,0.0428 -0.03455,0.0595 -0.04333,0.13054 -0.04282,0.19933 2.68e-4,0.0365 0.0029,0.0729 0.0059,0.10925 0.0044,0.0536 0.0094,0.10719 0.0089,0.16094 -3.65e-4,0.04 -0.0038,0.0798 -0.0074,0.11959 -0.01616,0.17739 -0.03658,0.35438 -0.05228,0.53182 -0.02605,0.29441 -0.03909,0.58985 -0.04594,0.88533 -0.0096,0.41334 -0.0071,0.82687 -0.0021,1.2403 0.0243,2.02065 0.107369,4.04008 0.186237,6.05934 0.07405,1.8959 0.144406,3.79197 0.198438,5.68854 0.08164,2.86581 0.126013,5.73253 0.181901,8.59896 0.09296,4.76804 0.217809,9.53551 0.28112,14.30403 0.01618,1.21864 0.02836,2.43787 0.09922,3.65456 0.02534,0.43516 0.05821,0.87057 0.04961,1.30638 -0.0042,0.21097 -0.01821,0.42289 -0.06615,0.62838 -0.01723,0.0739 -0.03883,0.14687 -0.04953,0.22195 -0.0107,0.0751 -0.01001,0.15347 0.01646,0.22454 0.01113,0.0299 0.02668,0.0581 0.03598,0.0886 0.0046,0.0153 0.0077,0.0311 0.0077,0.0471 -3.2e-5,0.0159 -0.0032,0.032 -0.01058,0.0462 -0.0091,0.0176 -0.02433,0.0316 -0.04188,0.0407 -0.01755,0.009 -0.03733,0.0135 -0.05709,0.0144 -0.03953,0.002 -0.07821,-0.0103 -0.116001,-0.022 -3.7074,-1.15053 -7.698274,-0.75952 -11.549422,-0.2725 -4.50684,0.56994 -8.998981,1.25614 -13.47039,2.05797 -3.801737,0.68174 -7.607961,1.45254 -11.22531,2.80633 -2.746327,1.02781 -5.35723,2.38184 -8.04482,3.55469 -2.823677,1.23224 -5.729858,2.26355 -8.60608,3.36759 -1.621867,0.62256 -3.234839,1.26849 -4.8643,1.87089 -1.337257,0.49437 -2.699239,0.96257 -4.11595,1.12253 -0.869063,0.0981 -1.748202,0.0787 -2.61924,0 -0.48907,-0.0442 -0.981198,-0.10808 -1.443093,-0.2748 -0.461894,-0.16672 -0.895772,-0.44458 -1.176147,-0.84773 -0.293699,-0.42231 -0.399071,-0.95215 -0.394554,-1.46653 0.0045,-0.51438 0.111082,-1.0216 0.207464,-1.52689 1.642005,-8.60831 0.414767,-17.46448 -0.37418,-26.19241 -1.27001,-14.04982 -1.38933,-28.17535 -1.49671,-42.28204 -0.160736,-21.116044 -0.291199,-42.320844 2.61924,-63.23597 0.998421,-7.174896 2.353648,-14.301709 4.11595,-21.328107 1.836496,-7.322212 4.127775,-14.565979 7.48356,-21.328096 1.093569,-2.2036108 2.308221,-4.3666326 3.88941,-6.251211 0.829057,-0.9881322 1.772017,-1.9070933 2.91042,-2.5135416 1.095645,-0.58367 2.334708,-0.8565805 3.57188,-0.9591146 1.23165,-0.10207649 2.470541,-0.0415297 3.70416,0.033073 0.77663,0.046966 1.576646,0.1056661 2.27258,0.4535698 z"
                    />
                    <path
                        seg="28-4"
                        onClick={this.changeColor}
                        style={style_4}
                        id="28-4"
                        d="m 97.429219,174.90125 c 0.195534,0.0365 0.401725,0.0138 0.584649,-0.0643 0.09461,-0.0404 0.182458,-0.0949 0.274789,-0.14031 0.163421,-0.0803 0.339403,-0.13126 0.514493,-0.18125 0.172753,-0.0493 0.345714,-0.0981 0.52034,-0.14031 0.09071,-0.0219 0.182058,-0.0421 0.274788,-0.0526 0.126075,-0.0143 0.253578,-0.0105 0.380024,0 0.205278,0.017 0.408758,0.0515 0.613888,0.0702 0.42369,0.0386 0.85036,0.009 1.27454,-0.0234 0.21624,-0.0167 0.43243,-0.0344 0.64897,-0.0468 0.99933,-0.0571 2.00171,-6.6e-4 2.99926,0.0819 1.0208,0.0845 2.03911,0.19632 3.05773,0.30402 1.59234,0.16836 3.18577,0.32667 4.77661,0.50865 4.3014,0.49205 8.5842,1.1574 12.82142,2.04628 1.99698,0.41893 3.98331,0.88737 5.96345,1.37978 3.82698,0.95167 7.63682,1.99468 11.34225,3.34421 2.71639,0.98932 5.37056,2.14114 8.0682,3.1805 0.7801,0.30056 1.56427,0.59187 2.362,0.8419 0.98196,0.30778 1.98252,0.55241 2.97003,0.8419 0.89031,0.261 1.77127,0.55898 2.61924,0.93544 0.45636,0.2026 0.90368,0.42831 1.3221,0.70078 0.11179,0.0728 0.22193,0.14916 0.34207,0.20714 0.12015,0.058 0.2523,0.0973 0.38553,0.0905 0.0613,-0.003 0.12176,-0.0159 0.18291,-0.0215 0.0611,-0.006 0.12483,-0.004 0.1809,0.0215 0.0379,0.0169 0.071,0.044 0.0973,0.0762 0.0263,0.0322 0.0459,0.0695 0.06,0.10862 0.0284,0.0781 0.0351,0.16221 0.0411,0.24513 0.0594,0.8254 0.064,1.65368 0.0992,2.48047 0.0983,2.31195 0.43501,4.60637 0.77337,6.89553 0.76307,5.16251 1.54238,10.34755 3.09617,15.32947 1.28799,4.12969 3.09569,8.07852 4.49791,12.17084 2.06091,6.01468 3.23044,12.29048 4.49792,18.52083 0.88742,4.36216 1.83106,8.80674 1.32292,13.22916 -0.72824,6.3379 -4.33983,11.92951 -7.9375,17.19792 -3.09495,4.53224 -6.25879,9.02758 -9.78959,13.22917 -1.73183,2.06085 -3.57573,4.07104 -5.82083,5.55625 -2.57343,1.70242 -5.64571,2.66089 -8.73125,2.64583 -4.13149,-0.0202 -8.03842,-1.72261 -11.90625,-3.175 -3.15751,-1.18566 -6.46098,-2.27301 -8.99583,-4.49791 -1.37115,-1.20349 -2.45944,-2.6946 -3.43959,-4.23334 -0.85481,-1.34196 -1.63987,-2.73488 -2.63349,-3.97757 -0.99362,-1.24269 -2.2258,-2.3454 -3.71651,-2.90159 -1.00526,-0.37507 -2.09414,-0.48852 -3.16633,-0.44805 -1.07219,0.0405 -2.13291,0.23095 -3.18367,0.44805 -2.38748,0.49328 -4.78044,1.14079 -6.87916,2.38125 -3.072468,1.816 -5.285587,4.75519 -7.93751,7.14375 -3.521647,3.17191 -7.851716,5.37898 -12.400763,6.70909 -4.549048,1.3301 -9.318292,1.80468 -14.057573,1.75757 -8.488908,-0.0844 -17.110927,-1.90195 -24.34166,-6.35 -5.285297,-3.2513 -9.653783,-7.78159 -13.75833,-12.43541 -4.282525,-4.85561 -8.423873,-10.03601 -10.58334,-16.13959 -1.640067,-4.63553 -2.064959,-9.65067 -1.61774,-14.5474 0.447219,-4.89673 1.747634,-9.68653 3.46983,-14.29218 1.457356,-3.89739 3.219374,-7.68201 4.49791,-11.64167 2.074891,-6.42598 2.838457,-13.18636 3.96875,-19.84375 0.58318,-3.43492 1.266884,-6.85621 1.65365,-10.31875 0.01807,-0.16181 0.0355,-0.32369 0.0533,-0.48553 0.02782,-0.25294 0.05659,-0.50595 0.0702,-0.76005 0.0037,-0.0689 0.0063,-0.13826 0.02185,-0.20546 0.01552,-0.0672 0.04503,-0.13296 0.09508,-0.18041 0.0583,-0.0553 0.142606,-0.0813 0.22217,-0.0702 0.0507,0.007 0.09896,0.0283 0.14032,0.0585 0.0826,0.0602 0.135742,0.15241 0.21047,0.22217 0.112865,0.10536 0.266146,0.15254 0.40926,0.21048 0.233065,0.0944 0.451348,0.22452 0.68989,0.30402 0.274199,0.0914 0.56587,0.11287 0.85359,0.14031 0.611751,0.0583 1.221519,0.14666 1.83581,0.16371 0.86126,0.0239 1.722557,-0.093 2.56077,-0.29233 1.053532,-0.25056 2.071293,-0.62996 3.08697,-1.0056 2.995672,-1.10794 6.001274,-2.19188 8.95687,-3.40268 3.750517,-1.53645 7.416125,-3.27537 11.17854,-4.78245 1.231881,-0.49344 2.474651,-0.96218 3.74178,-1.35639 2.256294,-0.70194 4.579028,-1.1644 6.89889,-1.61365 5.370904,-1.04011 10.761758,-2.01751 16.20656,-2.54908 1.007242,-0.0983 2.016094,-0.18138 3.02658,-0.23728 0.870032,-0.0481 1.741455,-0.0761 2.61276,-0.0662 1.235356,0.0141 2.478888,0.10599 3.671093,0.42995 0.426407,0.11587 0.852158,0.26224 1.29398,0.26871 0.139198,0.002 0.278458,-0.01 0.417544,-0.004 0.02886,0.001 0.05768,0.003 0.08643,0.006 z"
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

export default connect ( mapStateToProps, mapDispatchToProps ) ( T28 );