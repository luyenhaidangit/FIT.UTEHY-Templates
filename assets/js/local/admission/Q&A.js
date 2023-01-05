$(document).ready(function() {

    $(".Q-A__question").click(function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass("active");
            $(this).next().slideUp(500);
        } else {
            $(this).addClass("active");
            $(this).next().slideDown(500);
        }
    });
});