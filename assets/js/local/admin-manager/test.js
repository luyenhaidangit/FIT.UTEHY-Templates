function editObj(index) {
    $(".manager__modal-title > h5").html("Sửa thông tin chuyên ngành")
    console.log(index);
    loadModal(index);
    $(".manager__modal").addClass("active");
    $(".manager__modal-content").addClass("scale-up-center");
    let submitBtn = $(".btn--submit");
    submitBtn.click(function() {
        if ($(".manager__modal-title > h5").html() === "Sửa thông tin chuyên ngành") {

            let id = $(".form__input-id").attr("placeholder");
            let name = $(".form__input-name").val();
            let status = $(".form__input-select").text();
            let desc = $(".form__input-desc").val();
            listTraining[index] = {
                id: id,
                name: name,
                status: status,
                desc: desc,
            }
            localStorage.setItem("listTraining", JSON.stringify(listTraining));
            renderTraning();
            let modal = $(".manager__modal");
            let modalContent = $(".manager__modal-content");
            modalContent.removeClass("scale-up-center").addClass("scale-down-center");
            setTimeout(function() {
                modal.removeClass("active");
                modalContent.removeClass("scale-down-center");
            }, 400);
        }
    })
}

function deleteObj(index) {
    deleteModal();
}

// function editTraining(index) {
//     let listTraining = localStorage.getItem("listTraining") ?
//         JSON.parse(localStorage.getItem("listTraining")) : [];
//     let id = $(".form__input-id").attr("placeholder");
//     let name = $(".form__input-name").val();
//     let status = $(".form__input-select").text();
//     let desc = $(".form__input-desc").val();
//     listTraining[index] = {
//         id: id,
//         name: name,
//         status: status,
//         desc: desc,
//     }
//     localStorage.setItem("listTraining", JSON.stringify(listTraining));
//     renderTraning();
//     let modal = $(".manager__modal");
//     let modalContent = $(".manager__modal-content");
//     modalContent.removeClass("scale-up-center").addClass("scale-down-center");
//     setTimeout(function() {
//         modal.removeClass("active");
//         modalContent.removeClass("scale-down-center");
//     }, 400);
// }