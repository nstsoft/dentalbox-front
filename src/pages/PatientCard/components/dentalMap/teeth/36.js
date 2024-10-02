
import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import * as R from 'ramda';

import implant from '../../images/teeth-icons/implant.png';
import crown from '../../images/teeth-icons/crown.png';
import removed from '../../images/teeth-icons/removed.png'

class T36 extends Component {

    constructor ( props ) {
        super( props );
        this.colorSet = [ 'none', 'rgb(102, 89, 89)', 'rgb(176, 71, 71)', 'rgb(51, 87, 163)', 'rgb(57, 145, 40)' ];

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

            '36': {

                [code]: { color: newColor },
                removed: false,
                implant: false

            }

        };

        this.props.setTeethChart( teeth, '36' )

    };

    render () {

        if( R.path(['tooth', '36','implant'], this.props) ){return <img src={implant} />}
        if( R.path(['tooth', '36','crown'], this.props)){return <img  src={crown} />}
        if( R.path(['tooth', '36','removed'], this.props)){return <img src={removed} />}

        let style_1 = {
            'fill':   R.path( ['tooth', '36','36-1','color'],this.props  )|| 'none',
            'stroke': '#000000',
            'strokeWidth': '0.26458332px',
            'strokeLinecap': 'butt',
            'strokeLinejoin': 'miter',
            'strokeOpacity': '0'
        };
        let style_2 = {
            'fill':  R.path( ['tooth', '36','36-2','color'],this.props  )|| 'none',
            'stroke': '#000000',
            'strokeWidth': '0.26458332px',
            'strokeLinecap': 'butt',
            'strokeLinejoin': 'miter',
            'strokeOpacity': '0'
        };
        let style_3 = {
            'fill':  R.path( ['tooth', '36','36-3','color'],this.props  )|| 'none',
            'stroke': '#000000',
            'strokeWidth': '0.26458332px',
            'strokeLinecap': 'butt',
            'strokeLinejoin': 'miter',
            'strokeOpacity': '0'
        };
        let style_4 = {
            'fill':  R.path( ['tooth', '36','36-4','color'],this.props  )|| 'none',
            'stroke': '#000000',
            'strokeWidth': '0.26458332px',
            'strokeLinecap': 'butt',
            'strokeLinejoin': 'miter',
            'strokeOpacity': '0'
        };
        return (

            <svg
                viewBox="0 0 210 297"
                version="1.1"
            >
                <g>
                    <image
                        y="-312.16962"
                        x="-208.56572"

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
                        transform="scale(-1)" />
                    <path
                        seg="36-1"
                        onClick={this.changeColor}
                        style={style_1}
                        id="36-1"
                        d="m 111.87235,291.69779 c 0.65562,-0.41728 1.1426,-1.04854 1.59026,-1.6838 0.74974,-1.06394 1.43117,-2.18029 1.96443,-3.3676 1.30092,-2.89649 1.67932,-6.10832 2.05797,-9.26088 0.5166,-4.30103 1.06235,-8.59901 1.49671,-12.90912 1.2734,-12.63591 1.58752,-25.35714 2.99342,-37.979 0.56436,-5.06674 1.30411,-10.11216 2.05798,-15.15419 0.59603,-3.98633 1.20108,-7.97204 1.6838,-11.97367 0.61102,-5.06529 1.07597,-10.32059 3.55468,-14.78001 0.30803,-0.55418 0.64738,-1.09625 0.86154,-1.69302 0.21416,-0.59677 0.29458,-1.26727 0.0739,-1.86166 -0.127,-0.34206 -0.3459,-0.64091 -0.56126,-0.93545 -0.73623,-1.00694 -1.46294,-2.02169 -2.24507,-2.99341 -1.41197,-1.75423 -2.99981,-3.36188 -4.67721,-4.86431 -2.10752,-1.88768 -4.37888,-3.62491 -6.92228,-4.8643 -2.80191,-1.36537 -5.8813,-2.09842 -8.98026,-2.43216 -3.20925,-0.34562 -6.54178,-0.25629 -9.541523,0.93545 -2.728061,1.08381 -5.021688,3.00894 -7.29646,4.8643 -2.432619,1.9841 -4.921123,3.94241 -6.92228,6.36102 -0.827943,1.00066 -1.566236,2.07326 -2.24507,3.1805 -0.730117,1.19089 -1.394867,2.4285 -1.87088,3.74178 -0.369424,1.01921 -0.624986,2.09828 -0.56127,3.1805 0.09668,1.6421 0.908879,3.1409 1.49671,4.67722 0.508866,1.32994 0.856149,2.71712 1.12253,4.11595 0.341618,1.79392 0.551656,3.61004 0.74836,5.42558 1.011424,9.33522 1.677857,18.70379 2.43215,28.0633 0.713465,8.85289 1.511476,17.73612 3.55468,26.3795 2.024675,8.565 5.24709,16.79042 8.23191,25.06988 1.243323,3.4488 2.541195,7.05864 5.238483,9.54152 0.56216,0.51747 1.18178,0.97959 1.87089,1.30962 1.71801,0.82279 3.71101,0.76563 5.61266,0.65481 1.0998,-0.0641 2.25111,-0.15682 3.1805,-0.74835 z"
                       />
                    <path
                        seg="36-2"
                        onClick={this.changeColor}
                        style={style_2}
                        id="36-2"
                        d="m 54.18484,292.3111 4.180157,-2.20357 1.87088,-2.99341 1.12253,-7.10937 1.49671,-20.95394 2.24507,-21.70228 5.23848,-23.19899 2.05798,-8.98026 2.05797,-9.26089 1.87089,-7.76418 1.44993,-2.19829 0.88867,-1.96443 4.44336,-7.29646 5.56589,-5.14494 4.84271,-3.8272 4.53099,-2.38125 6.014343,-0.85415 h 0.28063 l 0.12945,-0.006 0.0413,-0.0331 0.0331,-0.11576 -0.0165,-0.38034 v -0.99218 l 0.1323,-5.82084 0.23151,-11.97239 v -7.54063 l 0.13229,-2.24896 0.13229,-1.71979 -0.26458,-0.79375 -1.19063,-0.26458 -1.5875,-0.13229 -4.894793,-0.52917 -6.87917,-0.79375 -11.24479,-2.11667 -13.75833,-4.89479 -12.43542,-4.89479 -6.21771,-2.64583 -3.43958,-1.45521 -2.38125,-0.13229 -3.175,0.26458 -0.79375,1.19063 -0.79375,1.5875 -0.13229,1.85208 -0.0548,16.80538 -0.37418,50.51393 -0.74836,35.17268 2.24507,31.80507 3.36759,22.82482 3.74178,11.5995 2.40627,2.59633 2.64584,0.66146 h 1.85208 v 0 z"
                        />
                    <path
                        seg="36-3"
                        onClick={this.changeColor}
                        style={style_3}
                        id="36-3"

                        d="m 164.42441,293.91914 c -0.5932,-0.16309 -1.1702,-0.38501 -1.7198,-0.66146 -2.13453,-1.07368 -3.79168,-2.94338 -4.96093,-5.02708 -1.76508,-3.14552 -2.48915,-6.75073 -3.21511,-10.28383 -0.61542,-2.99512 -1.24954,-5.98636 -1.87089,-8.98026 -1.74672,-8.41631 -3.39759,-16.87347 -5.98683,-25.06988 -1.0404,-3.29344 -2.23276,-6.54663 -2.99342,-9.91569 -1.1217,-4.96818 -1.28474,-10.0948 -1.87089,-15.15419 -0.63674,-5.49605 -1.77544,-10.92528 -3.18051,-16.27671 -0.78374,-2.98501 -1.65149,-5.9517 -2.24506,-8.98026 -0.71439,-3.64505 -1.0705,-7.48615 -2.99342,-10.66406 -0.1239,-0.20477 -0.25384,-0.40581 -0.38241,-0.60768 -0.11239,-0.17647 -0.22411,-0.35412 -0.3566,-0.51604 -0.13249,-0.16193 -0.28718,-0.30868 -0.47023,-0.41 -0.23004,-0.12732 -0.49339,-0.17746 -0.75067,-0.23164 -0.25728,-0.0542 -0.51994,-0.11697 -0.73761,-0.26445 -0.1684,-0.1141 -0.3007,-0.27287 -0.42995,-0.42995 -1.3796,-1.67659 -2.68678,-3.41271 -4.10104,-5.06016 -2.99221,-3.48558 -6.53239,-6.61005 -10.7487,-8.43359 -3.19076,-1.38 -6.66423,-1.97293 -10.12031,-2.34818 -0.11491,-0.0125 -0.23027,-0.0247 -0.3458,-0.0213 -0.0507,0.002 -0.10164,0.006 -0.15201,0 -0.0186,-0.002 -0.0377,-0.006 -0.0526,-0.0175 -0.0114,-0.009 -0.0195,-0.0211 -0.0249,-0.0344 -0.005,-0.0133 -0.008,-0.0275 -0.0102,-0.0416 -0.01,-0.0656 -0.008,-0.13242 -0.006,-0.19878 0.0142,-0.51266 0.0117,-1.02561 0.0126,-1.53846 0.003,-1.90216 0.0538,-3.80393 0.11575,-5.70508 0.18506,-5.6761 0.47323,-11.3533 0.35692,-17.03122 -0.0121,-0.5924 -0.0287,-1.18484 -0.0234,-1.77734 0.003,-0.38984 0.0164,-0.77952 0.0234,-1.16931 0.0156,-0.86657 0.002,-1.73675 0.11693,-2.59585 0.0491,-0.36763 0.12167,-0.73708 0.0884,-1.10648 -0.006,-0.0677 -0.0158,-0.13519 -0.0182,-0.20314 -0.002,-0.0619 0.002,-0.12466 0.0193,-0.18405 0.0177,-0.0594 0.0499,-0.11549 0.0976,-0.15505 0.0586,-0.0486 0.13543,-0.0689 0.21047,-0.0819 0.30072,-0.0522 0.60867,-0.0101 0.91206,0.0234 2.81233,0.3103 5.64492,-0.13765 8.46913,-0.30881 2.9068,-0.17616 5.82641,-0.0587 8.73125,-0.26458 6.41565,-0.45476 12.60019,-2.4697 18.78542,-4.23333 5.79897,-1.65349 11.6873,-3.10775 17.19792,-5.55625 3.42463,-1.52164 6.67167,-3.41394 10.05416,-5.02709 0.54663,-0.26069 1.10625,-0.51699 1.70528,-0.60602 0.24784,-0.0368 0.50173,-0.0443 0.74835,0 0.105,0.0189 0.20882,0.0472 0.30549,0.0923 0.0967,0.0451 0.18619,0.10747 0.25578,0.18833 0.10645,0.12369 0.16142,0.28492 0.1831,0.44665 0.0217,0.16174 0.0124,0.32582 0.004,0.48879 -0.11241,2.18039 -0.0567,4.36556 0,6.54811 0.37407,14.40451 0.78796,28.80887 0.93545,43.21748 0.27836,27.19301 -0.39223,54.38603 -1.12253,81.57066 -0.30823,11.47348 -0.62711,22.94733 -0.74836,34.42431 -0.0238,2.25032 -0.0406,4.50961 -0.37417,6.7352 -0.0577,0.38516 -0.12712,0.77579 -0.30487,1.12232 -0.28933,0.56406 -0.8337,0.95108 -1.38906,1.25677 -0.74815,0.41181 -1.55312,0.71744 -2.38125,0.92604 -0.62744,0.15805 -1.2712,0.261 -1.91823,0.26459 -0.44398,0.002 -0.88822,-0.042 -1.32292,-0.1323 z"
                   />
                    <path
                        seg="36-4"
                        onClick={this.changeColor}
                        style={style_4}
                        id="36-4"
                        d="m 105.01438,132.54964 c 0.35291,-0.0304 0.70861,-0.0284 1.06115,0.006 0.0712,0.007 0.14231,0.0152 0.2134,0.0234 0.55029,0.0633 1.10173,0.12069 1.6552,0.14287 0.7966,0.0319 1.59431,-0.009 2.38952,-0.0661 1.75938,-0.12577 3.51332,-0.32828 5.27513,-0.41341 1.46487,-0.0708 2.93229,-0.0603 4.3987,-0.0827 0.92087,-0.0141 1.84155,-0.0412 2.76159,-0.0827 0.82241,-0.0371 1.64454,-0.0858 2.46393,-0.16536 1.786,-0.17349 3.5551,-0.49362 5.3082,-0.87643 2.20636,-0.48178 4.38977,-1.06304 6.56498,-1.67018 2.60644,-0.72751 5.20227,-1.49247 7.80521,-2.23243 2.04579,-0.58158 4.09606,-1.14774 6.13502,-1.75286 1.58949,-0.47172 3.17269,-0.96733 4.72943,-1.53789 3.33279,-1.22151 6.53061,-2.78143 9.69036,-4.3987 1.73154,-0.88627 3.45477,-1.79115 5.22552,-2.59622 0.11934,-0.0543 0.23918,-0.10817 0.36381,-0.14883 0.23943,-0.0781 0.49249,-0.10594 0.74414,-0.11576 0.18203,-0.007 0.3648,-0.005 0.5457,0.0165 0.12555,0.0149 0.25215,0.0399 0.3638,0.0992 0.0265,0.0141 0.052,0.03 0.0791,0.0428 0.0271,0.0128 0.0563,0.0226 0.0863,0.0233 0.0432,9.5e-4 0.0863,-0.018 0.11575,-0.0496 0.0223,-0.024 0.0368,-0.0543 0.0464,-0.0857 0.01,-0.0313 0.0144,-0.0639 0.0197,-0.0962 0.0712,-0.43624 0.21808,-0.856 0.3638,-1.2733 1.2831,-3.6744 2.52997,-7.36436 3.55897,-11.11785 1.907,-6.956141 3.06677,-14.131929 5.56916,-20.896734 1.01728,-2.750041 2.25207,-5.418957 3.175,-8.20208 1.03061,-3.107843 1.66338,-6.330393 2.38125,-9.525 0.74466,-3.313829 1.58452,-6.612951 2.05204,-9.977087 0.46751,-3.364137 0.55522,-6.819794 -0.19996,-10.131243 -1.04809,-4.595872 -3.6792,-8.709519 -6.87917,-12.17084 -4.54036,-4.91119 -10.20649,-8.620794 -15.87499,-12.17084 -6.83081,-4.277974 -13.78145,-8.413734 -21.16667,-11.6416596 -4.7005,-2.0544897 -9.68706,-3.7559341 -14.81667,-3.70417 -5.02605,0.050719 -10.06659,1.8807059 -13.75834,5.2916696 -1.33603,1.234409 -2.48512,2.654163 -3.72355,3.986466 -1.23842,1.332304 -2.59289,2.596701 -4.21395,3.421864 -2.18761,1.11355 -4.70028,1.352841 -7.14375,1.5875 -3.084646,0.296234 -6.222796,0.612923 -9.260413,0 -3.436533,-0.693415 -6.544362,-2.545833 -9.26042,-4.7625 -3.030426,-2.473233 -5.724499,-5.4711176 -9.26041,-7.1437496 -2.627631,-1.2429779 -5.565448,-1.6722191 -8.46667,-1.85208 -4.81233,-0.2983399 -9.713982,0.060915 -14.2875,1.5875 -6.624915,2.2113166 -12.222268,6.7404036 -17.19792,11.6416596 -1.852113,1.82442 -3.649104,3.723061 -5.124692,5.863498 -1.475589,2.140437 -2.626847,4.540654 -3.077388,7.101092 -0.59956,3.407313 0.05954,6.891112 0.52917,10.31875 0.541004,3.948568 0.83031,7.92732 1.05833,11.90625 0.431187,7.524171 0.648728,15.097417 2.11667,22.48959 1.247694,6.283061 3.393437,12.405547 3.96875,18.785407 0.341064,3.782187 0.123619,7.601267 0.52916,11.377087 0.177528,1.65289 0.474306,3.29623 0.51972,4.95801 0.02133,0.78039 -0.01273,1.56519 0.0935,2.33861 0.0225,0.16384 0.05127,0.32682 0.0702,0.49111 0.01168,0.10136 0.01983,0.2042 0.05193,0.30105 0.01605,0.0484 0.03813,0.0951 0.06828,0.13627 0.03015,0.0412 0.06856,0.0767 0.113649,0.10056 0.05276,0.0279 0.113113,0.0391 0.172791,0.0403 0.05968,0.001 0.119095,-0.007 0.178009,-0.0169 0.278438,-0.0453 0.552861,-0.11554 0.81851,-0.21047 0.154718,-0.0553 0.307515,-0.1195 0.44433,-0.21047 0.07415,-0.0493 0.14349,-0.10639 0.2224,-0.14765 0.131672,-0.0688 0.2824,-0.09 0.42995,-0.10748 1.539597,-0.18297 3.096441,-0.0939 4.64675,-0.0744 0.303614,0.004 0.60804,0.005 0.9095,0.0413 0.05647,0.007 0.11422,0.0153 0.16411,0.0426 0.05168,0.0283 0.09086,0.0746 0.13768,0.11032 0.08422,0.0643 0.189593,0.0925 0.28939,0.12815 0.159496,0.057 0.309968,0.13621 0.4616,0.21171 0.566641,0.28215 1.155826,0.51592 1.74227,0.7542 2.203887,0.89546 4.379322,1.85917 6.57149,2.78295 4.319067,1.82005 8.702353,3.48475 13.11478,5.06507 2.529896,0.90609 5.070251,1.78478 7.57369,2.76159 1.773149,0.69186 3.533416,1.43481 5.37435,1.91823 0.910962,0.23921 1.837423,0.41368 2.76159,0.59531 2.836055,0.55738 5.660987,1.1844 8.52316,1.5867 1.154337,0.16225 2.313496,0.28776 3.47283,0.40926 2.335666,0.24479 4.673236,0.47347 7.004143,0.76005 0.65795,0.0809 1.31557,0.16642 1.97612,0.22216 0.29645,0.025 0.59358,0.044 0.88867,0.0819 0.45597,0.0585 0.90838,0.16202 1.36809,0.16371 0.0683,2.5e-4 0.1365,-0.002 0.20462,-0.006 z"
                  />
                </g>
            </svg>

        )
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

export default connect( mapStateToProps, mapDispatchToProps )( T36 );
