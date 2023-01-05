$(document).ready(function() {
    let modal = $(".manager__modal");
    let modalContent = $(".manager__modal-content");
    let alert = $(".manager__alert");
    let alertContent = $(".manager__alert-content");
    let addBtn = $(".add__btn");
    let closeBtn = $(".manager__modal-close");
    let submitBtn = $(".btn--submit");
    renderScores();

    renderSelectStudent();

    renderSelectSubject();

    tooltip();

    selectInput();

    // Mở modal thêm
    addBtn.click(function() {
        resetModal();
        $(".manager__modal-title > h5").html("Nhập thông tin môn học");
        modal.addClass("active");
        modalContent.addClass("scale-up-center");
        $(".btn--submit").css("display", "inline-block");
        $(".btn--update").css("display", "none");
    })

    // Đóng modal
    closeBtn.click(function() {
        modalContent.removeClass("scale-up-center").addClass("scale-down-center");
        setTimeout(function() {
            modal.removeClass("active");
            modalContent.removeClass("scale-down-center");
        }, 400);

        alertContent.removeClass("scale-up-center").addClass("scale-down-center");
        setTimeout(function() {
            alert.removeClass("active");
            alertContent.removeClass("scale-down-center");
        }, 400);
    })

    // Đóng alert
    let skipBtn = $(".btn__skip");
    skipBtn.click(function() {
        alertContent.removeClass("scale-up-center").addClass("scale-down-center");
        setTimeout(function() {
            alert.removeClass("active");
            alertContent.removeClass("scale-down-center");
        }, 400);
    })

    // Xác nhận thêm
    submitBtn.click(function() {
        console.log(validateForm());
        if (validateForm().length === 0) {
            addScores();;
        } else {
            for (let i = 0; i < validateForm().length; i++) {

                if (validateForm()[10] === 10) {
                    $(".manager__modal-alert__item.alert--danger__case10").addClass("active open");
                    $(".form__input-student").addClass("form__input--error");
                    $(".form__input-subject").addClass("form__input--error");
                    $(".input__option").click(function() {
                        if (validateForm()[10] !== 10) {
                            $(".form__input-class").removeClass("form__input--error");
                            $(".form__input-subject").removeClass("form__input--error");
                            $(".manager__modal-alert__item.alert--danger__case10").addClass("close");
                            setTimeout(function() {
                                $(".manager__modal-alert__item.alert--danger__case10").removeClass("active open close");
                            }, 1000);
                        }
                    });
                }

                if (validateForm()[8] === 8) {
                    $(".manager__modal-alert__item.alert--danger__case08").addClass("active open");
                    $(".form__input-mark1").addClass("form__input--error");
                    $(".form__input-mark1").focusout(function() {
                        if (validateForm()[8] !== 8) {
                            $(".form__input-mark1").removeClass("form__input--error");
                            $(".manager__modal-alert__item.alert--danger__case08").addClass("close");
                            setTimeout(function() {
                                $(".manager__modal-alert__item.alert--danger__case08").removeClass("active open close");
                            }, 1000);
                        }
                    });
                } else if (validateForm()[9] === 9) {
                    $(".manager__modal-alert__item.alert--danger__case09").addClass("close");
                    setTimeout(function() {
                        $(".manager__modal-alert__item.alert--danger__case09").removeClass("active open close");
                    }, 1000)
                    $(".manager__modal-alert__item.alert--danger__case09").addClass("active open");
                    $(".form__input-mark1").addClass("form__input--error");
                    $(".form__input-mark1").focusout(function() {
                        if (validateForm()[9] !== 9) {
                            $(".form__input-mark1").removeClass("form__input--error");
                            $(".manager__modal-alert__item.alert--danger__case09").addClass("close");
                            setTimeout(function() {
                                $(".manager__modal-alert__item.alert--danger__case09").removeClass("active open close");
                            }, 1000);
                        }
                    });
                }
            }
        }
    })
});

//Lấy danh sách sinh viên
function renderSelectStudent() {
    let listStudent = localStorage.getItem("listStudent") ?
        JSON.parse(localStorage.getItem("listStudent")) : [];
    let student = ``
    for (let i = 0; i < listStudent.length; i++) {
        if (listStudent[i].status === "Hoạt động") {
            let content = listStudent[i].id + " - " + listStudent[i].name;
            student += `<div class="input__option"><span>${content}</span></div>`
        }
    }
    $(".input__list-option.student__select").html(student);
}

