$(document).ready(function() {
    let modal = $(".manager__modal");
    let modalContent = $(".manager__modal-content");
    let alert = $(".manager__alert");
    let alertContent = $(".manager__alert-content");
    let addBtn = $(".add__btn");
    let closeBtn = $(".manager__modal-close");
    let submitBtn = $(".btn--submit");
    renderClass();

    renderSelectTraining();

    renderSelectGenera();

    tooltip();

    selectInput();

    //Bật modal thêm
    addBtn.click(function() {
        resetModal();
        $(".manager__modal-title > h5").html("Nhập thông tin lớp học");
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
            addClass();
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
            }
        }
    })
});

//Mã sinh tự động
function generateID() {
    let listClass = localStorage.getItem("listClass") ?
        JSON.parse(localStorage.getItem("listClass")) : [];
    let listid = [];
    for (let i = 0; i < listClass.length; i++) {
        listid.push(listClass[i].id);
    }
    let autoID = listid.length > 0 ? Math.max(...listid) + 1 : 125201;
    return autoID;
}

//Lấy danh sách chuyên ngành
function renderSelectTraining() {
    let listTraining = localStorage.getItem("listTraining") ?
        JSON.parse(localStorage.getItem("listTraining")) : [];
    let traning = ``
    for (let i = 0; i < listTraining.length; i++) {
        if (listTraining[i].status === "Hoạt động") {
            let content = listTraining[i].id + " - " + listTraining[i].name;
            traning += `<div class="input__option"><span>${content}</span></div>`
        }
    }
    $(".input__list-option.traning__select").html(traning);
}

//Lấy danh sách hệ đào tạo
function renderSelectGenera() {
    let listGenera = localStorage.getItem("listGenera") ?
        JSON.parse(localStorage.getItem("listGenera")) : [];
    let genera = ``
    for (let i = 0; i < listGenera.length; i++) {
        if (listGenera[i].status === "Hoạt động") {
            let content = listGenera[i].id + " - " + listGenera[i].name;
            genera += `<div class="input__option"><span>${content}</span></div>`
        }
    }
    $(".input__list-option.genera__select").html(genera);
}

//Reset modal
function resetModal() {
    $(".manager__modal-alert__item").removeClass("active open");
    $(".form__input-name").removeClass("form__input--error");
    $(".form__input-name").val("");
    $(".input__select-value__training").html($(".traning__select").children().html());
    $(".input__select-value__genera").html($(".genera__select").children().html());
}

//Thêm
function addClass() {
    let listClass = localStorage.getItem("listClass") ?
        JSON.parse(localStorage.getItem("listClass")) : [];
    let id = generateID();
    let name = $(".form__input-name").val();
    arrTrainng = $(".input__select-value__training").text().split('-');
    let traning = arrTrainng[0].trim();
    arrGenera = $(".input__select-value__genera").text().split('-');
    let genera = arrGenera[0].trim();
    listClass.push({
        id: id,
        name: name,
        traning: traning,
        genera: genera,
    });
    let modal = $(".manager__modal");
    let modalContent = $(".manager__modal-content");
    modalContent.removeClass("scale-up-center").addClass("scale-down-center");
    setTimeout(function() {
        modal.removeClass("active");
        modalContent.removeClass("scale-down-center");
    }, 400);
    localStorage.setItem("listClass", JSON.stringify(listClass));
    renderClass();
}

//Thông tin chuyên ngành
function infoTraining(id) {
    let listTraining = localStorage.getItem("listTraining") ?
        JSON.parse(localStorage.getItem("listTraining")) : [];
    for (let i = 0; i < listTraining.length; i++) {
        if (listTraining[i].id == id) {
            return listTraining[i].id + " - " + listTraining[i].name;
        }
    }
}

//Thông tin hệ đào tạo
function infoGenera(id) {
    let listGenera = localStorage.getItem("listGenera") ?
        JSON.parse(localStorage.getItem("listGenera")) : [];
    for (let i = 0; i < listGenera.length; i++) {
        if (listGenera[i].id == id) {
            return listGenera[i].id + " - " + listGenera[i].name;
        }
    }
}

//Mở modal sửa
function editObj(index) {
    $(".get-index").val(index);
    $(".manager__modal").addClass("active");
    $(".manager__modal-content").addClass("scale-up-center");
    $(".manager__modal-title > h5").html("Cập nhật thông tin lớp học");
    $(".btn--submit").css("display", "none");
    $(".btn--update").css("display", "inline-block");
    loadModal(index);
}

//Load thông tin đối tượng lên modal
function loadModal(index) {
    let listClass = localStorage.getItem("listClass") ?
        JSON.parse(localStorage.getItem("listClass")) : [];
    let listTraining = localStorage.getItem("listTraining") ?
        JSON.parse(localStorage.getItem("listTraining")) : [];
    $(".form__input-id").attr("placeholder", listClass[index].id);
    $(".form__input-name").val(listClass[index].name);
    let training = infoTraining(listClass[index].traning);
    $(".input__select-value__training").html(training);
    let genera = infoGenera(listClass[index].genera);
    $(".input__select-value__genera").html(genera);
}

