/**
 * Created by Max on 16/10/25.
 */
var point_red = document.querySelectorAll('.point-red')[0];
var point_blue = document.querySelectorAll('.point-blue')[0];


drag_blue.startDrag(point_blue, point_blue);
drag_red.startDrag(point_red, point_red);

/**
 * @point_blue: [x, y] 蓝点坐标
 * @point_red: [x, y] 红点坐标
 * */
function repaintCanvas(point_blue, point_red) {

    cxt.clearRect(0, 0, 300, 700);
    //重绘间隔矩形背景
    cxt.save();
    cxt.fillStyle = "#f0f0f0";
    cxt.fillRect(0, 220, 300, 20);
    cxt.fillRect(0, 260, 300, 20);
    cxt.fillRect(0, 300, 300, 20);
    cxt.fillRect(0, 340, 300, 20);
    cxt.fillRect(0, 380, 300, 20);
    cxt.fillRect(0, 420, 300, 20);
    cxt.fillRect(0, 460, 300, 20);
    cxt.restore();

    //重绘比较线(直线)
    cxt.save();
    cxt.beginPath();
    cxt.lineWidth = 8;
    cxt.strokeStyle = "#a0a0a0";
    cxt.globalAlpha = 0.3;
    cxt.moveTo(0, 500);
    cxt.lineTo(300, 200);
    cxt.closePath();
    cxt.stroke();
    cxt.restore();

    //重绘坐标轴
    cxt.save();
    cxt.beginPath();
    cxt.moveTo(0, 500);
    cxt.lineTo(0, 200);
    cxt.moveTo(0, 500);
    cxt.lineTo(300, 500);
    cxt.closePath();
    cxt.stroke();
    cxt.restore();

    //画坐标
    cxt.save();
    cxt.font= "12px Arial";
    cxt.fillText("0.5", 0, 350);
    cxt.fillText("0.5", 150, 512);
    cxt.restore();

    //重绘蓝色按钮控制线
    cxt.save();
    cxt.beginPath();
    cxt.strokeStyle = "#727272";
    cxt.lineWidth = 2;
    cxt.moveTo(300, 200);
    cxt.lineTo(point_blue[0], point_blue[1]);
    cxt.closePath();
    cxt.stroke();
    cxt.restore();

    //重绘红色色按钮控制线
    cxt.save();
    cxt.beginPath();
    cxt.strokeStyle = "#727272";
    cxt.lineWidth = 2;
    cxt.moveTo(0, 500);
    cxt.lineTo(point_red[0], point_red[1]);
    cxt.closePath();
    cxt.stroke();
    cxt.restore();

    //重绘贝赛尔曲线
    cxt.save();
    cxt.beginPath();
    cxt.lineWidth = 6;
    cxt.moveTo(0, 500);
    cxt.bezierCurveTo(point_red[0], point_red[1], point_blue[0], point_blue[1], 300, 200);
    cxt.stroke();
    cxt.restore();
}

/**
 * @point_X 点横坐标
 * @point_Y 点纵坐标
 * */
function calcArgs(point_X, point_Y) {
    var resultX, resultY;
    //针对拖动按钮宽度有0.03的偏移调整
    resultX = point_X / 300 + 0.03;
    resultY = (300 - (point_Y - 200)) / 300 - 0.03;

    return {
        x: resultX.toFixed(2),
        y: resultY.toFixed(2)
    }
}

/**
 * @point_X 要绘制点的横坐标
 * @point_Y 要绘制点的纵坐标
 * @type 区分蓝点,红点
 * */
function repaintList(point_X, point_Y, type) {
    var red = document.querySelectorAll(".red");
    var blue = document.querySelectorAll(".blue");

    var resultObj = calcArgs(point_X, point_Y);
    //如果是红点移动
    if (type) {
        red[0].innerHTML = resultObj.x;
        red[1].innerHTML = resultObj.y;
    }
    else {
        blue[0].innerHTML = resultObj.x;
        blue[1].innerHTML = resultObj.y;
    }
}