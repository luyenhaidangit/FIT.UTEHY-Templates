$(document).ready(function() {
    $(".sign-in__btn").click(function(e) {
        e.preventDefault();
        var acc = $("#acc").val();

        var pass = $("#pass").val();
        if (acc === "admin" && pass === "admin") {
            window.location.replace("../admin/dashboard.html");
        } else {
            $("#mes").text("Tên tài khoản không hợp lệ!");
        }
    });
});