//Sửa
function editClass() {
    if (validateForm().length === 0) {
        let listClass = localStorage.getItem("listClass") ?
            JSON.parse(localStorage.getItem("listClass")) : [];
        let index = $(".get-index").val();
        let id = $(".form__input-id").attr("placeholder");
        let name = $(".form__input-name").val();
        arrTrainng = $(".input__select-value__training").text().split('-');
        let traning = arrTrainng[0].trim();
        arrGenera = $(".input__select-value__genera").text().split('-');
        let genera = arrGenera[0].trim();
        listClass[index] = {
            id: id,
            name: name,
            traning: traning,
            genera: genera,
        }
        localStorage.setItem("listClass", JSON.stringify(listClass));
        renderClass();
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
        }
    }
}

//Mở alert xóa
function deleteObj(index) {
    $(".get-index").val(index);
    let modal = $(".manager__alert");
    let modalContent = $(".manager__alert-content");
    let deleteBtn = $(".table__icon-delete");
    let closeBtn = $(".manager__modal-close");
    $(".manager__modal-title > h5").html("Xóa thông tin lớp học");
    modal.addClass("active");
    modalContent.addClass("scale-up-center");
    let listClass = localStorage.getItem("listClass") ?
        JSON.parse(localStorage.getItem("listClass")) : [];
    let idObj = listClass[index].id;
    $(".get-id-del").html(idObj);
}

//Xóa
function deleteClass() {
    let listClass = localStorage.getItem("listClass") ?
        JSON.parse(localStorage.getItem("listClass")) : [];
    let index = $(".get-index").val();
    listClass.splice(index, 1);
    localStorage.setItem("listClass", JSON.stringify(listClass));
    renderClass();
    let alert = $(".manager__alert");
    let alertContent = $(".manager__alert-content");
    alertContent.removeClass("scale-up-center").addClass("scale-down-center");
    setTimeout(function() {
        alert.removeClass("active");
        alertContent.removeClass("scale-down-center");
    }, 400);
}

//Mở modal hiển thị
function displayObj(index) {
    $(".get-index").val(index);
    $(".manager__modal").addClass("active");
    $(".manager__modal-content").addClass("scale-up-center");
    $(".manager__modal-title > h5").html("Hiển thị thông tin lớp học");
    $(".btn--submit").css("display", "none");
    $(".btn--update").css("display", "none");
    loadModal(index);
}

//Tên chuyên ngành
function nameTraning(id) {
    let listTraining = localStorage.getItem("listTraining") ?
        JSON.parse(localStorage.getItem("listTraining")) : [];
    for (let i = 0; i < listTraining.length; i++) {
        if (listTraining[i].id == id) {
            return listTraining[i].name;
        }
    }
}

//Tên hệ đào tạo
function nameGenera(id) {
    let listGenera = localStorage.getItem("listGenera") ?
        JSON.parse(localStorage.getItem("listGenera")) : [];
    for (let i = 0; i < listGenera.length; i++) {
        if (listGenera[i].id == id) {
            return listGenera[i].name;
        }
    }
}

//Hiển thị thông tin danh sách lớp
function renderClass() {
    let listClass = localStorage.getItem("listClass") ?
        JSON.parse(localStorage.getItem("listClass")) : [];

    let genera = `
    <thead>
        <tr class="table__data-tr">
            <th class="table__data-th obj__id" rowspan="1" colspan="1">Mã lớp</th>
            <th class="table__data-th obj__name" rowspan="1" colspan="1">Tên lớp</th>
            <th class="table__data-th obj__status" rowspan="1" colspan="1">Chuyên ngành</th>
            <th class="table__data-th obj__desc" rowspan="1" colspan="1">Hệ đào tạo</th>
            <th class="table__data-th obj__act" rowspan="1" colspan="1">Thao tác</th>
        </tr>
    </thead>`

    for (let i = 0; i < listClass.length; i++) {
        genera += `<tbody>
        <tr class="table__data-tr">
            <td class="table__data-td ">${listClass[i].id}</td>
            <td class="table__data-td">${listClass[i].name}</td>
            <td class="table__data-td">${nameTraning(listClass[i].traning)}</td>
            <td class="table__data-td">${nameGenera(listClass[i].genera)}</td>
            <td class="table__data-td">
                <a class="edit__btn" href="#" onclick="editObj(${i})"><i class="table__icon table__icon-edit fas fa-pen"></i></a>
                <a class="delete__btn" href="#" onclick="deleteObj(${i})"><i class="table__icon table__icon-delete fas fa-trash"></i></a>
                <a class="display__btn" href="#" onclick="displayObj(${i})"><i class="table__icon table__icon-display fas fa-user"></i></a>
            </td>
        </tr>
    </tbody>`
    }
    $(".table").html(genera);
}

//Khác
function tooltip() {
    $(".table__icon").click(function() {
        $(this).siblings().toggle();
    })
}

function selectInput() {
    let inputSelect = $(".input__select");
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