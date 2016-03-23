/**
 * Created by Max on 16/3/23.
 */
window.onload = function() {
    /**
     * aqiData，存储用户输入的空气指数数据
     * 示例格式：
     * aqiData = {
     *    "北京": 90,
     *    "上海": 40
     * };
     */
    var aqiData = {};


    /**
     * 从用户输入中获取数据，向aqiData中增加一条数据
     * 然后渲染aqi-list列表，增加新增的数据
     */
    function addAqiData() {
        var input_city = document.getElementById('aqi-city-input'),
            input_air = document.getElementById('aqi-value-input'),
            city_test = /^([\u4e00-\u9fa5]+)$|^([a-z]+)$/gi,
            air_test = /^\d+$/,
            city_value = input_city.value.trim(),
            air_value = input_air.value.trim();
        if(city_value == '') {
            alert('请输入城市名');
            return;
        }
        if(air_value == '') {
            alert('请输入空气质量');
            return;
        }
        if(!city_value.match(city_test)) {
            alert('城市请输入中文或英文字符');
            return;
        }

        if(!air_value.match(air_test)) {
            alert('空气质量请输入整数数字');
            return;
        }
        if(aqiData[city_value] == undefined) {
            aqiData[city_value] = air_value;
        }
        else {
            alert('已存在该城市信息');
        }

    }

    /**
     * 渲染aqi-table表格
     */
    function renderAqiList() {
        var table = document.getElementById('aqi-table');
        var str = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
        for(var i in aqiData) {
            str += '<tr><td>'+i+'</td><td>'+aqiData[i]+'</td><td><button>删除</button></td></tr>';
        }
        table.innerHTML = str;
    }

    /**
     * 点击add-btn时的处理逻辑
     * 获取用户输入，更新数据，并进行页面呈现的更新
     */
    function addBtnHandle() {
        addAqiData();
        renderAqiList();
    }

    /**
     * 点击各个删除按钮的时候的处理逻辑
     * 获取哪个城市数据被删，删除数据，更新表格显示
     */
    function delBtnHandle(event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        if(target.nodeName.toLowerCase() === 'button') {
            var deleObj = target.parentNode.parentNode.firstChild.innerHTML;
            delete aqiData[deleObj];
        }
        renderAqiList();
    }

    function init() {

        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        var btn = document.getElementById('add-btn');
        btn.addEventListener('click', addBtnHandle, false);
        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        var table = document.getElementById('aqi-table');
        table.addEventListener('click', delBtnHandle, false);

    }

    init();

    //去掉字符串两端空格
    String.prototype.trim = function() {
        return this.replace(/^(\s*)|(\s*)$/g, '');
    };


}