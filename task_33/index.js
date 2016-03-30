/**
*保存方块所在位置参数
*/
var params = {
    left: 250,
    top: 250,
    direction: 0,  //蓝色方块所在方向
    rotate: 0  //储存现在旋转角度
};
var flag = true;  //阻止多次执行指令

/**
 * 开始移动
 * */
function startMove(order) {
    var box = document.getElementById('active');
    switch (order) {
        case 'TUN LEF': {
            params.direction += 3;
            params.rotate -= 90;
            box.style.transform = 'rotate('+params.rotate+'deg)';
            box.style.webkitTransform = 'rotate('+params.rotate+'deg)';
        }
            break;
        case 'TUN RIG': {
            params.direction += 1;
            params.rotate += 90;
            box.style.transform = 'rotate('+params.rotate+'deg)';
            box.style.webkitTransform = 'rotate('+params.rotate+'deg)';
        }
            break;
        case 'TUN BAC': {
            params.direction += 2;
            params.rotate += 180;
            box.style.transform = 'rotate('+params.rotate+'deg)';
            box.style.webkitTransform = 'rotate('+params.rotate+'deg)';
        }
            break;
        case 'GO': {
            if(flag != true) {
                return;
            }
            var direc = params.direction;
            var result = direc % 4;
            console.log(result);
            switch (result) {
                case 0: {
                    if(params.top <= 0) {
                        return;
                    }
                    move(box, { 'top' : params.top - 50});
                    params.top -= 50;
                }
                    break;
                case 1: {
                    if(params.left >= 450) {
                        return;
                    }
                    move(box, { 'left' : params.left + 50});
                    params.left += 50;
                }
                    break;
                case 2: {
                    if(params.top >=450) {
                        return;
                    }
                    move(box, { 'top' : params.top + 50});
                    params.top += 50;
                }
                    break;
                case 3: {
                    if(params.left <=0) {
                        return;
                    }
                    move(box, { 'left' : params.left - 50});
                    params.left -=50;
                }
                    break;

            }
        }
            break;
    }

}

/**
 *处理指令,正则只匹配合适的指令
 */
function dealOrder(value) {
    var match = /^((GO)|(TUN\sLEF)|(TUN\sRIG)|(TUN\sBAC))$/g;
    var result = value.match(match);
    if(result) {
        startMove(result[0]);
    }
}

/**
 * 取得指令
 * */
function getOrder() {
    var btn = document.getElementById('btn');
    var input = document.getElementsByClassName('inputbox')[0];
    btn.addEventListener('click', function() {
        dealOrder(input.value);
    }, false);
}

getOrder();

/**
 * 移动函数
 * obj为所移动的元素
 * attr为移动元素属性的目标属性的json集合 例如 { 'left': '200px', 'top': '300px'}
 * */
function move(obj, attrs) {
    function getCss(obj, attr) {
        return obj.currentStyle? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, null)[attr];
    }
    if(flag) {
        var timer = setInterval(function() {
            var finished = true;  //假设现在完成了
            flag = false;
            for(var attr in attrs) {
                var curStyle = parseFloat(getCss(obj, attr));
                var purStyle = parseFloat(attrs[attr]);
                if(curStyle != purStyle) {
                    finished = false;  //还未完成
                    var val = ((purStyle-curStyle) * 30)/100,   //20为速率
                        val = val>0 ? Math.ceil(val) : Math.floor(val);
                    obj.style[attr] = val ? (curStyle+val+'px') : (purStyle+'px');
                }

                if(finished) {
                    clearInterval(timer);
                    flag = true;
                }
            }
        }, 30);

    }

}
