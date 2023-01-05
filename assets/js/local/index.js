$(document).ready(function() {
    // sliderShow();

    slickSlider();

    slickSliderDot();

    traningTab();

    studentSlider();
});

// Xử lý slider
function sliderShow() {
    sliderRightBtn();

    sliderLeftBtn();
}

// Xử lý khi click nút phải
function sliderRightBtn() {
    let rightBtn = $(".slider__btn--right");

    rightBtn.click(function() {
        let nextSlide = $(".active").next();
        if (nextSlide.length != 0) {
            $(".active").addClass("get-out-left").one("webkitAnimationEnd", function() {
                $(".get-out-left").removeClass("get-out-left").removeClass("active");
            });
            nextSlide.addClass("active").addClass("get-in-right").one("webkitAnimationEnd", function() {
                $(".get-in-right").removeClass("get-in-right");
            });
        } else {
            $(".active").addClass("get-out-left").one("webkitAnimationEnd", function() {
                $(".get-out-left").removeClass("get-out-left").removeClass("active");
            });
            $(".slider:first-child").addClass("active").addClass("get-in-right").one("webkitAnimationEnd", function() {
                $(".get-in-right").removeClass("get-in-right");
            });
        }
    });
}

// Xử lý khi click nút trái
function sliderLeftBtn() {
    let rightBtn = $(".slider__btn--left");

    rightBtn.click(function() {
        let prevSlide = $(".active").prev();
        if (prevSlide.length != 0) {
            $(".active").addClass("get-out-right").one("webkitAnimationEnd", function() {
                $(".get-out-right").removeClass("get-out-right").removeClass("active");
            });
            prevSlide.addClass("active").addClass("get-in-left").one("webkitAnimationEnd", function() {
                $(".get-in-left").removeClass("get-in-left");
            });
        } else {
            $(".active").addClass("get-out-right").one("webkitAnimationEnd", function() {
                $(".get-out-right").removeClass("get-out-right").removeClass("active");
            });
            $(".slider:last-child").addClass("active").addClass("get-in-left").one("webkitAnimationEnd", function() {
                $(".get-in-left").removeClass("get-in-left");
            });
        }
    });
}

// Xử lý slick slider phần hoạt động
function slickSlider() {
    $(".activiti__post").each(function() {
        var orderPost = $(this).index();
        $(this).css("order", orderPost)
    })

    activitiRightBtn();

    activitiLeftBtn();
}

// Xử lý khi bấm nút bên phải mục hoạt động
function activitiRightBtn() {
    $(".activiti__btn--right").click(function() {
        $('.activiti__post').addClass('slick slick--left');

        setTimeout(function() {
            $(".activiti__post").each(function() {
                let orderPost = parseInt($(this).css("order"));
                let sliderLenght = parseInt($('.activiti__post').length);
                if (orderPost > 0) {
                    $(this).css('order', orderPost - 1);
                } else {
                    orderPost = sliderLenght - 1;
                    $(this).css("order", orderPost);
                }
            });
            $('.activiti__post').removeClass('slick');
            $('.activiti__post').removeClass('slick--left slick--right');
        }, 500);
    });
}

// Xử lý khi bấm nút bên trái mục hoạt động
function activitiLeftBtn() {
    $(".activiti__btn--left").click(function() {

        $(".activiti__post").each(function() {
            let orderPost = parseInt($(this).css("order"));
            let sliderLenght = $('.activiti__post').length;
            if (orderPost == 5) {
                $(this).addClass("left-slick");

                setTimeout(function() {
                    $(".activiti__post").removeClass("left-slick");
                }, 500);
            }

        });

        $('.activiti__post').addClass('slick slick--right');

        setTimeout(function() {
            $(".activiti__post").each(function() {
                let orderPost = parseInt($(this).css("order"));
                let sliderLenght = $('.activiti__post').length;
                if (orderPost < sliderLenght - 1) {
                    $(this).css('order', orderPost + 1);
                } else {
                    orderPost = 0;
                    $(this).css("order", orderPost);
                }
            });
            $('.activiti__post').removeClass('slick');
            $('.activiti__post').removeClass('slick--left slick--right');
        }, 500);
    });
}

