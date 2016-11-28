/**
 * Created by Max on 16/10/25.
 */
var drawing = document.querySelector('#canvas-main');
var cxt;
var drag_red = new dragObject(280, 490, "red");
var drag_blue = new dragObject(10, 210, "blue");

if (drawing.getContext) {
    cxt = drawing.getContext("2d");
    //绘制间隔矩形背景
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

    //绘制比较线(直线)
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

    //画坐标轴
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

    //绘制蓝色按钮控制线
    cxt.save();
    cxt.beginPath();
    cxt.strokeStyle = "#727272";
    cxt.lineWidth = 2;
    cxt.moveTo(300, 200);
    cxt.lineTo(10, 210);
    cxt.closePath();
    cxt.stroke();
    cxt.restore();

    //绘制红色色按钮控制线
    cxt.save();
    cxt.beginPath();
    cxt.strokeStyle = "#727272";
    cxt.lineWidth = 2;
    cxt.moveTo(0, 500);
    cxt.lineTo(290, 490);
    cxt.closePath();
    cxt.stroke();
    cxt.restore();

    //初始化贝赛尔曲线
    cxt.save();
    cxt.beginPath();
    cxt.lineWidth = 6;
    cxt.moveTo(0, 500);
    cxt.bezierCurveTo(290, 490, 0, 200, 300, 200);
    cxt.stroke();
    cxt.restore();

}

var btn = document.querySelector('.go');
var moveObj = document.querySelector('#example');
btn.addEventListener('click', function () {
    var red = document.querySelectorAll('.red');
    var blue = document.querySelectorAll('.blue');

    moveObj.classList.add("move");
    moveObj.style.animationTimingFunction = "cubic-bezier("+red[0].innerHTML+", "+red[1].innerHTML +","+ blue[0].innerHTML +","+ blue[1].innerHTML+")";
    btn.disabled = true;
});

moveObj.addEventListener('animationend', function () {
    moveObj.classList.remove("move");
    btn.disabled = false;
});
