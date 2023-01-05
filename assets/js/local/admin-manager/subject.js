$(document).ready(function() {
    let modal = $(".manager__modal");
    let modalContent = $(".manager__modal-content");
    let alert = $(".manager__alert");
    let alertContent = $(".manager__alert-content");
    let addBtn = $(".add__btn");
    let closeBtn = $(".manager__modal-close");
    let submitBtn = $(".btn--submit");
    renderSubject();

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
            addSubject();
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

                if (validateForm()[4] === 4) {
                    $(".manager__modal-alert__item.alert--danger__case04").addClass("active open");
                    $(".form__input-num").addClass("form__input--error");
                    $(".form__input-num").focusout(function() {
                        if (validateForm()[4] !== 4) {
                            $(".form__input-num").removeClass("form__input--error");
                            $(".manager__modal-alert__item.alert--danger__case04").addClass("close");
                            setTimeout(function() {
                                $(".manager__modal-alert__item.alert--danger__case04").removeClass("active open close");
                            }, 1000);
                            if (validateForm()[5] === 5) {
                                $(".manager__modal-alert__item.alert--danger__case05").addClass("active open");
                                $(".form__input-num").addClass("form__input--error");
                                $(".form__input-num").focusout(function() {
                                    if (validateForm()[5] !== 5) {
                                        $(".form__input-num").removeClass("form__input--error");
                                        $(".manager__modal-alert__item.alert--danger__case05").addClass("close");
                                        setTimeout(function() {
                                            $(".manager__modal-alert__item.alert--danger__case05").removeClass("active open close");
                                        }, 1000);
                                    }
                                });
                            }
                        }
                    });
                } else if (validateForm()[5] === 5) {
                    $(".manager__modal-alert__item.alert--danger__case05").addClass("active open");
                    $(".form__input-num").addClass("form__input--error");
                    $(".form__input-num").focusout(function() {
                        if (validateForm()[5] !== 5) {
                            $(".form__input-num").removeClass("form__input--error");
                            $(".manager__modal-alert__item.alert--danger__case05").addClass("close");
                            setTimeout(function() {
                                $(".manager__modal-alert__item.alert--danger__case05").removeClass("active open close");
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
    $(".form__input-num").removeClass("form__input--error");
    $(".form__input-num").val("");
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
    let listSubject = localStorage.getItem("listSubject") ?
        JSON.parse(localStorage.getItem("listSubject")) : [];
    let listid = [];
    for (let i = 0; i < listSubject.length; i++) {
        listid.push(listSubject[i].id);
    }
    let autoID = listid.length > 0 ? Math.max(...listid) + 1 : 2110;
    return autoID;
}

//Thêm
function addSubject() {
    let listSubject = localStorage.getItem("listSubject") ?
        JSON.parse(localStorage.getItem("listSubject")) : [];
    let id = generateID();
    let name = $(".form__input-name").val();
    let num = $(".form__input-num").val();
    listSubject.push({
        id: id,
        name: name,
        num: num,
    });
    let modal = $(".manager__modal");
    let modalContent = $(".manager__modal-content");
    modalContent.removeClass("scale-up-center").addClass("scale-down-center");
    setTimeout(function() {
        modal.removeClass("active");
        modalContent.removeClass("scale-down-center");
    }, 400);
    localStorage.setItem("listSubject", JSON.stringify(listSubject));
    renderSubject();
}

//Load thông tin đối tượng lên modal
function loadModal(index) {
    let listSubject = localStorage.getItem("listSubject") ?
        JSON.parse(localStorage.getItem("listSubject")) : [];
    $(".form__input-id").attr("placeholder", listSubject[index].id);
    $(".form__input-name").val(listSubject[index].name);
    console.log();
    $(".form__input-num").val(listSubject[index].num);
}

//Mở modal sửa
function editObj(index) {
    resetModal();
    $(".get-index").val(index);
    $(".manager__modal").addClass("active");
    $(".manager__modal-content").addClass("scale-up-center");
    $(".manager__modal-title > h5").html("Cập nhật thông tin môn học");
    $(".btn--submit").css("display", "none");
    $(".btn--update").css("display", "inline-block");
    loadModal(index);
}

//Sửa
function editTeacher() {
    if (validateForm().length === 0) {
        let listSubject = localStorage.getItem("listSubject") ?
            JSON.parse(localStorage.getItem("listSubject")) : [];
        let index = $(".get-index").val();
        let id = $(".form__input-id").attr("placeholder");
        let name = $(".form__input-name").val();
        let num = $(".form__input-num").val();
        listSubject[index] = {
            id: id,
            name: name,
            num: num,
        }
        localStorage.setItem("listSubject", JSON.stringify(listSubject));
        renderSubject();
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
            if (validateForm()[4] === 4) {
                $(".manager__modal-alert__item.alert--danger__case04").addClass("active open");
                $(".form__input-num").addClass("form__input--error");
                $(".form__input-num").focusout(function() {
                    if (validateForm()[4] !== 4) {
                        $(".form__input-num").removeClass("form__input--error");
                        $(".manager__modal-alert__item.alert--danger__case04").addClass("close");
                        setTimeout(function() {
                            $(".manager__modal-alert__item.alert--danger__case04").removeClass("active open close");
                        }, 1000);
                        if (validateForm()[5] === 5) {
                            $(".manager__modal-alert__item.alert--danger__case05").addClass("active open");
                            $(".form__input-num").addClass("form__input--error");
                            $(".form__input-num").focusout(function() {
                                if (validateForm()[5] !== 5) {
                                    $(".form__input-num").removeClass("form__input--error");
                                    $(".manager__modal-alert__item.alert--danger__case05").addClass("close");
                                    setTimeout(function() {
                                        $(".manager__modal-alert__item.alert--danger__case05").removeClass("active open close");
                                    }, 1000);
                                }
                            });
                        }
                    }
                });
            } else if (validateForm()[5] === 5) {
                $(".manager__modal-alert__item.alert--danger__case05").addClass("active open");
                $(".form__input-num").addClass("form__input--error");
                $(".form__input-num").focusout(function() {
                    if (validateForm()[5] !== 5) {
                        $(".form__input-num").removeClass("form__input--error");
                        $(".manager__modal-alert__item.alert--danger__case05").addClass("close");
                        setTimeout(function() {
                            $(".manager__modal-alert__item.alert--danger__case05").removeClass("active open close");
                        }, 1000);
                    }
                });
            }
        }
    }
}

//Mở modal xóa
function deleteObj(index) {
    $(".get-index").val(index);
    let modal = $(".manager__alert");
    let modalContent = $(".manager__alert-content");
    let deleteBtn = $(".table__icon-delete");
    let closeBtn = $(".manager__modal-close");
    $(".manager__modal-title > h5").html("Xóa thông tin môn học");
    modal.addClass("active");
    modalContent.addClass("scale-up-center");
    let listSubject = localStorage.getItem("listSubject") ?
        JSON.parse(localStorage.getItem("listSubject")) : [];
    let idObj = listSubject[index].id;
    $(".get-id-del").html(idObj);
}

//Xóa
function deleteSubject() {
    let listSubject = localStorage.getItem("listSubject") ?
        JSON.parse(localStorage.getItem("listSubject")) : [];
    let index = $(".get-index").val();
    listSubject.splice(index, 1);
    localStorage.setItem("listSubject", JSON.stringify(listSubject));
    renderSubject();
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

//RENDER
function renderSubject() {
    let listSubject = localStorage.getItem("listSubject") ?
        JSON.parse(localStorage.getItem("listSubject")) : [];

    let subject = `<thead>
    <tr class="table__data-tr">
        <th class="table__data-th obj__id" rowspan="1" colspan="1">Mã môn học</th>
        <th class="table__data-th obj__name" rowspan="1" colspan="1">Tên môn học</th>
        <th class="table__data-th obj__des" rowspan="1" colspan="1">Số tín chỉ</th>
        <th class="table__data-th obj__des" rowspan="1" colspan="1">Thao tác</th>
    </tr>
</thead>`

    for (let i = 0; i < listSubject.length; i++) {
        subject += `<tbody>
        <tr class="table__data-tr">
            <td class="table__data-td ">${listSubject[i].id}</td>
            <td class="table__data-td">${listSubject[i].name}</td>
            <td class="table__data-td">${listSubject[i].num}</td>
            <td class="table__data-td">
                <a class="edit__btn" href="#" onclick="editObj(${i})"><i class="table__icon table__icon-edit fas fa-pen"></i></a>
                <a class="delete__btn" href="#" onclick="deleteObj(${i})"><i class="table__icon table__icon-delete fas fa-trash"></i></a>
                <a class="display__btn" href="#" onclick="displayObj(${i})"><i class="table__icon table__icon-display fas fa-user"></i></a>
            </td>
        </tr>
    </tbody>`
    }
    $(".table").html(subject);
}