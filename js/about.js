/**
 * Created by Administrator on 2016/8/24.
 */
$(function () {
    /*part2 start*/
    (function () {
        $(".service").hover(function () {
            $(".service_text").stop().animate({"left": 0}, 300);
            $(".faith").css("z-index", "980");
            $(".faith_text").css("z-index", "979");
        }, function () {
            $(".service_text").stop().animate({"left": "-370px"}, 0);
            $(".faith").css("z-index", "999");
            $(".faith_text").css("z-index", "995");
        });
        $(".faith").hover(function () {
            $(".faith_text").stop().animate({"right": "-20px"}, 300);
            $(".service").css("z-index", "980");
            $(".service_text").css("z-index", "979");
        }, function () {
            $(".faith_text").stop().animate({"right": "-390px"}, 0);
            $(".service").css("z-index", "999");
            $(".service_text").css("z-index", "995");
        })
    })();
    /*part2 end*/

    /*part3 start*/
    (function () {
        var index = 0;
        var timer=null;
        $(".p3_mid_in_nav").hover(function () {
            index = $(this).index();
            timer=setInterval(function(){
                $(".p3_mid_in_nav").find("img").css("display", "none").end().eq(index).find("img").css("display", "block");
                $(".p3_mid_content img").eq(index).fadeIn(400).siblings().fadeOut(400);
            },200)
        },function(){
            clearInterval(timer);
        })
    })();
    /*part3 end*/

    /*part4 start*/
    (function () {
        $(".p4_mid h3").click(function(){
            $(this).css("display","none").next("div.p4_mid_in").slideDown(300);
            $(this).siblings("h3").css("display","block").next("div.p4_mid_in").slideUp(300);
        })
    })();
    /*part4 end*/


    /*footer start*/
    $("#footer").load("footer1.html");
    /*footer end*/

    /*left nav start*/
    (function () {
        var li = $("#nav li");
        var goTo = $(".goTo");
        var nextPart = $(".nextPart");
        console.log(nextPart.length);
        var index = 0;
        li.click(function () {
            index = $(this).index();
            li.find("a span").removeClass("nav_ico").end().eq(index).find("a span").addClass("nav_ico");
            $('body,html').animate({"scrollTop": goTo.eq(index).offset().top}, 1000, "backOut")
        });
        $(window).scroll(function () {
            var hh = $(window).scrollTop();
            var hh1= $(".di").offset().top;
            if (hh >= 400) {
                $("#nav").fadeIn(600)
            } else {
                $("#nav").fadeOut(0)
            }
            for (var i = 0; i < 5; i++) {
                if (hh == 0) {
                    li.find("a span").removeClass("nav_ico").end().eq(0).find("a span").addClass("nav_ico");
                } else if(hh1-hh==$(window).height()){
                    li.find("a span").removeClass("nav_ico").end().eq(4).find("a span").addClass("nav_ico");
                } else if (goTo.eq(i).offset().top - hh < goTo.eq(i).height() - ($(window).height()/2) && goTo.eq(i).offset().top > hh) {
                    li.find("a span").removeClass("nav_ico").end().eq(i).find("a span").addClass("nav_ico");
                }
            }
        });
        nextPart.click(function () {
            index = $(this).parent().parent().index();

            $('body,html').animate({"scrollTop": goTo.eq(index + 1).offset().top}, 1000, "backOut")
        })
    })();
    /*left nav end*/
});