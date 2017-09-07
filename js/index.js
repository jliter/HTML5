/**
 * Created by Administrator on 2016/8/22.
 */
$(function () {
    /*banner start*/
    (function () {
        var index = 0;
        var spanNav = $(".banner_wrap .prevNext_nav div");
        var bannerLi = $(".banner_wrap ul li");
        var l = bannerLi.length;
        var timer=null;
        timer=setInterval(function(){
            next();
        },6000);

        function next() {
            index++;
            index = index < l ? index : 0;
            bannerLi.stop(true, true).fadeOut().eq(index).fadeIn(200);
            spanNav.find("span").removeClass("prevNext_nav_now").eq(index).addClass("prevNext_nav_now");
            animateImage();
        }

        $(".prevNext_next").click(function () {
            clearInterval(timer);
            next();timer=setInterval(function(){
                next();
            },6000);
        });
        $(".prevNext_prev").click(function () {
            clearInterval(timer);
            index--;
            index = index < 0 ? l - 1 : index;
            bannerLi.stop(true, true).fadeOut().eq(index).fadeIn(200);
            spanNav.find("span").removeClass("prevNext_nav_now").eq(index).addClass("prevNext_nav_now");
            animateImage();
            timer=setInterval(function(){
                next();
            },6000);
        });

        spanNav.click(function () {
            clearInterval(timer);
            index = $(this).index();
            spanNav.find("span").removeClass("prevNext_nav_now");
            $(this).find("span").addClass("prevNext_nav_now");
            bannerLi.fadeOut().eq(index).fadeIn(200);
            animateImage();
            timer=setInterval(function(){
                next();
            },6000);
        });

        function animateImage() {
            bannerLi.eq(index).siblings().find("img").hide();
            bannerLi.eq(index).find(".banner1_1").show().addClass("animated slideInLeft");
            setTimeout(function () {
                bannerLi.eq(index).find(".banner1_2").show().addClass("animated slideInRight");
                setTimeout(function () {
                    bannerLi.eq(index).find(".banner1_3").show().addClass("animated slideInUp");
                    setTimeout(function () {
                        bannerLi.eq(index).find(".banner1_4").show().addClass("animated slideInDown");
                    }, 500)
                }, 500)
            }, 500)
        }

        animateImage();
    })();
    /*banner end*/

    /*part3 start*/
    (function () {
        var span = $(".part3_change span");
        var index = 0;
        span.click(function () {
            index = $(this).index();
            span.removeClass("p3_now").eq(index).addClass("p3_now");
            $(".part3_border").stop().animate({"left": "-" + 1220 * index + "px"}, 500, "easeBothStrong")
        })
    })();
    /*part3 end*/

    /*part4 start*/
    (function () {
        var i = 0;
        $(window).scroll(function () {
            $(".p4_in_left").each(function (i) {
                var w = $(".p4_in_left").eq(i).offset().top - $(window).scrollTop();
                if ((w - 380) > 0) {
                    $(".p4_in_left").eq(i).css("left", "-" + (w - 380) + "px")
                } else {
                    $(".p4_in_left").eq(i).css("left", 0)
                }

            });

            $(".p4_in_right").each(function (i) {
                var w1 = $(".p4_in_right").eq(i).offset().top - $(window).scrollTop();
                if ((w1 - 380) > 0) {
                    $(".p4_in_right").eq(i).css("left", (w1 - 380) + "px")
                } else {
                    $(".p4_in_right").eq(i).css("left", 0)
                }
            });
            //$(".p4_in_left").offset().top - $(window).scrollTop();
        });
    })();
    /*part4 end*/

    /*map start*/
    (function () {
        function initMap() {
            createMap();
            setMapEvent();
            addMapControl();
            addMarker();
        }

        function createMap() {
            var map = new BMap.Map("dituContent");
            var point = new BMap.Point(118.217833, 39.669496);
            map.centerAndZoom(point, 17);
            window.map = map;
        }

        function setMapEvent() {
            map.disableDragging();
            map.disableDoubleClickZoom();
        }

        function addMapControl() {
            var ctrl_nav = new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_LEFT,
                type: BMAP_NAVIGATION_CONTROL_LARGE
            });
            map.addControl(ctrl_nav);
            var ctrl_ove = new BMap.OverviewMapControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 0});
            map.addControl(ctrl_ove);
            var ctrl_sca = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
            map.addControl(ctrl_sca);
        }

        var markerArr = [{
            title: "",
            content: "唐山务诚网络公司是从事唐山网站建设、网络运营推广、软件定制开发的大型唐山网络公司，为你构建更具吸引力和品牌感的标杆型网站，量身定制网络品牌运营方案，您身边的网络运营顾问，管家式服务。",
            point: "118.217878|39.669829",
            isOpen: 0,
            icon: {w: 95, h: 119, l: 0, t: 0, x: -16, lb: 5}
        }];

        function addMarker() {
            for (var i = 0; i < markerArr.length; i++) {
                var json = markerArr[i];
                var p0 = json.point.split("|")[0];
                var p1 = json.point.split("|")[1];
                var point = new BMap.Point(p0, p1);
                var iconImg = createIcon(json.icon);
                var marker = new BMap.Marker(point, {icon: iconImg});
                var iw = createInfoWindow(i);
                var label = new BMap.Label(json.title, {"offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20)});
                marker.setLabel(label);
                map.addOverlay(marker);
                label.setStyle({
                    border: "none !important",
                    background: "none",
                    cursor: "pointer"
                });

                (function () {
                    var index = i;
                    var _iw = createInfoWindow(i);
                    var _marker = marker;
                    _marker.addEventListener("click", function () {
                        this.openInfoWindow(_iw);
                    });
                    _iw.addEventListener("open", function () {
                        _marker.getLabel().hide();
                    });
                    _iw.addEventListener("close", function () {
                        _marker.getLabel().show();
                    });
                    label.addEventListener("click", function () {
                        _marker.openInfoWindow(_iw);
                    });
                    if (!!json.isOpen) {
                        label.hide();
                        _marker.openInfoWindow(_iw);
                    }
                })()
            }
        }

        function createInfoWindow(i) {
            var json = markerArr[i];
            var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>" + json.content + "</div>");
            return iw;
        }

        function createIcon(json) {
            var icon = new BMap.Icon("images/icon_map.png", new BMap.Size(json.w, json.h), {
                imageOffset: new BMap.Size(-json.l, -json.t),
                infoWindowOffset: new BMap.Size(json.lb + 5, 1),
                offset: new BMap.Size(json.x, json.h)
            })
            return icon;
        }

        initMap();
    })();
    /*map end*/

    /*footer start*/
    $("#footer").load("footer.html");
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
            if (hh >= 400) {
                $("#nav").fadeIn(600)
            } else {
                $("#nav").fadeOut(0)
            }
            for (var i = 0; i < 5; i++) {
                if (hh == 0) {
                    li.find("a span").removeClass("nav_ico").end().eq(0).find("a span").addClass("nav_ico");
                } else if (goTo.eq(i).offset().top - hh < goTo.eq(i).height() - 350 && goTo.eq(i).offset().top > hh) {
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