//Lấy danh sách môn học
function renderSelectSubject() {
    let listSubject = localStorage.getItem("listSubject") ?
        JSON.parse(localStorage.getItem("listSubject")) : [];
    let subject = ``
    for (let i = 0; i < listSubject.length; i++) {
        let content = listSubject[i].id + " - " + listSubject[i].name;
        subject += `<div class="input__option"><span>${content}</span></div>`
    }
    $(".input__list-option.subject__select").html(subject);
}

//Reset modal
function resetModal() {
    $(".input__select-class").removeClass("disabled");
    $(".input__select-subject").removeClass("disabled");
    $(".form__input-class").removeClass("form__input-disable");
    $(".input__select-value__class").removeClass("form__input-disable");
    $(".form__input-subject").removeClass("form__input-disable");
    $(".input__select-value__subject").removeClass("form__input-disable");
    $(".manager__modal-alert__item").removeClass("active open");
    $(".form__input-name").removeClass("form__input--error");
    $(".form__input-class").removeClass("form__input--error");
    $(".form__input-teacher").removeClass("form__input--error");
    $(".form__input-date").removeClass("form__input--error");
    $(".form__input-date").removeClass("form__input--error");
    $(".form__input-andress").removeClass("form__input--error");
    $(".form__input-student").removeClass("form__input--error");
    $(".form__input-subject").removeClass("form__input--error");
    $(".form__input-phone").removeClass("form__input--error");
    $(".form__input-semester").removeClass("form__input--error");
    $(".form__input-semester").val("");
    $(".form__input-name").val("");
    $(".form__input-mark1").val("");
    $(".form__input-mark2").val("");
    $(".form__input-date").val("");
    $(".form__input-select.select__normal").html($(".list-option__normal").children().html());
    $(".form__input-andress").val("");
    $(".form__input-phone").val("");
    $(".input__select-value__class").html($(".class__select").children().html());
    $(".input__select-value__teacher").html($(".teacher__select").children().html());
    $(".input__select-value__subject").html($(".subject__select").children().html());
    $(".input__select-value__status").html($(".list-option__status").children().html());
    $(".input__select-value__student").html($(".student__select").children().html());
}

//Thêm
function addScores() {
    let listScores = localStorage.getItem("listScores") ?
        JSON.parse(localStorage.getItem("listScores")) : [];
    let arrIDStudent = $(".input__select-value__student").text().split('-');
    let idStudent = arrIDStudent[0].trim();
    let arrIDSubject = $(".input__select-value__subject").text().split('-');
    let idSubject = arrIDSubject[0].trim();
    let mark1 = $(".form__input-mark1").val();
    let mark2 = $(".form__input-mark2").val();
    listScores.push({
        idStudent: idStudent,
        idSubject: idSubject,
        mark1: mark1,
        mark2: mark2,
    });
    let modal = $(".manager__modal");
    let modalContent = $(".manager__modal-content");
    modalContent.removeClass("scale-up-center").addClass("scale-down-center");
    setTimeout(function() {
        modal.removeClass("active");
        modalContent.removeClass("scale-down-center");
    }, 400);
    localStorage.setItem("listScores", JSON.stringify(listScores));
    renderScores();
}

//Thông tin sinh viên
function infoStudent(id) {
    let listStudent = localStorage.getItem("listStudent") ?
        JSON.parse(localStorage.getItem("listStudent")) : [];
    for (let i = 0; i < listStudent.length; i++) {
        if (listStudent[i].id == id) {
            return listStudent[i].id + " - " + listStudent[i].name;
        }
    }
}

//Thông tin môn học
function infoSubject(id) {
    let listSubject = localStorage.getItem("listSubject") ?
        JSON.parse(localStorage.getItem("listSubject")) : [];
    for (let i = 0; i < listSubject.length; i++) {
        if (listSubject[i].id == id) {
            return listSubject[i].id + " - " + listSubject[i].name;
        }
    }
}

