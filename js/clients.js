/**
 * Created by Administrator on 2016/8/25.
 */
$(function(){
    /*footer start*/
    $("#footer").load("footer2.html");
    /*footer end*/

    (function(){
        var index=0;
        $(".part2_text ul").find("li").each(function(i){
            $(this).html(clients_Data.content[i])
        });
        $(".part2_ico ul").find("li").hover(function(){
            index=$(this).index();
            change();
            $(".part2_ico ul").find("li").css("backgroundColor","#323232");
            $(".part2_ico ul").find("li").find("img").css("display","none");
            $(this).css("backgroundColor","#00b2df");
            $(this).find("img").css("display","block")
        });
        function change(){
            $(".part2_text ul").find("li").stop().fadeOut(200).eq(index).fadeIn(200)
        }
    })();
});