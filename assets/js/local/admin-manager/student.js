$(document).ready(function() {
    let modal = $(".manager__modal");
    let modalContent = $(".manager__modal-content");
    let alert = $(".manager__alert");
    let alertContent = $(".manager__alert-content");
    let addBtn = $(".add__btn");
    let closeBtn = $(".manager__modal-close");
    let submitBtn = $(".btn--submit");

    renderSelectClass();

    renderStudent();

    tooltip();

    selectInput();

    //Mở modal thêm
    addBtn.click(function() {
        resetModal();
        $(".manager__modal-title > h5").html("Nhập thông tin sinh viên");
        modal.addClass("active");
        modalContent.addClass("scale-up-center");
        $(".btn--submit").css("display", "inline-block");
        $(".btn--update").css("display", "none");
        $(".form__input-id").attr("placeholder", generateID());
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
        if (validateForm().length === 0) {
            addStudent();
        } else {
            for (let i = 0; i < validateForm().length; i++) {
                if (validateForm()[0] === 0) {
                    $(".manager__modal-alert__item.alert--danger__case00").addClass("active open");
                    $(".form__input-name").addClass("form__input--error");
                    $(".form__input-name").focusout(function() {
                        if (validateForm()[0] !== 0) {
                            $(".form__input-name").removeClass("form__input--error");
                            $(".manager__modal-alert__item.alert--danger__case00").addClass("close");
                            setTimeout(function() {
                                $(".manager__modal-alert__item.alert--danger__case00").removeClass("active open close");
                            }, 1000);
                        }
                    });
                }

                if (validateForm()[1] === 1) {
                    $(".manager__modal-alert__item.alert--danger__case01").addClass("active open");
                    $(".form__input-date").addClass("form__input--error");
                    $(".form__input-date").focusout(function() {
                        if (validateForm()[1] !== 1) {
                            $(".form__input-date").removeClass("form__input--error");
                            $(".manager__modal-alert__item.alert--danger__case01").addClass("close");
                            setTimeout(function() {
                                $(".manager__modal-alert__item.alert--danger__case01").removeClass("active open close");
                            }, 1000);
                        }
                    });
                }

                if (validateForm()[2] === 2) {
                    $(".manager__modal-alert__item.alert--danger__case02").addClass("active open");
                    $(".form__input-andress").addClass("form__input--error");
                    $(".form__input-andress").focusout(function() {
                        if (validateForm()[2] !== 2) {
                            $(".form__input-andress").removeClass("form__input--error");
                            $(".manager__modal-alert__item.alert--danger__case02").addClass("close");
                            setTimeout(function() {
                                $(".manager__modal-alert__item.alert--danger__case02").removeClass("active open close");
                            }, 1000);
                        }
                    });
                }

                if (validateForm()[3] === 3) {
                    $(".manager__modal-alert__item.alert--danger__case03").addClass("active open");
                    $(".form__input-phone").addClass("form__input--error");
                    $(".form__input-phone").focusout(function() {
                        if (validateForm()[3] !== 3) {
                            $(".form__input-phone").removeClass("form__input--error");
                            $(".manager__modal-alert__item.alert--danger__case03").addClass("close");
                            setTimeout(function() {
                                $(".manager__modal-alert__item.alert--danger__case03").removeClass("active open close");
                            }, 1000);
                        }
                    });
                }
            }
        }
    })
});

//Reset modal
function resetModal() {
    $(".manager__modal-alert__item").removeClass("active open");
    $(".form__input-name").removeClass("form__input--error");
    $(".form__input-date").removeClass("form__input--error");
    $(".form__input-andress").removeClass("form__input--error");
    $(".form__input-phone").removeClass("form__input--error");
    $(".form__input-name").val("");
    $(".form__input-date").val("");
    $(".form__input-select.select__normal").html($(".list-option__normal").children().html());
    $(".form__input-andress").val("");
    $(".form__input-phone").val("");
    $(".input__select-value__class").html($(".class__select").children().html());
    $(".input__select-value__status").html($(".list-option__status").children().html());
}

//Mã sinh tự động
function generateID() {
    let listStudent = localStorage.getItem("listStudent") ?
        JSON.parse(localStorage.getItem("listStudent")) : [];
    let listid = [];
    for (let i = 0; i < listStudent.length; i++) {
        listid.push(listStudent[i].id);
    }
    let autoID = listid.length > 0 ? Math.max(...listid) + 1 : 12520063;
    return autoID;
}

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