//Load thông tin đối tượng lên modal
function loadModal(index) {
    let listScores = localStorage.getItem("listScores") ?
        JSON.parse(localStorage.getItem("listScores")) : [];
    console.log(listScores[index]);
    $(".input__select-value__student").html(infoStudent(listScores[index].idStudent));
    $(".input__select-value__subject").html(infoSubject(listScores[index].idSubject));
    $(".form__input-mark1").val(listScores[index].mark1);
    $(".form__input-mark2").val(listScores[index].mark2);
}

//Mở modal sửa
function editObj(index) {
    resetModal();
    $(".get-index").val(index);
    $(".manager__modal").addClass("active");
    $(".manager__modal-content").addClass("scale-up-center");
    $(".manager__modal-title > h5").html("Cập nhật thông tin điểm số");
    $(".btn--submit").css("display", "none");
    $(".btn--update").css("display", "inline-block");
    loadModal(index);
    $(".form__input-student").addClass("form__input-disable");
    $(".input__select-value__student").addClass("form__input-disable");
    $(".form__input-subject").addClass("form__input-disable");
    $(".input__select-value__subject").addClass("form__input-disable");
    $(".input__select-student").addClass("disabled");
    $(".input__select-subject").addClass("disabled");
}

function editScores() {
    if (validateForm()[10] === 10) {
        let listScores = localStorage.getItem("listScores") ?
            JSON.parse(localStorage.getItem("listScores")) : [];
        let arrIDStudent = $(".input__select-value__student").text().split('-');
        let idStudent = arrIDStudent[0].trim();
        let arrIDSubject = $(".input__select-value__subject").text().split('-');
        let idSubject = arrIDSubject[0].trim();
        let mark1 = $(".form__input-mark1").val();
        let mark2 = $(".form__input-mark2").val();
        let index = $(".get-index").val();
        listScores[index] = {
            idStudent: idStudent,
            idSubject: idSubject,
            mark1: mark1,
            mark2: mark2,
        }
        localStorage.setItem("listScores", JSON.stringify(listScores));
        renderScores();
        let modal = $(".manager__modal");
        let modalContent = $(".manager__modal-content");
        modalContent.removeClass("scale-up-center").addClass("scale-down-center");
        setTimeout(function() {
            modal.removeClass("active");
            modalContent.removeClass("scale-down-center");
        }, 400);
    } else {
        for (let i = 0; i < validateForm().length; i++) {
            if (validateForm()[8] === 8) {
                $(".manager__modal-alert__item.alert--danger__case08").addClass("active open");
                $(".form__input-mark1").addClass("form__input--error");
                $(".form__input-mark1").focusout(function() {
                    if (validateForm()[8] !== 8) {
                        $(".form__input-mark1").removeClass("form__input--error");
                        $(".manager__modal-alert__item.alert--danger__case08").addClass("close");
                        setTimeout(function() {
                            $(".manager__modal-alert__item.alert--danger__case08").removeClass("active open close");
                        }, 1000);
                    }
                });
            } else if (validateForm()[9] === 9) {
                $(".manager__modal-alert__item.alert--danger__case09").addClass("close");
                setTimeout(function() {
                    $(".manager__modal-alert__item.alert--danger__case09").removeClass("active open close");
                }, 1000)
                $(".manager__modal-alert__item.alert--danger__case09").addClass("active open");
                $(".form__input-mark1").addClass("form__input--error");
                $(".form__input-mark1").focusout(function() {
                    if (validateForm()[9] !== 9) {
                        $(".form__input-mark1").removeClass("form__input--error");
                        $(".manager__modal-alert__item.alert--danger__case09").addClass("close");
                        setTimeout(function() {
                            $(".manager__modal-alert__item.alert--danger__case09").removeClass("active open close");
                        }, 1000);
                    }
                });
            }
        }
    }
}

//DELETE
function deleteObj(index) {
    $(".get-index").val(index);
    let modal = $(".manager__alert");
    let modalContent = $(".manager__alert-content");
    let deleteBtn = $(".table__icon-delete");
    $(".manager__modal-title > h5").html("Xóa thông tin lịch học");
    modal.addClass("active");
    modalContent.addClass("scale-up-center");
    let listScores = localStorage.getItem("listScores") ?
        JSON.parse(localStorage.getItem("listScores")) : [];
    let idObj = listScores[index].idStudent;
    let idObj1 = listScores[index].idSubject;
    $(".get-id-del").html(idObj);
    $(".get-id-del1").html(idObj1);
}

