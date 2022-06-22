let itemCode;
let description;
let unitPrice;
let qty;

let txtItemCode = $("#txtItemCode");
let txtDescription = $("#txtDescription");
let txtUnitPrice = $("#txtUnitPrice");
let txtQty = $("#txtQty");

let txtSearchItem = $("#txtSearchItem");

let nextCode;
let lastCode;

disableButton(".btnSaveItem");
disableButton("#btnEditItem");
disableButton("#btnDeleteItem");

/* ---------------Initially Hide the Error Indicators----------*/

$("#itemForm p.errorText").hide();

/* -----------------------------------------------------------------CRUD Operation---------------------------------------------------*/

function addItem() {
    txtItemCode.removeAttr("disabled");

    $.ajax({
        // url: "http://localhost:8080/pos/item",
        url: itemAPIBaseUrl,
        method: "POST",
        data: $("#itemForm").serialize(),
        // async:false,
        success: function (resp) {
            if (resp.code === 201) {
                toastr.success(resp.message);
                loadAllItems();
                getItemCount();
                reset_ItemForm();
                // generateNextItemCode();

            } else {
                toastr.error(resp.data);
                generateNextItemCode();
            }
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
        }
    });
}

function updateItem(itemObj) {
    $.ajax({
        // url: "http://localhost:8080/pos/item",
        url: itemAPIBaseUrl,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(itemObj),
        // async:false,
        success: function (resp) {
            if (resp.code === 200) {
                response = resp;
                // return resp;
                toastr.success(resp.message);

                loadAllItems();
                reset_ItemForm();
                // generateNextItemCode();
                clearItemFields();

            } else if (resp.code == 400) {
                toastr.error(resp.message);
                generateNextItemCode();
            } else {
                toastr.error(resp.message);
                generateNextItemCode();
            }
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
        }
    });
}

function deleteItem(row) {
    itemCode = $(row).children(':nth-child(1)').text();

    //TODO
    /*for (let i in orderDetailDB) {
        if (orderDetailDB[i].getItemCode() == itemCode) {
            alertTitle = "You cannot delete this Item"
            alertText = "This Item has already been ordered\nYou may loose data...";
            display_Alert(alertTitle, alertText, "warning");
            return;
        }
    } */

    swal({
        title: 'Are you sure you want to delete this Item..?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
        closeModal: true,

    }).then(result => {

        if (result) {

            $.ajax({
                url: itemAPIBaseUrl+"?itemCode=" + itemCode,
                method: "DELETE",
                async: false,
                success: function (resp) {
                    if (resp.code === 200) {
                        // alert(resp.message);
                        swal({
                            title: 'Deleted!',
                            text: "Item  " + itemCode + "  Deleted.",
                            icon: 'success',
                            buttons: ["OK"],
                            timer: 2000,
                            closeModal: true,
                        });

                        loadAllItems();
                        getItemCount();
                        reset_ItemForm();
                        // generateNextItemCode();
                        clearItemFields();

                    } else if (resp.code === 400) {
                        toastr.error(resp.message);
                        generateNextItemCode();

                    } else {
                        toastr.error(resp.message);
                        generateNextItemCode();
                    }

                },
                error: function (ob, status, t) {
                    console.log(ob);
                    toastr.error(ob.responseJSON.message);
                }
            });
        }
    })
}

function loadAllItems() {
    $("#tblItem-body").empty();

    $.ajax({
        url: itemAPIBaseUrl,
        method: "GET",
        success: function (resp) {
            console.log(resp);
            reply = resp;
            for (let i of resp.data) {
                let item = new Item(i.itemCode, i.description, i.unitPrice, i.qtyOnHand);

                newRow = `<tr>
                    <td>${item.getItemCode()}</td>
                    <td>${item.getDescription()}</td>
                    <td>${item.getUnitPrice().toFixed(2)}</td>
                    <td>${item.getQtyOnHand()}</td>
                </tr>`;

                $("#tblItem-body").append(newRow);
            }
            select_ItemRow();
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
        }
    });
}

function searchItem(searchValue) {
    $.ajax({
        // url: "http://localhost:8080/pos/item?option=SEARCH&itemCode=" + searchValue + "&description=",
        url: itemAPIBaseUrl+ "/" + searchValue,
        method: "GET",
        success: function (resp) {
            response = resp;
            // if (JSON.stringify(resp.data) !== "{}") { // {"itemCode":"I00-002","description":"Red Rice","unitPrice":150,"qtyOnHand":20}
            if (resp.code === 200) {
                let obj = resp.data;
                obj = new Item(obj.itemCode, obj.description, obj.unitPrice, obj.qtyOnHand);

                txtItemCode.val(obj.getItemCode());
                txtDescription.val(obj.getDescription());
                txtUnitPrice.val(obj.getUnitPrice());
                txtQty.val(obj.getQtyOnHand());

                validate_ItemForm();
                return true;

            }
            /*else { // if resp.data = '{}'
                swal({
                    title: "Item " + searchValue + " doesn't exist...",
                    text: "\n",
                    icon: 'warning',
                    buttons: false,
                    timer: 2000,
                    closeModal: true,
                })
                reset_ItemForm();
                return false;
            }*/
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
            swal({
                title: "Item " + searchValue + " doesn't exist...",
                text: "\n",
                icon: 'warning',
                buttons: false,
                timer: 2000,
                closeModal: true,
            })
            reset_ItemForm();
        }
    });
}

