$(document).ready(function() {
    let modal = $(".manager__modal");
    let modalContent = $(".manager__modal-content");
    let alert = $(".manager__alert");
    let alertContent = $(".manager__alert-content");
    let addBtn = $(".add__btn");
    let closeBtn = $(".manager__modal-close");
    let submitBtn = $(".btn--submit");

    renderSchedule();

    renderSelectClass();

    renderSelectSubject();

    renderSelectTeacher();

    tooltip();

    selectInput();

    //Mở modal thêm
    addBtn.click(function() {
        resetModal();
        $(".manager__modal-title > h5").html("Nhập thông tin môn học");
        modal.addClass("active");
        modalContent.addClass("scale-up-center");
        $(".btn--submit").css("display", "inline-block");
        $(".btn--update").css("display", "none");
    })

    //Đóng modal
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

    //Đóng alert
    let skipBtn = $(".btn__skip");
    skipBtn.click(function() {
        alertContent.removeClass("scale-up-center").addClass("scale-down-center");
        setTimeout(function() {
            alert.removeClass("active");
            alertContent.removeClass("scale-down-center");
        }, 400);
    })

    //Xác nhận thêm
    submitBtn.click(function() {
        console.log(validateForm());
        if (validateForm().length === 0) {
            addSchedule();
        } else {
            for (let i = 0; i < validateForm().length; i++) {


                if (validateForm()[8] === 8) {
                    $(".manager__modal-alert__item.alert--danger__case08").addClass("active open");
                    $(".form__input-semester").addClass("form__input--error");
                    $(".form__input-semester").focusout(function() {
                        if (validateForm()[8] !== 8) {
                            $(".form__input-semester").removeClass("form__input--error");
                            $(".manager__modal-alert__item.alert--danger__case08").addClass("close");
                            setTimeout(function() {
                                $(".manager__modal-alert__item.alert--danger__case08").removeClass("active open close");
                            }, 1000);
                        }
                    });
                } else if (validateForm()[7] === 7) {
                    $(".manager__modal-alert__item.alert--danger__case08").addClass("close");
                    setTimeout(function() {
                        $(".manager__modal-alert__item.alert--danger__case08").removeClass("active open close");
                    }, 1000)
                    $(".manager__modal-alert__item.alert--danger__case07").addClass("active open");
                    $(".form__input-semester").addClass("form__input--error");
                    $(".form__input-semester").focusout(function() {
                        if (validateForm()[7] !== 7) {
                            $(".form__input-semester").removeClass("form__input--error");
                            $(".manager__modal-alert__item.alert--danger__case07").addClass("close");
                            setTimeout(function() {
                                $(".manager__modal-alert__item.alert--danger__case07").removeClass("active open close");
                            }, 1000);
                        }
                    });
                }

                if (validateForm()[6] === 6) {
                    $(".manager__modal-alert__item.alert--danger__case06").addClass("active open");
                    $(".form__input-class").addClass("form__input--error");
                    $(".form__input-subject").addClass("form__input--error");
                    $(".input__option").click(function() {
                        if (validateForm()[6] !== 6) {
                            $(".form__input-class").removeClass("form__input--error");
                            $(".form__input-subject").removeClass("form__input--error");
                            $(".manager__modal-alert__item.alert--danger__case06").addClass("close");
                            setTimeout(function() {
                                $(".manager__modal-alert__item.alert--danger__case06").removeClass("active open close");
                            }, 1000);
                        }
                    });
                }
            }
        }
    })
});

