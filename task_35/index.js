//保存方块所在位置参数
var params = {
    left: 250,
    top: 250,
    direction: 0,  //蓝色方块所在方向
    rotate: 0  //储存现在旋转角度
};
var flag = true;  //阻止多次执行指令
//保存当前输入的指令
var order = [];

/**
 * 处理指令
 * */
var firstTime = true;
function dealOrder() {
    var len = order.value.length;
    if(len == 0) {
        return;
    }
    var timer;
    var doDrder = function() {
        var excstep = /\d+/;
        var excvalue = /(^go)|(^\w+\s\w+)/i;
        var temp = order.value.shift();
        var step, value;
        console.log(temp);
        if(temp.match(excstep)) {
            step = temp.match(excstep)[0];
        }
        else {
            step = null;
        }
        value = temp.match(excvalue)[0].toUpperCase();
        startMove(value, step);
    };

    doDrder();
    if(order.value.length > 1) {
        laterDeal();
    }

    function laterDeal() {
        timer = setTimeout(function() {
            doDrder();
            if(order.value.length > 0) {
                laterDeal();
            }
        }, 500);
    }
}
/**
 * 开始移动
 * */
function startMove(value, step) {
    var box = document.getElementById('active');
    var drection;

    if(flag != true) {
        return;
    }

    switch (value) {
        case 'TUN LEF': {
            drection = 3;
            rotate(drection);
        }
            break;
        case 'TUN RIG': {
            drection = 1;
            rotate(drection);
        }
            break;
        case 'TUN BAC': {
            drection = 2;
            rotate(drection);
        }
            break;
        case 'TRA LEF': {
            if(params.left - step * 50 < 0) {
                return;
            }
            move(box, { 'left' : params.left - 50 * step});
            params.left -= step * 50;
        }
            break;
        case 'TRA RIG': {
            if(params.left + step * 50 > 450) {
                result = false;
            }
            move(box, { 'left' : params.left + step * 50});
            params.left += 50 * step;
        }
            break;
        case 'TRA TOP': {
            if(params.top -step * 50 < 0) {
                result = false;
            }
            move(box, { 'top' : params.top - 50 * step});
            params.top -= 50 * step;
        }
            break;
        case 'TRA BOT': {
            if(params.top + step * 50 > 450) {
                return;
            }
            move(box, { 'top' : params.top + 50 * step});
            params.top += 50 * step;
        }
            break;
        case 'MOV LEF': {
            if(params.left - step * 50 < 0) {
                return;
            }
            drection = 0;
            params.rotate = 270;
            rotate(drection);
            move(box, { 'left' : params.left - 50 * step});
            params.left -= step * 50;
            params.direction = 3;
        }
            break;
        case 'MOV TOP': {
            if(params.top -step * 50 < 0) {
                return;
            }
            drection = 0;
            params.rotate = 0;
            rotate(drection);
            move(box, { 'top' : params.top - 50 * step});
            params.top -= 50 * step;
            params.direction = 0;
        }
            break;
        case 'MOV RIG': {
            if(params.left + step * 50 > 450) {
                return;
            }
            drection = 0;
            params.rotate = 90;
            rotate(drection);
            move(box, { 'left' : params.left + step * 50});
            params.left += 50 * step;
            params.direction = 1;
        }
            break;
        case 'MOV BOT': {
            if(params.top + step * 50 > 450) {
               return;
            }
            drection = 0;
            params.rotate = 180;
            rotate(drection);
            move(box, { 'top' : params.top + 50 * step});
            params.top += 50 * step;
            params.direction = 2;
        }
            break;
        case 'GO': {
            var direc = params.direction;
            var result = direc % 4;
            switch (result) {
                case 0: {
                    if(params.top -step * 50 < 0) {
                        return;
                    }
                    move(box, { 'top' : params.top - 50 * step});
                    params.top -= 50 * step;
                }
                    break;
                case 1: {
                    if(params.left + step * 50 > 450) {
                        return;
                    }
                    move(box, { 'left' : params.left + 50 * step});
                    params.left += 50 * step;
                }
                    break;
                case 2: {
                    if(params.top + step * 50 > 450) {
                        return;
                    }
                    move(box, { 'top' : params.top + 50 * step});
                    params.top += 50 * step;
                }
                    break;
                case 3: {
                    if(params.left - step * 50 < 0) {
                        return;
                    }
                    move(box, { 'left' : params.left - 50 * step});
                    params.left -= 50 * step;
                }
                    break;

            }
        }
            break;
    }


    function rotate(drection) {
        params.direction += drection;
        if(drection == 3) {
            params.rotate -= 90;
        }
        else if(drection == 1) {
            params.rotate += 90;
        }
        else if(drection == 2) {
            params.rotate += 180;
        }
        box.style.transform = 'rotate('+params.rotate+'deg)';
        box.style.webkitTransform = 'rotate('+params.rotate+'deg)';
    }

}

