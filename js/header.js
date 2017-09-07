/**
 * Created by Administrator on 2016/8/22.
 */
$(function () {
    $(".header_right_R ul li").hover(function () {
        $(this).css({
            "background": "url('images/tel-bj.png') no-repeat",
            "margin-right": "11px",
            "width": "30px"
        }).stop().animate({width: "176px"}, 500);
        $(this).find("span").css("display", "inline-block")
    }, function () {
        $(this).stop().animate({"width": "41px", "margin-right": 0}, 800).css("background", "");
        $(this).find("span").css("display", "none")
    });
});