/* ------------------Save Item------------*/

/* When/after a new Item is Saved:
    1. add Item to table
    2. fill input fields when a row is selected
    3. delete the selected Item from the table
*/

$(".btnSaveItem").click(function () {
    Swal.fire({
        text: "Are you sure you want to Save this Item..?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Save',
        confirmButtonColor: '#1abc9c',
        customClass: {
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
        },
        allowOutsideClick: false,
        returnFocus: false,

    }).then(result => {
        if (result.isConfirmed) {
            addItem();
            // reset_ItemForm();

            $("#tblItem-body>tr").off("dblclick");
            delete_ItemRowOnDblClick();
        }
    });
});

/* ------------------Update Item------------*/

$("#btnEditItem").click(function (e) {
    select_ItemRow();

    Swal.fire({
        text: "Are you sure you want to Update this Item..?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Update',
        confirmButtonColor: '#3498db',
        customClass: {
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
        },
        allowOutsideClick: false,
        returnFocus: false,

    }).then(result => {
        if (result.isConfirmed) {
            let itemObj = {
                itemCode: txtItemCode.val(),
                description: txtDescription.val(),
                unitPrice: txtUnitPrice.val(),
                qtyOnHand: txtQty.val()
            }
            updateItem(itemObj);
            // toastr.success(response.message);
            // reset_ItemForm();
            // generateNextItemCode();

            $("#tblItem-body>tr").off("dblclick");
            delete_ItemRowOnDblClick();
        }
    });
});

/* ------------------Search Item------------*/

$("#txtSearchItem").keyup(function (e) {
    searchValue = $(this).val();

    $("#btnSearchItem").off("click");
    $("#btnSearchItem").click(function (e) {
        searchItem(searchValue);
    });

    if (e.key == "Enter") {
        e.preventDefault();
        searchItem(searchValue);
    }

    $("#tblItem-body>tr").each(function () {
        let isFound = false;
        $(this).each(function () {  // search td of each tr one by one
            if ($(this).text().toLowerCase().indexOf(searchValue.toLowerCase()) >= 0) {
                isFound = true;
            }
        });
        if (isFound) {
            $(this).show();

        } else {
            $(this).hide();
        }
    });
});

/* -------------------------------------------------------------------Validation--------------------------------------------------- */

/* --------------------------Validate & Jump to Next Field On Enter---------------------------------*/

var regExItemCode = /^(I00-)[0-9]{3,4}$/;
var regExDescription = /^[A-Z][a-z ]{3,9}[A-z]{2,10}$|^[A-Z][a-z]{4,20}$/;
var regExUnitPrice = /^[1-9][0-9]*([.][0-9]{2})?$/;
var regExQty = /^[0-9]+$/;

function select_ItemRow() {
    $("#tblItem-body>tr").click(function () {
        rowSelected = this;
        itemCode = $(this).children(':first-child').text();

        searchItem(itemCode);

        disableButton("#btnAddItem");
        enableButton("#btnEditItem");
        enableButton("#btnDeleteItem");

        $("#btnDeleteItem").off("click");

        /* ------------------Delete Item------------*/

        $("#btnDeleteItem").click(function () {
            deleteItem(rowSelected);
        });

        $("#tblItem-body>tr").off("dblclick");
        delete_ItemRowOnDblClick();
    });
}

function delete_ItemRowOnDblClick() {
    $("#tblItem-body>tr").dblclick(function () {
        rowSelected = $(this);
        deleteItem(rowSelected);
    });
}

function validate_ItemCode(input, txtField) {

    if (regExItemCode.test(input)) {
        changeBorderColor("valid", txtField);

        // once the current input field is green change the the border of next input field to red
        if (!validate_Description(txtDescription.val(), txtDescription)) {
            changeBorderColor("invalid", txtDescription);
            $("#itemForm p.errorText").eq(1).show();
            $("#errorDescription").text("*Required Field* Min 5, Max 20, Spaces Allowed");
        }

        $("#itemForm p.errorText").eq(0).hide();
        return true;

    } else {
        changeBorderColor("invalid", txtField);
        $("#itemForm p.errorText").eq(0).show();
        $("#errorCode").text("*Required Field* Format : I00-000");

        disableButton(".btnSaveItem");
        disableButton("#btnEditItem");
        return false;
    }
}

