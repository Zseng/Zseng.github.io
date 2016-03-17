/**
 * Created by Max on 16/3/15.
 */
$(document).ready(function() {
    var navMove = function(){
        //初始化设定
        var Timer = null;
        var iSpeed = 0;

        var slider = function(){
            var oLi = $(".nav-item");
            var nav_underline = $("#underline");;
            var now = oLi.eq(0);
            var nav = $(".nav");

            nav_underline.css({
                left : now.position().left + 26 + "px",//初始化下划线位置，20为marin值
                width : now.css("width")
            });

            for (var i = 0; i < oLi.length; i++) {
                var Li = oLi.eq(i);
                Li.Index = i;
                Li.on("mouseover",function () {
                    $('.nav-item span').eq(0).removeClass('active');
                    nav_underline.css("width",$(this).css("width"));
                    startMove(this.offsetLeft + 8);
                });
                nav.on("mouseleave",function () {
                    $('.nav-item span').eq(0).addClass('active');
                    nav_underline.css("width",now.css("width"));
                    startMove(now.position().left + 26)
                });
            }
        };
        function startMove(iTarget) {
            if (Timer) {
                clearInterval(Timer);
            }
            Timer = setInterval(function () {
                doMove(iTarget);
            }, 30);
        }
        function doMove(iTarget) {
            var oLi = $("#underline");
            var oLiMove = oLi[0];

            iSpeed += (iTarget - oLiMove.offsetLeft) / 5;
            iSpeed *= 0.6;
            oLiMove.style["left"] = oLiMove.offsetLeft + iSpeed + "px";
        }

        slider();

    };
    navMove();

    var selectToggle = function() {
        var select = $('.select');
        var oUl = $('.optionBox');
        select.on('click', function(e) {
            if(e.target.className !== 'select'){
               return;
            }
            var thisUl = $(this).find('.optionBox');
            thisUl.css('display', 'block');
            $(this).css({
                'border-top': 'solid 1px #e74f4d',
                'border-left': 'solid 1px #e74f4d',
                'border-right': 'solid 1px #e74f4d'
            })
        });
        oUl.on('mouseover', '.options', function() {
            $(this).css('backgroundColor', '#e74f4d');
            $(this).find('i').css('visibility', 'visible');
            $(this).find('span').css('color', '#fff');

        });
        oUl.on('mouseout', '.options', function() {
            $(this).css('backgroundColor', '#e3e3e4');
            $(this).find('i').css('visibility', 'hidden');
            $(this).find('span').css('color', '#323333');
        });
        oUl.on('click', '.options', function(e) {
            var text = $(this).find('span').text();
            $(this).parent().parent().css('border', '1px solid #fff').find('span').eq(0).text(text);
            $(this).parent().css('display', 'none');


        });

        $(document).on('click', function(e) {
            if(e.target.className !== 'options' && e.target.className !== 'select') {
                $('.optionBox').css('display', 'none');
                $('.select').css('border', '1px solid #fff');


            }
        });
    };
    selectToggle();

    $('#back_top').on('click',function(){
        $('body').animate({scrollTop:'0'},'normal');
    });
});