//Lấy danh sách lớp
function renderSelectClass() {
    let listClass = localStorage.getItem("listClass") ?
        JSON.parse(localStorage.getItem("listClass")) : [];
    let traning = ``
    for (let i = 0; i < listClass.length; i++) {
        let content = listClass[i].id + " - " + listClass[i].name;
        traning += `<div class="input__option"><span>${content}</span></div>`
    }
    $(".input__list-option.class__select").html(traning);
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

//Lấy danh sách giáo viên
function renderSelectTeacher() {
    let listTeacher = localStorage.getItem("listTeacher") ?
        JSON.parse(localStorage.getItem("listTeacher")) : [];
    let teacher = ``
    for (let i = 0; i < listTeacher.length; i++) {
        if (listTeacher[i].status === "Hoạt động") {
            let content = listTeacher[i].id + " - " + listTeacher[i].name;
            teacher += `<div class="input__option"><span>${content}</span></div>`
        }
    }
    $(".input__list-option.teacher__select").html(teacher);
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
    $(".form__input-phone").removeClass("form__input--error");
    $(".form__input-semester").removeClass("form__input--error");
    $(".form__input-semester").val("");
    $(".form__input-name").val("");
    $(".form__input-date").val("");
    $(".form__input-select.select__normal").html($(".list-option__normal").children().html());
    $(".form__input-andress").val("");
    $(".form__input-phone").val("");
    $(".input__select-value__class").html($(".class__select").children().html());
    $(".input__select-value__teacher").html($(".teacher__select").children().html());
    $(".input__select-value__subject").html($(".subject__select").children().html());
    $(".input__select-value__status").html($(".list-option__status").children().html());
}

//Thêm
function addSchedule() {
    let listSchedule = localStorage.getItem("listSchedule") ?
        JSON.parse(localStorage.getItem("listSchedule")) : [];
    let arrIDClass = $(".input__select-value__class").text().split('-');
    let idClass = arrIDClass[0].trim();
    let arrIDSubject = $(".input__select-value__subject").text().split('-');
    let idSubject = arrIDSubject[0].trim();
    let semester = $(".form__input-semester").val();
    let arrIDTeacher = $(".input__select-value__teacher").text().split('-');
    let idTeacher = arrIDTeacher[0].trim();
    listSchedule.push({
        idClass: idClass,
        idSubject: idSubject,
        semester: semester,
        idTeacher: idTeacher,
    });
    let modal = $(".manager__modal");
    let modalContent = $(".manager__modal-content");
    modalContent.removeClass("scale-up-center").addClass("scale-down-center");
    setTimeout(function() {
        modal.removeClass("active");
        modalContent.removeClass("scale-down-center");
    }, 400);
    localStorage.setItem("listSchedule", JSON.stringify(listSchedule));
    renderSchedule();
}

//Thông tin lớp
function infoClass(id) {
    let listClass = localStorage.getItem("listClass") ?
        JSON.parse(localStorage.getItem("listClass")) : [];
    for (let i = 0; i < listClass.length; i++) {
        if (listClass[i].id == id) {
            return listClass[i].id + " - " + listClass[i].name;
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

//Thông tin giáo viên
function infoTeacher(id) {
    let listTeacher = localStorage.getItem("listTeacher") ?
        JSON.parse(localStorage.getItem("listTeacher")) : [];
    for (let i = 0; i < listTeacher.length; i++) {
        if (listTeacher[i].id == id) {
            return listTeacher[i].id + " - " + listTeacher[i].name;
        }
    }
}

//Load thông tin đối tượng lên modal
function loadModal(index) {
    let listSchedule = localStorage.getItem("listSchedule") ?
        JSON.parse(localStorage.getItem("listSchedule")) : [];
    $(".input__select-value__class").text(infoClass(listSchedule[index].idClass));
    $(".input__select-value__teacher").text(infoTeacher(listSchedule[index].idTeacher));
    $(".input__select-value__subject").text(infoSubject(listSchedule[index].idSubject));
    $(".form__input-semester").val(listSchedule[index].semester);
}

//Mở modal sửa
function editObj(index) {
    resetModal();
    $(".get-index").val(index);
    $(".manager__modal").addClass("active");
    $(".manager__modal-content").addClass("scale-up-center");
    $(".manager__modal-title > h5").html("Cập nhật thông tin lịch học");
    $(".btn--submit").css("display", "none");
    $(".btn--update").css("display", "inline-block");
    loadModal(index);
    $(".form__input-class").addClass("form__input-disable");
    $(".input__select-value__class").addClass("form__input-disable");
    $(".form__input-subject").addClass("form__input-disable");
    $(".input__select-value__subject").addClass("form__input-disable");
    $(".input__select-value__subject").addClass("form__input-disable");
    $(".input__select-class").addClass("disabled");
    $(".input__select-subject").addClass("disabled");
}

//Sửa
function editSchedule() {
    if (validateForm()[6] === 6) {
        let index = $(".get-index").val();
        let listSchedule = localStorage.getItem("listSchedule") ?
            JSON.parse(localStorage.getItem("listSchedule")) : [];
        let arrIDClass = $(".input__select-value__class").text().split('-');
        let idClass = arrIDClass[0].trim();
        let arrIDSubject = $(".input__select-value__subject").text().split('-');
        let idSubject = arrIDSubject[0].trim();
        let semester = $(".form__input-semester").val();
        let arrIDTeacher = $(".input__select-value__teacher").text().split('-');
        let idTeacher = arrIDTeacher[0].trim();
        listSchedule[index] = {
            idClass: idClass,
            idSubject: idSubject,
            semester: semester,
            idTeacher: idTeacher,
        }
        localStorage.setItem("listSchedule", JSON.stringify(listSchedule));
        renderSchedule();
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
                $(".form__input-semester").addClass("form__input--error");
                $(".form__input-semester").focusout(function() {
                    if (validateForm()[8] !== 8) {
                        $(".form__input-semester").removeClass("form__input--error");
                        $(".manager__modal-alert__item.alert--danger__case08").addClass("close");
                        setTimeout(function() {
                            $(".manager__modal-alert__item.alert--danger__case08").removeClass("active open close");
                        }, 1000);
                    }
                });
            } else if (validateForm()[7] === 7) {
                $(".manager__modal-alert__item.alert--danger__case08").addClass("close");
                setTimeout(function() {
                    $(".manager__modal-alert__item.alert--danger__case08").removeClass("active open close");
                }, 1000)
                $(".manager__modal-alert__item.alert--danger__case07").addClass("active open");
                $(".form__input-semester").addClass("form__input--error");
                $(".form__input-semester").focusout(function() {
                    if (validateForm()[7] !== 7) {
                        $(".form__input-semester").removeClass("form__input--error");
                        $(".manager__modal-alert__item.alert--danger__case07").addClass("close");
                        setTimeout(function() {
                            $(".manager__modal-alert__item.alert--danger__case07").removeClass("active open close");
                        }, 1000);
                    }
                });
            }
        }
    }
}

//Mở alert
function deleteObj(index) {
    $(".get-index").val(index);
    let modal = $(".manager__alert");
    let modalContent = $(".manager__alert-content");
    $(".manager__modal-title > h5").html("Xóa thông tin lịch học");
    modal.addClass("active");
    modalContent.addClass("scale-up-center");
    let listSchedule = localStorage.getItem("listSchedule") ?
        JSON.parse(localStorage.getItem("listSchedule")) : [];
    let idObj = listSchedule[index].idClass;
    let idObj1 = listSchedule[index].idSubject;
    $(".get-id-del").html(idObj);
    $(".get-id-del1").html(idObj1);
}

//Xóa
function deleteSubject() {
    let listSchedule = localStorage.getItem("listSchedule") ?
        JSON.parse(localStorage.getItem("listSchedule")) : [];
    let index = $(".get-index").val();
    listSchedule.splice(index, 1);
    localStorage.setItem("listSchedule", JSON.stringify(listSchedule));
    renderSchedule();
    let alert = $(".manager__alert");
    let alertContent = $(".manager__alert-content");
    alertContent.removeClass("scale-up-center").addClass("scale-down-center");
    setTimeout(function() {
        alert.removeClass("active");
        alertContent.removeClass("scale-down-center");
    }, 400);
}

//Mở modal chi tiết
function displayObj(index) {
    $(".get-index").val(index);
    $(".manager__modal").addClass("active");
    $(".manager__modal-content").addClass("scale-up-center");
    $(".manager__modal-title > h5").html("Hiển thị thông tin môn học");
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

//Tên lớp
function nameClass(id) {
    let listClass = localStorage.getItem("listClass") ?
        JSON.parse(localStorage.getItem("listClass")) : [];
    for (let i = 0; i < listClass.length; i++) {
        if (listClass[i].id == id) {
            return listClass[i].name;
        }
    }
}

//Tên môn
function nameSubject(id) {
    let listSubject = localStorage.getItem("listSubject") ?
        JSON.parse(localStorage.getItem("listSubject")) : [];
    for (let i = 0; i < listSubject.length; i++) {
        if (listSubject[i].id == id) {
            return listSubject[i].name;
        }
    }
}

//Tên giáo viên
function nameTeacher(id) {
    let listTeacher = localStorage.getItem("listTeacher") ?
        JSON.parse(localStorage.getItem("listTeacher")) : [];
    for (let i = 0; i < listTeacher.length; i++) {
        if (listTeacher[i].id == id) {
            return listTeacher[i].name;
        }
    }
}

//Hiển thị danh sách 
function renderSchedule() {
    let listSchedule = localStorage.getItem("listSchedule") ?
        JSON.parse(localStorage.getItem("listSchedule")) : [];

    let schedule = `<thead>
    <tr class="table__data-tr">
        <th class="table__data-th obj__id" rowspan="1" colspan="1">Lớp học</th>
        <th class="table__data-th obj__name" rowspan="1" colspan="1">Môn học</th>
        <th class="table__data-th obj__des" rowspan="1" colspan="1">Kỳ học</th>
        <th class="table__data-th obj__des" rowspan="1" colspan="1">Giáo viên</th>
        <th class="table__data-th obj__des" rowspan="1" colspan="1">Thao tác</th>
    </tr>
</thead>`

    for (let i = 0; i < listSchedule.length; i++) {
        schedule += `<tbody>
        <tr class="table__data-tr">
            <td class="table__data-td ">${nameClass(listSchedule[i].idClass)}</td>
            <td class="table__data-td">${nameSubject(listSchedule[i].idSubject)}</td>
            <td class="table__data-td">${listSchedule[i].semester}</td>
            <td class="table__data-td">${nameTeacher(listSchedule[i].idTeacher)}</td>
            <td class="table__data-td">
                <a class="edit__btn" href="#" onclick="editObj(${i})"><i class="table__icon table__icon-edit fas fa-pen"></i></a>
                <a class="delete__btn" href="#" onclick="deleteObj(${i})"><i class="table__icon table__icon-delete fas fa-trash"></i></a>
                <a class="display__btn" href="#" onclick="displayObj(${i})"><i class="table__icon table__icon-display fas fa-user"></i></a>
            </td>
        </tr>
    </tbody>`
    }
    $(".table").html(schedule);
}