$(document).ready(function() {
    validateForm();
});

function validateForm() {
    let listError = [];
    //Tên trống
    if ($(".form__input-name").val() === "") {
        listError[0] = 0;
    }
    //Ngày tháng trống
    if ($(".form__input-date").val() === "") {
        listError[1] = 1;
    }
    //Địa chỉ trống
    if ($(".form__input-andress").val() === "") {
        listError[2] = 2;
    }
    //Số điện thoại trống
    if ($(".form__input-phone").val() === "") {
        listError[3] = 3;
    }
    //Số trống
    if ($(".form__input-num").val() === "") {
        listError[4] = 4;
    }
    //Kiểm tra số tín chỉ hợp lệ
    if ($(".form__input-num").val() > 12 || $(".form__input-num").val() < 1) {
        listError[5] = 5;
    }

    let listSchedule = localStorage.getItem("listSchedule") ?
        JSON.parse(localStorage.getItem("listSchedule")) : [];
    let arrIDClass = $(".input__select-value__class").text().split('-');
    let idClass = arrIDClass[0].trim();
    let arrIDSubject = $(".input__select-value__subject").text().split('-');
    let idSubject = arrIDSubject[0].trim();
    for (let i = 0; i < listSchedule.length; i++) {
        if (idClass === listSchedule[i].idClass && idSubject === listSchedule[i].idSubject) {
            listError[6] = 6;
            break;
        }
    }

    if ($(".form__input-semester").val() > 8 || $(".form__input-num").val() < 1) {
        listError[7] = 7;
    }

    //Số trống
    if ($(".form__input-semester").val() === "") {
        listError[8] = 8;
    }
    //Điểm ko hợp lệ
    if ($(".form__input-mark1").val() > 10 || $(".form__input-mark1").val() < 0 || $(".form__input-mark2").val() > 10 || $(".form__input-mark2").val() < 0) {
        listError[9] = 9;
    }

    //Điểm tồn tại
    let listScores = localStorage.getItem("listScores") ?
        JSON.parse(localStorage.getItem("listScores")) : [];
    let arrIDStudent = $(".input__select-value__student").text().split('-');
    let idStudent = arrIDStudent[0].trim();
    let arrIDSubject1 = $(".input__select-value__subject").text().split('-');
    let idSubject1 = arrIDSubject1[0].trim();
    for (let i = 0; i < listScores.length; i++) {
        if (idStudent === listScores[i].idStudent && idSubject1 === listScores[i].idSubject) {
            listError[10] = 10;
            break;
        }
    }

    return listError;
}