function deleteSubject() {
    let listScores = localStorage.getItem("listScores") ?
        JSON.parse(localStorage.getItem("listScores")) : [];
    let index = $(".get-index").val();
    listScores.splice(index, 1);
    localStorage.setItem("listScores", JSON.stringify(listScores));
    renderScores();
    let alert = $(".manager__alert");
    let alertContent = $(".manager__alert-content");
    alertContent.removeClass("scale-up-center").addClass("scale-down-center");
    setTimeout(function() {
        alert.removeClass("active");
        alertContent.removeClass("scale-down-center");
    }, 400);
}

//Hiển thị chi tiết đối tượng
function displayObj(index) {
    $(".get-index").val(index);
    $(".manager__modal").addClass("active");
    $(".manager__modal-content").addClass("scale-up-center");
    $(".manager__modal-title > h5").html("Hiển thị thông tin điểm số");
    $(".btn--submit").css("display", "none");
    $(".btn--update").css("display", "none");
    loadModal(index);
}

// Khác
function tooltip() {
    $(".table__icon").click(function() {
        $(this).siblings().toggle();

    })
}

function selectInput() {
    let inputSelect = $(".input__select");
    let inputListOption = $(".input__list-option");
    let inputOption = $(".input__option");


    $(inputSelect).click(function(e) {
        e.preventDefault();
        $(this).children(".input__list-option").toggle();
    });

    $(inputOption).click(function(e) {
        e.preventDefault();
        $(this).parents(".input__list-option").siblings(".input__select-value").html($(this).children().html());
    });
}


//Hiển thị điểm
function nameStudent(id) {
    let listStudent = localStorage.getItem("listStudent") ?
        JSON.parse(localStorage.getItem("listStudent")) : [];
    for (let i = 0; i < listStudent.length; i++) {
        if (listStudent[i].id == id) {
            return listStudent[i].name;
        }
    }
}

function nameSubject(id) {
    let listSubject = localStorage.getItem("listSubject") ?
        JSON.parse(localStorage.getItem("listSubject")) : [];
    for (let i = 0; i < listSubject.length; i++) {
        if (listSubject[i].id == id) {
            return listSubject[i].name;
        }
    }
}


function renderScores() {
    let listScores = localStorage.getItem("listScores") ?
        JSON.parse(localStorage.getItem("listScores")) : [];

    let scores = `<thead>
    <tr class="table__data-tr">
        <th class="table__data-th obj__id" rowspan="1" colspan="1">Sinh viên</th>
        <th class="table__data-th obj__name" rowspan="1" colspan="1">Môn học</th>
        <th class="table__data-th obj__des" rowspan="1" colspan="1">Điểm QT</th>
        <th class="table__data-th obj__des" rowspan="1" colspan="1">Điểm KTHP</th>
        <th class="table__data-th obj__des" rowspan="1" colspan="1">Thao tác</th>
    </tr>
</thead>`

    for (let i = 0; i < listScores.length; i++) {
        scores += `<tbody>
        <tr class="table__data-tr">
            <td class="table__data-td ">${nameStudent(listScores[i].idStudent)}</td>
            <td class="table__data-td">${nameSubject(listScores[i].idSubject)}</td>
            <td class="table__data-td">${listScores[i].mark1}</td>
            <td class="table__data-td">${listScores[i].mark2}</td>
            <td class="table__data-td">
                <a class="edit__btn" href="#" onclick="editObj(${i})"><i class="table__icon table__icon-edit fas fa-pen"></i></a>
                <a class="delete__btn" href="#" onclick="deleteObj(${i})"><i class="table__icon table__icon-delete fas fa-trash"></i></a>
                <a class="display__btn" href="#" onclick="displayObj(${i})"><i class="table__icon table__icon-display fas fa-user"></i></a>
            </td>
        </tr>
    </tbody>`
    }
    $(".table").html(scores);
}