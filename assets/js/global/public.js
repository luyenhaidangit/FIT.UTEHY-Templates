// Xử lý sticky navbar
function stickyNavbar() {
    $(window).on('scroll', function() {
        if ($(window).scrollTop() >= 32 && !$('.navigation').hasClass('fixed')) {
            $('.navigation').addClass('fixed');
        } else if ($(window).scrollTop() < 32 && $('.navigation').hasClass('fixed')) {
            $('.navigation').removeClass('fixed')
        }
    });
}

// Bật tắt form tìm kiếm
function topBarSearch() {
    let search = $(".topbar__item.topbar__search");
    let searchWrap = $(".topbar-social__wrap");
    let searchOverley = $(".topbar__overlay");

    search.click(function() {
        searchWrap.css("display", "block");
    });

    searchOverley.click(function(e) {
        e.stopPropagation();
        searchWrap.css("display", "none");
    });
}

//Navbar reponsive
function navBarReponsive(params) {
    openCloseMainNav();

    changeIconNavBar();
}

// Bật tắt Main NavBar khi reponsive
function openCloseMainNav() {
    let navCollapse = $(".navigation__collapse");
    let navOverlay = $(".nav__overlay");
    let nav = $(".navigation__nav");
    let mainNav = $(".main-nav__item");

    navCollapse.click(function() {
        if (navOverlay.css("display") == "none") {
            navOverlay.toggle();
        }
        nav.toggle(500);
    });

    navOverlay.click(function() {
        if (navOverlay.css("display") == "block") {
            navOverlay.toggle();
        }
        nav.toggle(500);
    });

    $(window).resize(function() {
        if ($(window).width() >= 1160) {
            navOverlay.css("display", "none");
            nav.css("display", "flex");
        } else {
            if (navOverlay.css("display") == "block") {
                nav.css("display", "block");
            } else {
                nav.css("display", "none");
            }
        }
    });
}

// Thay icon MainNav khi reponsive
function changeIconNavBar() {
    let iconMainNav = $(".main-nav__item > a > i");
    if (window.matchMedia('(max-width: 1160px)').matches) {
        iconMainNav.removeClass("far fa-angle-down").addClass("far fa-angle-right");
    }
    $(window).resize(function() {
        if ($(window).width() >= 1160) {
            iconMainNav.removeClass("far fa-angle-right").addClass("far fa-angle-down");
        } else {
            iconMainNav.removeClass("far fa-angle-down").addClass("far fa-angle-right");
        }
    });
}

$(document).ready(function() {
    stickyNavbar();

    topBarSearch();

    navBarReponsive();
});