/**
 * 取得指令
 * */
function getOrder() {
    var btn = document.getElementById('btn');
    var text = document.getElementById('order');
    var result = text.value.split('\n');
    order.value = result;

    //处理指令,去掉两边空格
    var len = order.value.length;
    var arr = [];
    for(var i = 0; i < len; i++) {
        arr[i] = order.value[i].trim();
    }
    order.value = arr;
}



/**
 *渲染行数列表
 * */
function renderRow() {
    var len = order.value.length;
    var aUl = document.getElementsByClassName('sidebar')[0].getElementsByTagName('ul')[0];
    var fragment = document.createDocumentFragment();
    aUl.innerHTML = '';
    for(var i = 0; i < len; i++) {
        var li = document.createElement('li');
        li.innerHTML = i+1;
        li.className = 'sideList';
        fragment.appendChild(li);
    }
    aUl.appendChild(fragment);
}
/**
 * 检查输入合法
 * */
function checkOrder() {
    var len = order.value.length;
    var wLi = document.getElementsByClassName('sideList');
    var result = true;
    var match = /^((GO\s\d+)|(TUN\s((LEF)|(RIG)|(BAC)))|(TRA\s((LEF)|(TOP)|(RIG)|(BOT))\s\d+)|(MOV\s((LEF)|(TOP)|(RIG)|(BOT))\s\d+))$/i;
    for(var i = 0; i < len; i++) {
        if(match.test(order.value[i])) {
            console.log('匹配');
        }
        else {
            wLi[i].style.backgroundColor = '#ff0000';
            result = false;
        }
    }

    return result;

}

/**
 * 初始化
 * */
function init() {
    initListener();
    getOrder();
    refresh();
}
init();

/**
 * 还原初始状态
 * */
function refresh() {
    var refresh = document.getElementById('refresh');
    var aUl = document.getElementsByClassName('sidebar')[0].getElementsByTagName('ul')[0];
    var textArea = document.getElementById('order');
    var active = document.getElementById('active');
    refresh.addEventListener('click', function() {
        aUl.innerHTML = '<li class="sideList" data-id="0">1</li>';
        textArea.value = '';

        params.top = 250;
        params.lef = 250;
        params.direction = 0;
        params.rotate = 0;
        active.style.left = '250px';
        active.style.top = '250px';
        active.style.transform = 'rotate(0deg)';
        active.style.webkitTransform = 'rotate(0deg)';
    }, false);


}

/**
 * 初始化监听器
 * */
function initListener() {

    var btn = document.getElementById('btn');
    var text = document.getElementById('order');
    var sidebar = document.getElementsByClassName('sidebar')[0];

    //监听输入内容改变
    var getInput = (function() {
        var textArea = document.getElementById('order');
        var timer;
        textArea.addEventListener('input', function() {
            if(timer) {
                return;
            }
            timer = setInterval(function() {
                clearTimeout(timer);
                timer = null;
                getOrder();
                renderRow();
            }, 500);
        }, false);
    })();


    //监听指令换行
    text.addEventListener('keydown', function() {
        var e = event || window.event;
        if(e.keyCode == 13) {
            getOrder();
            renderRow();
        }
    }, false);

    text.addEventListener('scroll', function() {
        sidebar.scrollTop = this.scrollTop;
    }, false);

    //点击执行
    btn.addEventListener('click', function() {
        renderRow();
        if(!checkOrder()) {
            return;
        }
        dealOrder();
    }, false);

}



//清除输入两端空格
String.prototype.trim =  function() {
    return this.replace(/^(\s*)|(\s*)$/g, '');
}



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