// Xử lý slider introduct
function slickSliderDot() {
    let mainIndex = 0;
    let slickLeft = -100;
    let marginLeft = 18;
    let listItemActive = 2;

    let slider = $(".introduct-gallery-slider-list__item");
    let lengthSlider = slider.length;

    slider.eq(mainIndex).addClass("active");
    slider.eq(mainIndex).children().addClass("active");

    // Xử lý index khi click ảnh nhỏ
    $(".introduct-gallery-slider-list__item > img").click(function() {
        mainIndex = $(this).parent().index(); //cài lại index

        $(".introduct-gallery-slider-list__item").removeClass("active"); //reset active
        $(".introduct-gallery-slider-list__item > img").removeClass("active");

        $(this).addClass("active"); //cài active
        $(this).parent().addClass("active");

        let srcSubImg = $(this).attr("src");
        //thay đổi src ảnh lớn
        $(".introduct-gallery__slider--main > img").fadeOut("fast", function() {
            $(this).attr("src", srcSubImg);
            $(this).fadeIn('fast');
        })
        slickLeft = -100 * mainIndex + 200;
        marginLeft = 18 * mainIndex - 36;
        // console.log(mainIndex);
    });

    // Xử lý index khi click nút phải
    $(".introduct__btn--right").click(function() {
        if (mainIndex === slider.length - 1) {
            mainIndex = mainIndex;
        } else {
            mainIndex++;
        }
        // console.log(mainIndex);
        if (mainIndex > 2) {
            slickLeft = -100 * mainIndex + 200;
            marginLeft = 18 * mainIndex - 36;
            let slickLeftInt = "translateX(calc(" + slickLeft.toString() + "% - " + marginLeft.toString() + "px))";
            console.log(slickLeftInt);
            $('.introduct-gallery-slider-list__item').css({ "transform": slickLeftInt, "transition": "transform 0.5s ease" });
            listItemActive++;
            console.log(mainIndex);
        }

        $(".introduct-gallery-slider-list__item").removeClass("active"); //reset active
        $(".introduct-gallery-slider-list__item > img").removeClass("active");

        slider.eq(mainIndex).addClass("active");
        slider.eq(mainIndex).children().addClass("active");

        let srcSubImg = $(slider.eq(mainIndex).children()).attr("src");

        $(".introduct-gallery__slider--main > img").fadeOut("fast", function() {
                $(this).attr("src", srcSubImg);
                $(this).fadeIn('fast');
            })
            // console.log(mainIndex);
    });

    // Xử lý index khi click nút trái
    $(".introduct__btn--left").click(function() {
        if (mainIndex === 0) {
            mainIndex = mainIndex;
        } else {
            mainIndex--;
        }
        if (mainIndex > 0) {
            if (mainIndex > 2) {
                slickLeft = -100 * mainIndex + 200;
                marginLeft = 18 * mainIndex - 36;
            } else {
                slickLeft = 0;
                marginLeft = 0;
            }

            let slickLeftInt = "translateX(calc(" + slickLeft.toString() + "% - " + marginLeft.toString() + "px";
            $('.introduct-gallery-slider-list__item').css({ "transform": slickLeftInt, "transition": "transform 0.5s ease" });
        }

        $(".introduct-gallery-slider-list__item").removeClass("active"); //reset active
        $(".introduct-gallery-slider-list__item > img").removeClass("active");

        slider.eq(mainIndex).addClass("active");
        slider.eq(mainIndex).children().addClass("active");

        let srcSubImg = $(slider.eq(mainIndex).children()).attr("src");

        $(".introduct-gallery__slider--main > img").fadeOut("fast", function() {
            $(this).attr("src", srcSubImg);
            $(this).fadeIn('fast');
        })
        console.log(mainIndex);
    })

}

// Xử lý tab phần chuyên ngành
function traningTab() {
    $(".training__info-item:first-child").css("display", "flex");

    $(".training__tab-btn").css({ "background-color": "#ffffff", "border": "1px solid #2b4eff", "color": "#2b4eff" })
    $(".training__tab-btn").each(function() {
        $(".training__tab-btn").eq(0).css({ "background-color": "#2b4eff", "border": "1px solid #2b4eff", "color": "#ffffff" });
    })

    $(".training__tab-btn").click(function() {
        $(".training__info-item").css("display", "none");

        let index = $(this).index();

        $(".training__info-item").eq(index).css("display", "flex");

        $(".training__tab-btn").css({ "background-color": "#ffffff", "border": "1px solid #2b4eff", "color": "#2b4eff" })
        $(".training__tab-btn").each(function() {
            $(".training__tab-btn").eq(index).css({ "background-color": "#2b4eff", "border": "1px solid #2b4eff", "color": "#ffffff" });
        })
    });
}

function studentSlider() {
    let index = 0;
    let dotBtn = $(".btn--dot");
    dotBtn.eq(0).addClass("active");

    dotBtn.click(function() {
        dotBtn.removeClass("active");
        $(this).addClass("active");
    })


}