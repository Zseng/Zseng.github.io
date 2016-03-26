/**
 * Created by Max on 16/3/24.
 */
//随机图表颜色
var colorArray = ['#0ae', '#00f', '#0f4', '#5ee', '#e55', '#d5e', '#ed5', '#000', '#eee', '#4ea'];

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: '北京',
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {
    var libox = document.getElementsByClassName('aqi-chart-wrap')[0].getElementsByTagName('ul');
    var str = '';
    var time = pageState.nowGraTime;
    var city = pageState.nowSelectCity;

    switch (time) {
        case 'day': {
            for(var i in chartData[city][0]) {
                var color = colorArray[parseInt(Math.random()*10)];
                var height = chartData[city][0][i];
                str += '<li title="'+i+'" style="height: '+height+'px;background-color: '+color+'"></li>';
            }
        }
            break;
        case 'week': {
            for(var i in chartData[city][1]) {
                var color = colorArray[parseInt(Math.random()*10)];
                var height = chartData[city][1][i];
                str += '<li title="第'+i+'周" style="height: '+height/10+'px;width: 50px;background-color: '+color+'"></li>';

            }
        }
            break;
        case 'month': {
            for(var i in chartData[city][2]) {
                var color = colorArray[parseInt(Math.random()*10)];
                var height = chartData[city][2][i];
                str += '<li title="第'+i+'月" style="height: '+height/20+'px;width: 100px;background-color: '+color+'"></li>';

            }
        }
    }
    libox[0].innerHTML = str;


    //改变y轴数据位置和数据
    var getCss = function(o,key){
        return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o, null)[key];
    };
    var chart_y = document.getElementsByClassName('chart-y')[0];
    var nowHeight = parseInt(getCss(chart_y, 'height'));
    var spans = chart_y.getElementsByTagName('span');
    spans[1].style.top = Math.floor(nowHeight/2) + 'px';
    spans[2].style.top = nowHeight + 'px';
    switch (time) {
        case 'day': {
            var dataArry = [];
            for(var i in chartData[city][0]) {
                dataArry.push(chartData[city][0][i]);
            }
            var max = Math.max.apply(null, dataArry);
            spans[0].innerHTML = max;
            spans[1].innerHTML = Math.floor(max/2);
        }
            break;
        case 'week' : {
            var dataArry = [];
            for(var i in chartData[city][1]) {
                dataArry.push(chartData[city][1][i]);
            }
            var max = Math.max.apply(null, dataArry);
            spans[0].innerHTML = max;
            spans[1].innerHTML = Math.floor(max/2);
        }
            break;
        case 'month': {
            var dataArry = [];
            for(var i in chartData[city][2]) {
                dataArry.push(chartData[city][2][i]);
            }
            var max = Math.max.apply(null, dataArry);
            spans[0].innerHTML = max;
            spans[1].innerHTML = Math.floor(max/2);
        }
    }



}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    var city = document.getElementById('city-select').value;
    var data = this.getAttribute('value');
    // 确定是否选项发生了变化,并根据设置对应数据
    if(data !== pageState.nowGraTime) {
        pageState.nowGraTime = data;

    }


    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    var city = document.getElementById('city-select').value;
    //检查select是否改变
    if(city !== pageState.nowSelectCity) {
        // 设置对应数据
        pageState.nowSelectCity = this.value;
    }

    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var inputs = document.getElementsByTagName('input');
    var len = inputs.length;
    for(var i = 0; i < len; i++) {
        inputs[i].addEventListener('click', function() {
            graTimeChange.call(this);
        }, false);
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var city_select = document.getElementById('city-select');
    var fragment = document.createDocumentFragment();
    for(var i in aqiSourceData) {
        var option = document.createElement('option');
        option.innerHTML = i;
        fragment.appendChild(option);
    }
    city_select.appendChild(fragment);
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    city_select.addEventListener('change', citySelectChange, false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式,并将处理好的数据存到 chartData 中
    for(var j in aqiSourceData) {
        var day = {}, week = {}, month = {};
        chartData[j] = [];

        //处理每天
        for(var i in aqiSourceData[j]) {
            day[i] = aqiSourceData[j][i];
        }
        chartData[j].push(day);

        //处理一个星期
        var weekArry = [];
        for(var i in aqiSourceData[j]) {
            var data_week = aqiSourceData[j][i];
            weekArry.push(data_week);
        }
        var n = 1;
        while(weekArry.length > 0) {
            var total = 0;
            for(var k = 0; k < 7; k++) {
                if(weekArry.length > 0) {
                    total += weekArry.shift();
                }

            }
            week[n] = total;
            n++;
        }
        chartData[j].push(week);

        //处理一个月
        var getMonth = /(([0][0-9])|([1][0-2]))(?=\-)/;  //匹配月份
        for(var i in aqiSourceData[j]) {
            var testResult = i.match(getMonth)[0];
            if(month[testResult] !== undefined) {
                month[testResult] += aqiSourceData[j][i];
            }
            else {
                month[testResult] = aqiSourceData[j][i];
            }

        }
        chartData[j].push(month);

    }
}


/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    renderChart();
}

init();



