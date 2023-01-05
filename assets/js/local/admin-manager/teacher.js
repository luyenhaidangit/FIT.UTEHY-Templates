$(document).ready(function() {
    let modal = $(".manager__modal");
    let modalContent = $(".manager__modal-content");
    let alert = $(".manager__alert");
    let alertContent = $(".manager__alert-content");
    let addBtn = $(".add__btn");
    let closeBtn = $(".manager__modal-close");
    let submitBtn = $(".btn--submit");

    renderTeacher();

    tooltip();

    selectInput();

    //Mở modal thêm
    addBtn.click(function() {
        resetModal();
        $(".manager__modal-title > h5").html("Nhập thông tin giáo viên");
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

    //Thêm
    submitBtn.click(function() {
        if (validateForm().length === 0) {
            addTeacher();
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
    let listTeacher = localStorage.getItem("listTeacher") ?
        JSON.parse(localStorage.getItem("listTeacher")) : [];
    let listid = [];
    for (let i = 0; i < listTeacher.length; i++) {
        listid.push(listTeacher[i].id);
    }
    let autoID = listid.length > 0 ? Math.max(...listid) + 1 : 1110;
    return autoID;
}

//Thêm
function addTeacher() {
    let listTeacher = localStorage.getItem("listTeacher") ?
        JSON.parse(localStorage.getItem("listTeacher")) : [];
    let id = generateID();
    let name = $(".form__input-name").val();
    let birth = $(".form__input-date").val();
    let sex = $(".input__select-value__sex").text();
    let andress = $(".form__input-andress").val();
    let status = $(".input__select-value__status").text();
    let phone = $(".form__input-phone").val();
    listTeacher.push({
        id: id,
        name: name,
        birth: birth,
        sex: sex,
        andress: andress,
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
    localStorage.setItem("listTeacher", JSON.stringify(listTeacher));
    renderTeacher();
}

//Load thông tin đối tượng lên modal
function loadModal(index) {
    let listTeacher = localStorage.getItem("listTeacher") ?
        JSON.parse(localStorage.getItem("listTeacher")) : [];
    let listClass = localStorage.getItem("listClass") ?
        JSON.parse(localStorage.getItem("listClass")) : [];
    let listTraining = localStorage.getItem("listTraining") ?
        JSON.parse(localStorage.getItem("listTraining")) : [];
    $(".form__input-id").attr("placeholder", listTeacher[index].id);
    $(".form__input-name").val(listTeacher[index].name);
    console.log();
    $(".form__input-date").val(listTeacher[index].birth);
    $(".input__select-value__sex").text(listTeacher[index].sex);
    $(".form__input-andress").val(listTeacher[index].andress);
    $(".form__input-phone").val(listTeacher[index].phone);
    $(".input__select-value__status").text(listTeacher[index].status);
}

//Mở modal sửa
function editObj(index) {
    resetModal();
    $(".get-index").val(index);
    $(".manager__modal").addClass("active");
    $(".manager__modal-content").addClass("scale-up-center");
    $(".manager__modal-title > h5").html("Cập nhật thông tin giáo viên");
    $(".btn--submit").css("display", "none");
    $(".btn--update").css("display", "inline-block");
    loadModal(index);
}

//Sửa
function editTeacher() {
    if (validateForm().length === 0) {
        let listClass = localStorage.getItem("listClass") ?
            JSON.parse(localStorage.getItem("listClass")) : [];
        let listTeacher = localStorage.getItem("listTeacher") ?
            JSON.parse(localStorage.getItem("listTeacher")) : [];
        let index = $(".get-index").val();
        let id = $(".form__input-id").attr("placeholder");
        let name = $(".form__input-name").val();
        let birth = $(".form__input-date").val();
        let sex = $(".input__select-value__sex").text();
        let andress = $(".form__input-andress").val();
        let status = $(".input__select-value__status").text();
        let phone = $(".form__input-phone").val();
        listTeacher[index] = {
            id: id,
            name: name,
            birth: birth,
            sex: sex,
            andress: andress,
            phone: phone,
            status: status,
        }
        localStorage.setItem("listTeacher", JSON.stringify(listTeacher));
        renderTeacher();
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
    $(".manager__modal-title > h5").html("Xóa thông tin giáo viên");
    modal.addClass("active");
    modalContent.addClass("scale-up-center");
    let listTeacher = localStorage.getItem("listTeacher") ?
        JSON.parse(localStorage.getItem("listTeacher")) : [];
    let idObj = listTeacher[index].id;
    $(".get-id-del").html(idObj);
}

//Xóa
function deleteTeacher() {
    let listTeacher = localStorage.getItem("listTeacher") ?
        JSON.parse(localStorage.getItem("listTeacher")) : [];
    let index = $(".get-index").val();
    listTeacher.splice(index, 1);
    localStorage.setItem("listTeacher", JSON.stringify(listTeacher));
    renderTeacher();
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
    $(".manager__modal-title > h5").html("Hiển thị thông tin giáo viên");
    $(".btn--submit").css("display", "none");
    $(".btn--update").css("display", "none");
    loadModal(index);
}

//Định dạng ngày sinh
function formatBirth(birth) {
    let arrBirth = birth.split('-');
    return arrBirth[2] + "-" + arrBirth[1] + "-" + arrBirth[0];
}

//Hiển thị danh sách đối tượng
function renderTeacher() {
    let listTeacher = localStorage.getItem("listTeacher") ?
        JSON.parse(localStorage.getItem("listTeacher")) : [];

    let teacher = `<thead>
    <tr class="table__data-tr">
        <th class="table__data-th obj__id" rowspan="1" colspan="1">Mã giáo viên</th>
        <th class="table__data-th obj__name" rowspan="1" colspan="1">Tên giáo viên</th>
        <th class="table__data-th obj__des" rowspan="1" colspan="1">Địa chỉ</th>
        <th class="table__data-th obj__status" rowspan="1" colspan="1">Ngày sinh</th>
        <th class="table__data-th obj__status" rowspan="1" colspan="1">Tình trạng</th>
        <th class="table__data-th obj__act" rowspan="1" colspan="1">Thao tác</th>
    </tr>
</thead>`

    for (let i = 0; i < listTeacher.length; i++) {
        let statusColor = "";
        if (listTeacher[i].status === "Hoạt động") {
            statusColor = "active";
        }
        if (listTeacher[i].status === "Nghỉ học") {
            statusColor = "disable";
        }
        teacher += `<tbody>
        <tr class="table__data-tr">
            <td class="table__data-td ">${listTeacher[i].id}</td>
            <td class="table__data-td">${listTeacher[i].name}</td>
            <td class="table__data-td">${listTeacher[i].andress}</td>
            <td class="table__data-td">${formatBirth(listTeacher[i].birth)}</td>
            <td class="table__data-td obj__status ${statusColor}">${listTeacher[i].status}</td>
            <td class="table__data-td">
                <a class="edit__btn" href="#" onclick="editObj(${i})"><i class="table__icon table__icon-edit fas fa-pen"></i></a>
                <a class="delete__btn" href="#" onclick="deleteObj(${i})"><i class="table__icon table__icon-delete fas fa-trash"></i></a>
                <a class="display__btn" href="#" onclick="displayObj(${i})"><i class="table__icon table__icon-display fas fa-user"></i></a>
            </td>
        </tr>
    </tbody>`
    }
    $(".table").html(teacher);
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