//Thêm
function addStudent() {
    let listStudent = localStorage.getItem("listStudent") ?
        JSON.parse(localStorage.getItem("listStudent")) : [];
    let id = generateID();
    let name = $(".form__input-name").val();
    let birth = $(".form__input-date").val();
    let sex = $(".input__select-value__sex").text();
    let andress = $(".form__input-andress").val();
    let status = $(".input__select-value__status").text();
    let phone = $(".form__input-phone").val();
    arrIDClass = $(".input__select-value__class").text().split('-');
    let idClass = arrIDClass[0].trim();
    listStudent.push({
        id: id,
        name: name,
        birth: birth,
        sex: sex,
        andress: andress,
        idClass: idClass,
        phone: phone,
        status: status,
    });
    let modal = $(".manager__modal");
    let modalContent = $(".manager__modal-content");
    modalContent.removeClass("scale-up-center").addClass("scale-down-center");
    setTimeout(function() {
        modal.removeClass("active");
        modalContent.removeClass("scale-down-center");
    }, 400);
    localStorage.setItem("listStudent", JSON.stringify(listStudent));
    renderStudent();
}

//Thông tin lớp học
function infoClass(id) {
    let listClass = localStorage.getItem("listClass") ?
        JSON.parse(localStorage.getItem("listClass")) : [];
    for (let i = 0; i < listClass.length; i++) {
        if (listClass[i].id == id) {
            return listClass[i].id + " - " + listClass[i].name;
        }
    }
}

//Load thông tin đối tượng lên modal
function loadModal(index) {
    let listStudent = localStorage.getItem("listStudent") ?
        JSON.parse(localStorage.getItem("listStudent")) : [];
    $(".form__input-id").attr("placeholder", listStudent[index].id);
    $(".form__input-name").val(listStudent[index].name);
    $(".form__input-date").val(listStudent[index].birth);
    $(".input__select-value__sex").text(listStudent[index].sex);
    $(".form__input-andress").val(listStudent[index].andress);
    $(".input__select-value__class").text(infoClass(listStudent[index].idClass));
    $(".form__input-phone").val(listStudent[index].phone);
    $(".input__select-value__status").text(listStudent[index].status);
}

//Mở modal sửa
function editObj(index) {
    resetModal();
    $(".get-index").val(index);
    $(".manager__modal").addClass("active");
    $(".manager__modal-content").addClass("scale-up-center");
    $(".manager__modal-title > h5").html("Cập nhật thông tin sinh viên");
    $(".btn--submit").css("display", "none");
    $(".btn--update").css("display", "inline-block");
    loadModal(index);
}

//Sửa
function editStudent() {
    if (validateForm().length === 0) {
        let listClass = localStorage.getItem("listClass") ?
            JSON.parse(localStorage.getItem("listClass")) : [];
        let listStudent = localStorage.getItem("listStudent") ?
            JSON.parse(localStorage.getItem("listStudent")) : [];
        let index = $(".get-index").val();
        let id = $(".form__input-id").attr("placeholder");
        let name = $(".form__input-name").val();
        let birth = $(".form__input-date").val();
        let sex = $(".input__select-value__sex").text();
        let andress = $(".form__input-andress").val();
        let status = $(".input__select-value__status").text();
        let phone = $(".form__input-phone").val();
        arrIDClass = $(".input__select-value__class").text().split('-');
        let idClass = arrIDClass[0].trim();
        listStudent[index] = {
            id: id,
            name: name,
            birth: birth,
            sex: sex,
            andress: andress,
            idClass: idClass,
            phone: phone,
            status: status,
        }
        localStorage.setItem("listStudent", JSON.stringify(listStudent));
        renderStudent();
        let modal = $(".manager__modal");
        let modalContent = $(".manager__modal-content");
        modalContent.removeClass("scale-up-center").addClass("scale-down-center");
        setTimeout(function() {
            modal.removeClass("active");
            modalContent.removeClass("scale-down-center");
        }, 400);
    } else {
        for (let i = 0; i < validateForm().length; i++) {
            if (validateForm()[0] === 0) {
                $(".manager__modal-alert__item.alert--danger__case00").addClass("active open");
                $(".form__input-name").addClass("form__input--error");
                $(".form__input-name").focusout(function() {
                    if (validateForm()[0] !== 0) {
                        $(".form__input-name").removeClass("form__input--error");
                        $(".manager__modal-alert__item.alert--danger__case00").addClass("close");
                        setTimeout(function() {
                            $(".manager__modal-alert__item.alert--danger__case00").removeClass("active open close");
                        }, 1000);
                    }
                });
            }

            if (validateForm()[1] === 1) {
                $(".manager__modal-alert__item.alert--danger__case01").addClass("active open");
                $(".form__input-date").addClass("form__input--error");
                $(".form__input-date").focusout(function() {
                    if (validateForm()[1] !== 1) {
                        $(".form__input-date").removeClass("form__input--error");
                        $(".manager__modal-alert__item.alert--danger__case01").addClass("close");
                        setTimeout(function() {
                            $(".manager__modal-alert__item.alert--danger__case01").removeClass("active open close");
                        }, 1000);
                    }
                });
            }

            if (validateForm()[2] === 2) {
                $(".manager__modal-alert__item.alert--danger__case02").addClass("active open");
                $(".form__input-andress").addClass("form__input--error");
                $(".form__input-andress").focusout(function() {
                    if (validateForm()[2] !== 2) {
                        $(".form__input-andress").removeClass("form__input--error");
                        $(".manager__modal-alert__item.alert--danger__case02").addClass("close");
                        setTimeout(function() {
                            $(".manager__modal-alert__item.alert--danger__case02").removeClass("active open close");
                        }, 1000);
                    }
                });
            }

            if (validateForm()[3] === 3) {
                $(".manager__modal-alert__item.alert--danger__case03").addClass("active open");
                $(".form__input-phone").addClass("form__input--error");
                $(".form__input-phone").focusout(function() {
                    if (validateForm()[3] !== 3) {
                        $(".form__input-phone").removeClass("form__input--error");
                        $(".manager__modal-alert__item.alert--danger__case03").addClass("close");
                        setTimeout(function() {
                            $(".manager__modal-alert__item.alert--danger__case03").removeClass("active open close");
                        }, 1000);
                    }
                });
            }
        }
    }
}

