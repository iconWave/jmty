var zhuJl = {
    barNode: $('.bar'),
    personNode: $('.person'),
    hillNode: $('.hill'),
    cloudNode: $('.cloud'),
    treeNode: $('.tree'),
    doorNode: $('.door'),
    doorRNode: $('.door-right'),
    floorNode: $('.floor'),
    foots: $('.person-foot'),
    arm: $('.person-arm'),
    promptMes: $('.promptMes'),
    endSign: false,
    oriSign: 1,     // 人物朝向，1表示向右，0表示向左

    floorFun: function (num) { //num表示我的动画长度，单位是px；

        var _this = this;
        var liLength = num / 100;
        var winW = $(window).width();  //页面的可视宽度
        var winH = $(window).height();
        var html = '';
        for (var i = 0; i < liLength; i++) {
            if (i == 65) {
                var num0 = 200;
                num += num0;
                html += '<li style="margin-left:' + num0 + 'px">';
            }else{
                html += '<li>';
                html += '<div class="floor-grass"></div>';
                html += '<span></span><span></span>';
                html += '<div class="arrow">';
                html += '<i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>';
                html += '</div></li>';
            }
        }
        //水平方向可以滚动的最大距离是什么:num-winW
        //垂直方向可以滚动的最大距离是什么:num-winW

        _this.floorNode.css('width', num + "px"); //num实际的宽度
        _this.floorNode.children('ul').html(html);
        _this.barNode.css("height", (num - winW + winH) + "px");  //(num-winW+winH)实际高度

    },
    hillFun: function (leftPos) {//leftPos表示山偏移的位置

        var _this = this;

        var html = '<div class="hill-one" style="left:' + leftPos + 'px;">';
        html += '<span></span>';
        html += '<div class="hill-half">';
        html += '<span></span></div></div>';
        _this.hillNode.append(html);

    },
    cloudFun: function (leftpos, topPos, typeNum) {  //typeNum 表示云的样式编号

        typeNum = typeNum == null ? 0 : typeNum;
        var _this = this;

        var html = '<div class="cloud-one cloud-0' + typeNum + '" style= "left: ' + leftpos + 'px; top: ' + topPos + 'px">';

            html += '<span></span><span></span>';
            html += '</div>';

        _this.cloudNode.append(html);

    },
    treeFun: function (leftPos, treeType, treeColor) {//type 有 big，middle，little，color有green，lightgreen

        var _this = this;

        var html = '<div class="' + treeType + ' ' + treeColor + '" style="left:' + leftPos + 'px;">';

        html += '<span><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>';
        html += '<span></span>';
        html += '</div>';

        _this.treeNode.append(html);

    },
    doorFun: function (leftPos, doorTitle) {

        var _this = this;
        var html = '<div style="left:' + leftPos + 'px;">';
        html += '<span></span><span></span>';
        html += '<h3>' + doorTitle + '</h3>';
        html += '</div>';

        var htmlr = '<div style="left:' + (leftPos + 240) + 'px;">';
        htmlr += '<span></span><span></span>';
        htmlr += '</div>';
        _this.doorNode.append(html);
        _this.doorRNode.append(htmlr);
    },
    personObj: {
        person: $('.person'),
        leftArm: $('.arm-left'),
        rightArm: $('.arm-right'),
        leftFooter: $('.person-footer-left'),
        rightFooter: $('.person-footer-right'),
        toLeftFun: function (speed) {
            var nowPlace = $('html').scrollTop() + $('body').scrollTop();
            $('html').scrollTop($('html').scrollTop() - speed);
            $('body').scrollTop($('body').scrollTop() - speed);
        },
        toRightFun: function (speed) {
            var nowPlace = $('html').scrollTop() + $('body').scrollTop();
            $('html').scrollTop($('html').scrollTop() + speed);
            $('body').scrollTop($('body').scrollTop() + speed);
        },
        jumpFun: function () {

            this.person.animate({bottom: '300px'}, 800).animate({bottom: '158px'}, 400);

            zhuJl.jumpSign = false;
        }
    },
    bubbleFun: function () {
        var bubbles = $('.main-animate li');
        bubbles.fadeIn();
    },
    footballFun: function () {
        var balls = $('.mainsec-animate li');
        balls.fadeIn();
    },
    waterFun: function () {
        var waterlis = $('.mainthree-animate li');
        waterlis.fadeIn();
    },
    runFun: function () {
        var personlis = $('.mainfour-animate li');
        personlis.fadeIn();
    },
    init: function () {
        var _this = this;
        _this.jumpSign = true;
        //人物动作
        $(document).keydown(function (e) {

            var event = window.event || e;

            _this.promptMes.css("display","none");

            if (event.keyCode >= 37 && event.keyCode <= 40) {
                _this.arm.addClass('aarms');
                _this.foots.eq(0).addClass('aleft');
                _this.foots.eq(1).addClass('aright');
            }
            if (event.keyCode == 37) {
                _this.leftRun = _this.personObj.toLeftFun(20);
                if (_this.oriSign == 1) {
                    _this.personNode.css({transform: 'scaleX(-1)'});
                    _this.oriSign = 0;
                }
            }
            if (event.keyCode == 38) {
                if (_this.jumpSign) {
                    _this.personObj.jumpFun();
                    if (_this.oriSign == 1) {
                        _this.personNode.css({transform: 'scaleX(-1)'});
                        _this.oriSign = 0;
                    }
                }
            }
            if (event.keyCode == 39) {
                _this.rightRun = _this.personObj.toRightFun(20);
                if (_this.oriSign == 0) {
                    _this.personNode.css({transform: ''});
                    _this.oriSign = 1;
                }
            }
            if (event.keyCode == 40) {
                if (_this.oriSign == 0) {
                    _this.personNode.css({transform: ''});
                    _this.oriSign = 1;
                }
            }
        });
        $(document).keyup(function (e) {
            var event = window.event || e;
            if (event.keyCode == 38) {
                setTimeout(function () {//防止动画滞后多次执行（效果不是很好）
                    _this.jumpSign = true;
                }, 1200);
            }
            if (event.keyCode <= 40 && event.keyCode >= 37) {
                setTimeout(function () {
                    _this.arm.removeClass('aarms');
                    _this.foots.eq(0).removeClass('aleft');
                    _this.foots.eq(1).removeClass('aright');
                }, 300);
            }
        });

        //创建云
        _this.cloudFun(400, 80);
        _this.cloudFun(0, 80, 1);
        _this.cloudFun(600, 120, 1);
        _this.cloudFun(1000, 60);
        _this.cloudFun(1400, 70, 1);
        _this.cloudFun(1800, 100);

        //创建山
        _this.hillFun(500);
        _this.hillFun(2400);

        //创建树
        _this.treeFun(250, 'little', 'lightgreen');
        _this.treeFun(300, 'big', 'green');
        _this.treeFun(400, 'middle', 'lightgreen');

        _this.treeFun(1600, 'little', 'lightgreen');
        _this.treeFun(1700, 'little', 'green');
        _this.treeFun(1800, 'little', 'lightgreen');
        _this.treeFun(1900, 'little', 'green');
        _this.treeFun(2000, 'little', 'lightgreen');
        _this.treeFun(2100, 'little', 'green');

        _this.treeFun(3000, 'big', 'green');
        _this.treeFun(3100, 'little', 'lightgreen');
        _this.treeFun(3200, 'middle', 'green');

        _this.treeFun(4700, 'little', 'lightgreen');
        _this.treeFun(4800, 'middle', 'green');
        _this.treeFun(4900, 'little', 'lightgreen');

        _this.treeFun(6700, 'little', 'green');
        _this.treeFun(6800, 'big', 'lightgreen');

        _this.treeFun(8500, 'big', 'green');
        _this.treeFun(8700, 'little', 'lightgreen');

        _this.treeFun(9000, 'middle', 'green');
        _this.treeFun(9100, 'little', 'lightgreen');
        _this.treeFun(9200, 'little', 'green');
        _this.treeFun(9300, 'big', 'lightgreen');
        _this.treeFun(9500, 'little', 'green');

        _this.treeFun(11000, 'little', 'lightgreen');
        _this.treeFun(11100, 'middle', 'green');
        _this.treeFun(11200, 'big', 'lightgreen');

        _this.treeFun(12700, 'little', 'green');
        _this.treeFun(12800, 'big', 'lightgreen');
        _this.treeFun(13000, 'big', 'green');
        _this.treeFun(13400, 'little', 'green');
        _this.treeFun(13500, 'middle', 'lightgreen');

        _this.treeFun(14800, 'big', 'green');
        _this.treeFun(15000, 'middle', 'lightgreen');
        _this.treeFun(15100, 'middle', 'green');
        _this.treeFun(15200, 'little', 'lightgreen');

        _this.treeFun(17000, 'middle', 'lightgreen');
        _this.treeFun(17200, 'middle', 'green');
        _this.treeFun(17400, 'middle', 'lightgreen');
        _this.treeFun(17600, 'middle', 'green');

        //创建门
        _this.doorFun(800, '要开始了哟');
        _this.doorFun(3400, '前端之代码');
        _this.doorFun(7000, '前端之工具');
        _this.doorFun(11400, '前端之布局');
        _this.doorFun(15400, '前端之框架');
        _this.doorFun(18000, '结束了啊哦');

        //创建地板
        _this.floorFun(20000);

        $(window).scroll(function () {
            var scrollLeft = $('html').scrollTop() + $('body').scrollTop();

            _this.doorNode.css('left', -scrollLeft + "px");
            _this.doorRNode.css('left', -scrollLeft + "px");
            _this.floorNode.css('left', -scrollLeft + "px");
            _this.hillNode.css('left', -scrollLeft / 5 + "px");
            _this.cloudNode.css('left', -scrollLeft / 20 + "px");

            if (scrollLeft >= 5700) {
                $('.plank').addClass("aplank");
            }

            if (scrollLeft >= 3150 && scrollLeft <= 3380) {
                $('.do-one').fadeIn();
                setTimeout(function () {
                    $('.do-one').fadeOut();
                }, 1000);
            } else if (scrollLeft >= 6800 && scrollLeft <= 7020) {
                $('.do-two').fadeIn();
                setTimeout(function () {
                    $('.do-two').fadeOut();
                }, 1000);
            } else if (scrollLeft >= 11250 && scrollLeft <= 11500) {
                $('.do-three').fadeIn();
                setTimeout(function () {
                    $('.do-three').fadeOut();
                }, 1000);
            } else if (scrollLeft >= 15200 && scrollLeft <= 15350) {
                $('.do-four').fadeIn();
                setTimeout(function () {
                    $('.do-four').fadeOut();
                }, 1000);
            }

            if (scrollLeft >= 3380) {
                _this.bubbleFun();
            }
            if (scrollLeft >= 7020) {
                _this.footballFun();
            }
            if (scrollLeft >= 11500) {
                _this.waterFun();
            }
            if (scrollLeft >= 15500) {
                _this.runFun();
            }

            if (scrollLeft >= 18000 && _this.endSign == false) {
                alert("Thanks for look~");
                _this.endSign = true;
                location.reload();
            }
        });


        document.body.onbeforeunload = function () {//刷新回到开头,
            $('html').scrollTop(0);
            $('body').scrollTop(0);
        }
    }
};


zhuJl.init();

$(window).resize(function () {
    zhuJl.init();
});