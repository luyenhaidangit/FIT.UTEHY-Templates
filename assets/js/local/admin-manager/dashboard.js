$(document).ready(function() {
    let listTraining = localStorage.getItem("listTraining") ?
        JSON.parse(localStorage.getItem("listTraining")) : [];

    let listStudent = localStorage.getItem("listStudent") ?
        JSON.parse(localStorage.getItem("listStudent")) : [];

    let listTeacher = localStorage.getItem("listTeacher") ?
        JSON.parse(localStorage.getItem("listTeacher")) : [];

    $("#numberClass").text(listTraining.length);
    $("#numberStudent").text(listStudent.length);
    $("#numberTeacher").text(listTeacher.length);
});