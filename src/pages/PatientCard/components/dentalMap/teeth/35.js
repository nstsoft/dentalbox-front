import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import * as R from 'ramda';

import implant from '../../images/teeth-icons/implant.png';
import crown from '../../images/teeth-icons/crown.png';
import removed from '../../images/teeth-icons/removed.png'

class T35 extends Component {

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

            '35': {

                [code]:  { color: newColor },
                removed: false,
                implant: false,

            },

        };

        this.props.setTeethChart ( teeth, '35' );

    };

    render () {

        if( R.path(['tooth', '35','implant'], this.props) ){return <img  src={implant} />}
        if( R.path(['tooth', '35','crown'], this.props)){return <img   src={crown} />}
        if( R.path(['tooth', '35','removed'], this.props)){return <img   src={removed} />}

        let style_1 = {

            'fill':           R.path ( [ 'tooth', '35', '35-1', 'color' ], this.props ) || 'none',
            'stroke':         '#000000',
            'strokeWidth':    '0.26458332px',
            'strokeLinecap':  'butt',
            'strokeLinejoin': 'miter',
            'strokeOpacity':  '0',

        };

        let style_2 = {

            'fill':           R.path ( [ 'tooth', '35', '35-2', 'color' ], this.props ) || 'none',
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
                        y="-308.80344"
                        x="-151.09244"
                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAABPCAYAAAAay760AAAACXBIWXMAAAsTAAALEwEAmpwYAAAG
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
                        MjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA5LTA3VDE0OjA3OjQ3KzAzOjAw
                        IiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTA5LTA3VDE0OjA3OjQ3KzAzOjAwIiB4bXA6TW9kaWZ5
                        RGF0ZT0iMjAxOC0wOS0wN1QxNDowNzo0NyswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlp
                        ZDphOWZjZTFiOC1kMTBjLTgzNGYtYTNiMS05OTRhNjU1ZGFiYzciIHhtcE1NOkRvY3VtZW50SUQ9
                        ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1ZWFlYjEzMi1iMTY2LTUyNDQtYWViOS00Y2RmYTJiZDJh
                        Y2UiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3MDcwNWU4Yy05MWM5LTE2NGQt
                        YjJiZS1kNzNjOGQ4ZDY1NDAiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1h
                        Z2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0i
                        Y3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MDcwNWU4Yy05MWM5LTE2NGQtYjJi
                        ZS1kNzNjOGQ4ZDY1NDAiIHN0RXZ0OndoZW49IjIwMTgtMDktMDdUMTQ6MDc6NDcrMDM6MDAiIHN0
                        RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIvPiA8
                        cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YTlm
                        Y2UxYjgtZDEwYy04MzRmLWEzYjEtOTk0YTY1NWRhYmM3IiBzdEV2dDp3aGVuPSIyMDE4LTA5LTA3
                        VDE0OjA3OjQ3KzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0Mg
                        MjAxOCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhp
                        c3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPkY4
                        QTlBRUM5QUQzNDEwRkRENEMwQzM4QTUzMTc1NTU0PC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90
                        b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwv
                        eDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+8LNg/wAABqlJREFUaN61mc1uJFkRhb+Ie29m
                        uW3MoG5GQ9NICOYFkBALNuzgRXgQeAPWrOAFYDVskBCLERJCggUIIc1imAYxnm66javdrvy7ESzy
                        x+myXV12Z5eUUv3krVNx48S5J6Jw9wt3f+buv3f3X7o7W9f3bnjvLtd3x+fi7rzDxwfAyfhCge+/
                        Q7CT+QsF/gD8YEEAH65rj6W30QG57cN43299+tGPvW1b/OCbfPijn44AsmuN3hesbVuOj4+5uLjg
                        9B+/2Wt77gX2949+4uHwkFCuOC7WdP/5mHcGVlUVZVlSFAUHBwes1+t3A3bx55/5g/SKXB5SFQlV
                        oc37gd2ZIKenp6xWK1JKhKBISoQQ3k1k1foph6Ejp0QtCY+Klol//ukXvnhkOWdUlRACqjpdVVUt
                        u41f/PVXTopIkUAKRAOIIhroNmfLbuN6vaYoiikqABEhhEDbtsuCdesTKCIWFVHF3MmieIjQvl4W
                        rGmaKUdzBqoqZrYg2L9/685LJK7IRLRYkaUHdHfQzXJg7ab/shACIoKIXIlGRJYD6zZfkMRwFSwp
                        SgATwBBxxNJyYJvNZsrVyEZ3nyJaNrL6GaUCkmgpCVridpkzk2Y5sJzzlC9VRUSYn/L7nPh7K0iu
                        zwmAi6Ax4WQQQyQAiviCOWuaZqqtGOOUo9ETLqr62RpCBNNA0BUqEVwR8/6iWA5sXlMhBMxsisjd
                        9zrT7hBZS4iC+QGiEadFtM+beYeXR8tq4xjJyMaJ9mbEGJdjY0BQBxfDUDSUOAWYgzmhfHDb0u8A
                        BfDiXiY150wqV1fYuCOyv9x9G11xEwIbsm1wEQxQM9QMiWn5nI1qP9dFdyelJcHEesXA8dxhXYXS
                        4Z4x60AWjmzUw5wzOecrHeaiCjICiTgBR70lSkYkYAZBV8uBzXM0djGjqszd1iJ1ZigugSxKzi2a
                        A0F9krKcm2VzNqqHu9M0zeRFtv3IYmBiEMSxXIE3k0ntq26hbRz1UER6JuJXTuuu65YDE/Wh1lq6
                        zjFhAFdA8O5iWerPndTc66sqOeclFSSgIYHHgYEdYGQBU6FtFvT6cye8HXGMkaZplsnZJx//3DUo
                        HhSTscDDFDESoH65TGTz7uUm9xtCWC5n7fkJEhQX8C6jziTGXVJIgRQ28Omv/a23sW3bSTlSSn0h
                        F6nvr7NN2nl+dsbR24A1T3/nunpMePwt4vtPOFg9JMbYj97cyV2FnD2n9r/xsmYn2Junci/+6FbX
                        6PuPID4ADmFcIwJ0kDdw/oxuvSZ+44f3n8oZj9EHRvZEsIDZYOOkw80ARf0QwteQw4dvR5BRzefq
                        Mc18t+ruTbv0RjCXCoKDKOYgdP3lIA7ugmsAdUyd9uzE7w2mqjCcxHOV334+3rOr3naCbZ5/4jkq
                        RMWIGBFxRXyouWl+KpAiHiPk1/cDm5zuzNtfsvDKjTAojIjAq2d+JzA//dQLVTwWEBLihlrG1DDJ
                        s9oxsAyssHRIGRRrzu4WWdu2xEEttlV+zrybcnfbqX0rmGkH0TAtQUo6b/t5h4P6tsVLmEMICYJj
                        wfcHq86e+8jCeUfp7pfqcUPfJsi0pjr73PcCy805FBGCABGb3eYDQSYbR197bsPviBFiwtp6/20M
                        IUys255RXfH4s5yKCAxToJvU5DrY/576CsNCAaFAEMT7zhMV3GVaNpEFcAzHQAuMRCkZzj7znWC5
                        bS+9u8i4cdcmOttaeMna3pOEEMhbrLwG1loNwYAAXgIZ8e6GcZ8COkWqdIi3fY41IcHIVu8Gm2sh
                        IhP7thV+1xRuzN32PdfBJIPk3h/edGSoYDhYRtwQNZA89NhxaL+H/KrQrl/4bjYOs425Dt7UYc7z
                        OO/fzGyKbL7mGpjlCDkSqIEKCBgzg2oZxXGhj9AFQXEP09keaemHdkLx5UdyK1iMEeu62S+SKyqy
                        PTm9bH8FQTC3/kzL+VrPdj1nD78ttSk0FdQVnjeIdJfsGyO6QpLYWz0ctVcEr2g7J8b33qwgKaXe
                        u4+5c0cGNzzP0ZSr4bOcM7hP/bZ+5QN5I1h874nQRqidYBXkCzBBZrkz6Yffpv38Q/JrYr6ACvxC
                        KB99KHtrY3l0RF3XdG2Lm13Z/5sYiDu5benq+tY51k6Tunm19rR5RiwDHA5foMUkwO7e12U2qDO5
                        6tj4iqOvPpH7OeLTz7xpLvCj1NtuSQMZhlljrokIfl4BkXDD9u0PNjzq//7LxRqKpFNUIkLXOV0L
                        fvglDo4f7fwn4W7/wJ9/7t5s+ojc+54tlnD8ddln+f8BTQMJHIk5I3oAAAAASUVORK5CYII=
                        "
                        preserveAspectRatio="none"
                        height="304.66241"
                        width="104.12501"
                        transform="scale(-1)"/>
                    <path
                        seg="35-1"
                        style={style_1}
                        onClick={this.changeColor}
                        id="35-1"
                        d="m 98.106849,285.73447 c 0.962512,-1.60356 1.684306,-3.33718 2.432151,-5.0514 2.37613,-5.44659 5.0547,-10.77871 6.91048,-16.42384 1.21071,-3.6829 2.06237,-7.47355 2.83293,-11.273 1.13726,-5.60755 2.10321,-11.25826 2.58164,-16.95993 0.3396,-4.0472 0.43282,-8.11055 0.52916,-12.17083 0.48544,-20.45838 1.05418,-40.92593 0.52917,-61.38334 -0.18131,-7.06483 -0.49067,-14.17348 0.52917,-21.16666 0.64907,-4.45075 1.83034,-8.80588 2.64583,-13.22917 0.50498,-2.73909 0.87888,-5.53697 1.9634,-8.1024 0.21695,-0.51319 0.46317,-1.01972 0.58058,-1.56437 0.0587,-0.27233 0.0844,-0.5533 0.0557,-0.83041 -0.0286,-0.27711 -0.11279,-0.55055 -0.26213,-0.78572 -0.15675,-0.24684 -0.38397,-0.44764 -0.6462,-0.57701 -0.26222,-0.12938 -0.55855,-0.18747 -0.85051,-0.17135 -0.42317,0.0234 -0.82456,0.19834 -1.18784,0.41662 -0.36327,0.21829 -0.69775,0.48142 -1.05722,0.70592 -1.12614,0.70331 -2.45023,1.0018 -3.74177,1.30962 -2.41694,0.57605 -4.82666,1.22566 -7.29647,1.4967 -2.79261,0.30647 -5.612332,0.1237 -8.418986,0 -4.503298,-0.19848 -9.144732,-0.27153 -13.283296,-2.05797 -2.38874,-1.03112 -4.503334,-2.59166 -6.73519,-3.92886 -0.193756,-0.11609 -0.389255,-0.23093 -0.597698,-0.31793 -0.208443,-0.087 -0.431432,-0.14583 -0.657302,-0.14492 -0.199797,8e-4 -0.396331,0.048 -0.59531,0.0661 -0.09211,0.008 -0.18498,0.0105 -0.276084,0.0265 -0.0911,0.0159 -0.181877,0.0468 -0.253086,0.10584 -0.04986,0.0413 -0.08854,0.0953 -0.115289,0.1543 -0.02675,0.059 -0.04179,0.12287 -0.04819,0.18731 -0.0128,0.12888 0.0085,0.25848 0.03119,0.38599 0.09781,0.5499 0.222693,1.0967 0.26458,1.65365 0.04968,0.66064 -0.01823,1.3236 -0.0661,1.98437 -0.218529,3.01625 -0.01947,6.04568 0.19844,9.06198 0.433303,5.99782 0.941171,11.99035 1.32291,17.99167 1.621518,25.49187 0.963608,51.06562 1.16616,76.60821 0.08704,10.97628 0.333113,21.95107 0.37417,32.92761 0.01843,4.92732 -0.0044,9.85637 0.18709,14.78 0.114717,2.94927 0.308167,5.9091 0.93545,8.79317 0.484772,2.22884 1.235921,4.41891 2.43215,6.36102 0.935903,1.51946 2.169252,2.89805 3.74177,3.74177 1.487832,0.79828 3.191775,1.07802 4.86427,1.30966 1.687733,0.23375 3.460063,0.42181 5.051389,-0.18709 0.860634,-0.32931 1.625599,-0.88058 2.272938,-1.53639 0.647338,-0.65582 1.181686,-1.41529 1.655924,-2.20538 z"
                    />
                    <path
                        seg="35-2"
                        style={style_2}
                        onClick={this.changeColor}
                        id="35-2"
                        d="m 119.80936,116.2362 c 0.0894,-0.25313 0.17761,-0.5067 0.26458,-0.76068 0.61041,-1.7825 1.16097,-3.58653 1.60609,-5.41731 0.64458,-2.65117 1.06631,-5.35057 1.4967,-8.04482 0.44212,-2.767668 0.89601,-5.542127 1.6838,-8.231895 1.2705,-4.337903 3.38972,-8.389144 4.67722,-12.72203 0.89095,-2.998342 1.37715,-6.110788 2.3763,-9.07483 1.16203,-3.447258 2.99721,-6.632769 4.23333,-10.05416 1.52507,-4.221169 2.11183,-8.740953 2.11667,-13.22917 0.007,-6.795364 -1.3523,-13.701452 -4.7625,-19.57917 -2.64744,-4.563053 -6.41869,-8.348049 -10.05417,-12.17083 -2.32663,-2.446499 -4.6374,-4.950307 -7.40833,-6.87917 C 112.7145,7.7578977 108.8405,6.3533083 104.92654,5.3096349 99.581787,3.8844331 93.93062,3.0900571 88.522378,4.2513049 83.269763,5.3791367 78.501212,8.3293365 74.764038,12.188805 c -4.059153,4.191984 -6.91909,9.366038 -10.05416,14.2875 -2.636917,4.139456 -5.515317,8.171763 -7.40833,12.7 -1.119256,2.677349 -1.886822,5.580264 -1.5875,8.46667 0.207963,2.005412 0.919885,3.918406 1.5875,5.82083 2.977522,8.484692 5.18015,17.217635 7.40833,25.92917 1.537308,6.010426 3.088886,12.017754 4.7625,17.99166 1.391041,4.965275 2.867406,9.911495 3.96875,14.948955 0.06215,0.28428 0.123191,0.56934 0.15711,0.85835 0.01488,0.12679 0.0245,0.2553 0.008,0.38189 -0.0016,0.012 -0.0034,0.0241 -0.0028,0.0362 5.32e-4,0.0121 0.0036,0.0244 0.01084,0.0341 0.0048,0.006 0.01126,0.0114 0.0186,0.0145 0.009,0.005 0.0192,0.008 0.02945,0.008 0.01025,0 0.0205,-0.003 0.02945,-0.008 0.0084,-0.005 0.0155,-0.0113 0.0227,-0.0176 0.07149,-0.063 0.158373,-0.10758 0.25009,-0.13335 0.109077,-0.0306 0.223487,-0.035 0.33617,-0.0468 0.15935,-0.0167 0.316883,-0.0487 0.47649,-0.0628 0.167163,-0.0147 0.336514,-0.01 0.50135,0.0219 0.212667,0.0406 0.414964,0.12419 0.60803,0.22217 0.236995,0.12027 0.461996,0.26257 0.68764,0.40299 0.37244,0.23177 0.74769,0.45899 1.12035,0.6904 0.663536,0.41204 1.318768,0.83729 1.98024,1.25263 0.571381,0.35877 1.14788,0.71041 1.74459,1.02526 2.751757,1.45195 5.862438,2.08517 8.954495,2.43086 2.788039,0.3117 5.595744,0.40349 8.400521,0.46302 1.388956,0.0295 2.778866,0.0511 4.167186,0 1.07395,-0.0395 2.14772,-0.12277 3.20807,-0.29765 1.76561,-0.2912 3.47909,-0.83367 5.22553,-1.2237 0.49599,-0.11077 0.99479,-0.20927 1.48828,-0.33073 0.4118,-0.10135 0.8196,-0.21862 1.2237,-0.34727 0.42716,-0.13599 0.85338,-0.28613 1.24023,-0.51263 0.2429,-0.14222 0.46762,-0.313 0.69453,-0.47955 0.47056,-0.34537 0.96864,-0.68121 1.53789,-0.81029 0.3269,-0.0741 0.67518,-0.0758 0.99219,0.0331 0.20771,0.0714 0.3966,0.18758 0.59531,0.28112 0.0964,0.0454 0.19547,0.0855 0.29766,0.11576 0.054,0.016 0.10917,0.0292 0.16536,0.0331 0.0393,0.003 0.0802,5.7e-4 0.11576,-0.0165 0.0223,-0.0107 0.0418,-0.0271 0.0562,-0.0473 0.0144,-0.0201 0.0236,-0.0439 0.0265,-0.0685 z"
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

export default connect ( mapStateToProps, mapDispatchToProps ) ( T35 );