//Mở alert xóa
function deleteObj(index) {
    $(".get-index").val(index);
    let modal = $(".manager__alert");
    let modalContent = $(".manager__alert-content");
    let deleteBtn = $(".table__icon-delete");
    $(".manager__modal-title > h5").html("Xóa thông tin sinh viên");
    modal.addClass("active");
    modalContent.addClass("scale-up-center");
    let listStudent = localStorage.getItem("listStudent") ?
        JSON.parse(localStorage.getItem("listStudent")) : [];
    let idObj = listStudent[index].id;
    $(".get-id-del").html(idObj);
}

//Xóa
function deleteStudent() {
    let listStudent = localStorage.getItem("listStudent") ?
        JSON.parse(localStorage.getItem("listStudent")) : [];
    let index = $(".get-index").val();
    listStudent.splice(index, 1);
    localStorage.setItem("listStudent", JSON.stringify(listStudent));
    renderStudent();
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
    $(".manager__modal-title > h5").html("Hiển thị thông tin sinh viên");
    $(".btn--submit").css("display", "none");
    $(".btn--update").css("display", "none");
    loadModal(index);
}

//Định dạng lại ngày sinh
function formatBirth(birth) {
    let arrBirth = birth.split('-');
    return arrBirth[2] + "-" + arrBirth[1] + "-" + arrBirth[0];
}

//Hiển thị danh sách các đối tượng
function renderStudent() {
    let listStudent = localStorage.getItem("listStudent") ?
        JSON.parse(localStorage.getItem("listStudent")) : [];

    let student = `<thead>
    <tr class="table__data-tr">
        <th class="table__data-th obj__id" rowspan="1" colspan="1">Mã sinh viên</th>
        <th class="table__data-th obj__name" rowspan="1" colspan="1">Tên sinh viên</th>
        <th class="table__data-th obj__des" rowspan="1" colspan="1">Địa chỉ</th>
        <th class="table__data-th obj__status" rowspan="1" colspan="1">Ngày sinh</th>
        <th class="table__data-th obj__status" rowspan="1" colspan="1">Tình trạng</th>
        <th class="table__data-th obj__status" rowspan="1" colspan="1">Lớp học</th>
        <th class="table__data-th obj__act" rowspan="1" colspan="1">Thao tác</th>
    </tr>
</thead>`

    for (let i = 0; i < listStudent.length; i++) {
        let statusColor = "";
        if (listStudent[i].status === "Hoạt động") {
            statusColor = "active";
        }
        if (listStudent[i].status === "Nghỉ học") {
            statusColor = "disable";
        }
        student += `<tbody>
        <tr class="table__data-tr">
            <td class="table__data-td ">${listStudent[i].id}</td>
            <td class="table__data-td">${listStudent[i].name}</td>
            <td class="table__data-td">${listStudent[i].andress}</td>
            <td class="table__data-td">${formatBirth(listStudent[i].birth)}</td>
            <td class="table__data-td obj__status ${statusColor}">${listStudent[i].status}</td>
            <td class="table__data-td">${listStudent[i].idClass}</td>
            <td class="table__data-td">
                <a class="edit__btn" href="#" onclick="editObj(${i})"><i class="table__icon table__icon-edit fas fa-pen"></i></a>
                <a class="delete__btn" href="#" onclick="deleteObj(${i})"><i class="table__icon table__icon-delete fas fa-trash"></i></a>
                <a class="display__btn" href="#" onclick="displayObj(${i})"><i class="table__icon table__icon-display fas fa-user"></i></a>
            </td>
        </tr>
    </tbody>`
    }
    $(".table").html(student);
}

//Khác
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