function validate_Description(input, txtField) {

    if (regExDescription.test(input)) {
        changeBorderColor("valid", txtField);

        // once the current input field is green change the the border of next input field to red
        if (!validate_UnitPrice(txtUnitPrice.val(), txtUnitPrice)) {
            changeBorderColor("invalid", txtUnitPrice);
            $("#itemForm p.errorText").eq(2).show();
            $("#errorPrice").text("*Required Field* Pattern : 100.00 or 100");
        }

        $("#itemForm p.errorText").eq(1).hide();
        return true;

    } else {
        changeBorderColor("invalid", txtField);
        $("#itemForm p.errorText").eq(1).show();
        $("#errorDescription").text("*Required Field* Min 5, Max 20, Spaces Allowed");

        disableButton(".btnSaveItem");
        disableButton("#btnEditItem");
        return false;
    }
}

function validate_UnitPrice(input, txtField) {

    if (regExUnitPrice.test(input)) {
        changeBorderColor("valid", txtField);

        // once the current input field is green change the the border of next input field to red
        if (!validate_Qty(txtQty.val(), txtQty)) {
            changeBorderColor("invalid", txtQty);
            $("#itemForm p.errorText").eq(3).show();
            $("#errorQty").text("*Required Field*  Only Numbers");
        }

        $("#itemForm p.errorText").eq(2).hide();
        return true;

    } else {
        changeBorderColor("invalid", txtField);
        $("#itemForm p.errorText").eq(2).show();
        $("#errorPrice").text("*Required Field* Pattern : 100.00 or 100");

        disableButton(".btnSaveItem");
        disableButton("#btnEditItem");
        return false;
    }
}

function validate_Qty(input, txtField) {

    if (regExQty.test(input)) {
        changeBorderColor("valid", txtField);

        enableButton(".btnSaveItem");
        enableButton("#btnEditItem");

        $("#itemForm p.errorText").eq(3).hide();

        if (rowSelected != null) {
            disableButton(".btnSaveItem");
        }
        return true;

    } else {
        changeBorderColor("invalid", txtField);
        $("#itemForm p.errorText").eq(3).show();
        $("#errorQty").text("*Required Field*  Only Numbers");

        disableButton(".btnSaveItem");
        disableButton("#btnEditItem");
        return false;
    }
}

function reset_ItemForm() {
    txtItemCode.val("").css('border', '1px solid rgb(206, 212, 218)');
    txtDescription.val("").css('border', '1px solid rgb(206, 212, 218)');
    txtUnitPrice.val("").css('border', '1px solid rgb(206, 212, 218)');
    txtQty.val("").css('border', '1px solid rgb(206, 212, 218)');

    $("#itemForm p.errorText").hide();

    txtItemCode.attr("disabled", "disabled");
    txtDescription.focus();

    disableButton(".btnSaveItem");
    disableButton("#btnEditItem");
    disableButton("#btnDeleteItem");

    select_ItemRow();

    rowSelected = null;
    itemCode = null;

    generateNextItemCode();
}

function validate_ItemForm() {
    itemCode = txtItemCode.val();
    description = txtDescription.val();
    unitPrice = txtUnitPrice.val();
    qty = txtQty.val();

    validate_ItemCode(itemCode, txtItemCode);
    validate_Description(description, txtDescription);
    validate_UnitPrice(unitPrice, txtUnitPrice);
    validate_Qty(qty, txtQty);
}

$("#txtItemCode, #txtDescription, #txtUnitPrice, #txtQty").keydown(function (e) {
    $("#btnSearchItem").off("click");
    if (e.key === "Tab") {
        e.preventDefault();
    }

    if (e.code === "Enter") {
        e.preventDefault();

    }

});

$("#txtItemCode").keyup(function (e) {
    input = txtItemCode.val();
    validate_ItemCode(input, this);

    if (e.code === "Enter" && isBorderGreen(this)) {
        e.preventDefault();
        $("#txtDescription").focus();
    }
});

$("#txtDescription").keyup(function (e) {
    input = txtDescription.val();
    validate_Description(input, this);

    if (e.code === "Enter" && isBorderGreen(this)) {
        $("#txtUnitPrice").focus();
    }
});

$("#txtUnitPrice").keyup(function (e) {
    input = txtUnitPrice.val();
    validate_UnitPrice(input, this);

    if (e.code === "Enter" && isBorderGreen(this)) {
        $("#txtQty").focus();
    }
});

$("#txtQty").keyup(function (e) {
    input = txtQty.val();
    validate_Qty(input, this);

    if (e.code === "Enter" && isBorderGreen(this)) {
        select_ItemRow();

    }
    $("#tblItem-body>tr").off("dblclick");
    delete_ItemRowOnDblClick();

});

/* -----Clear Fields-------*/

$("#btnClearItemFields").click(function () {
    reset_ItemForm();
    generateNextItemCode();
    loadAllItems();

    txtSearchItem.val("");
});

