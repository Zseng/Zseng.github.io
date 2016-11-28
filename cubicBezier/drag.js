/**
 * Created by Max on 16/10/25.
 */
var getCss = function (elem, key) {
    return elem.currentStyle ? elem.currentStyle[key] : document.defaultView.getComputedStyle(elem, null)[key];
};

var dragObject = function (left, top, type) {
    this.param = {
        left: left,
        top: top,
        currentX: 0,
        currentY: 0,
        flag: false,
        type: type
    };
    var _this = this;
    this.startDrag = function (bar, target, callback) {  //bar触发拖动的元素   target被拖动的元素
        if (getCss(target, 'left') !== 'auto') {
            _this.param.left = getCss(target, 'left');
        }
        if (getCss(target, 'top') !== 'auto') {
            _this.param.top = getCss(target, 'top');
        }
        bar.onmousedown = function (event) {
            e = event || window.event;
            _this.param.flag = true;
            bar.onselectstart = function () {
                return false;
            };
            _this.param.currentX = e.clientX;
            _this.param.currentY = e.clientY;

        };
        document.addEventListener('mouseup', function () {
            _this.param.flag = false;
            if (getCss(target, 'left') !== 'auto') {
                _this.param.left = getCss(target, 'left');
            }
            if (getCss(target, 'top') !== 'auto') {
                _this.param.top = getCss(target, 'top');
            }

        }, false);
        document.addEventListener('mousemove', function () {
            var e = event || window.event;
            if (_this.param.flag) {
                var nowX = e.clientX - _this.param.currentX;
                var nowY = e.clientY - _this.param.currentY;

                //针对对canvas的重绘
                var repaintX_B, repaintY_B, repaintX_R, repaintY_R;
                if (_this.param.type == 'blue') {
                    repaintX_B = parseInt(drag_blue.param.left) + nowX;
                    repaintY_B = parseInt(drag_blue.param.top) + nowY;
                    repaintCanvas([ repaintX_B + 10, repaintY_B + 10], [parseInt(drag_red.param.left) + 10, parseInt(drag_red.param.top) + 10]);
                    repaintList(bar.offsetLeft, bar.offsetTop , false);

                }
                else if (_this.param.type == 'red') {
                    repaintX_R = parseInt(drag_red.param.left) + nowX;
                    repaintY_R = parseInt(drag_red.param.top) + nowY;
                    repaintCanvas([parseInt(drag_blue.param.left) + 10, parseInt(drag_blue.param.top) + 10], [repaintX_R + 10, repaintY_R + 10]);
                    repaintList(bar.offsetLeft, bar.offsetTop , true);
                }


                target.style.left = nowX + parseInt(_this.param.left) + 'px';
                target.style.top = nowY + parseInt(_this.param.top) + 'px';
            }
        }, false);

    };
};