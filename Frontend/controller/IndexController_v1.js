
console.log("IndexController loaded.......");

/* ----------------------------------------------------------------Navigation-----------------------------------------------------------*/

$("#nav-home").click(function () {
    console.log("inside Home Tab..");

    $("title").text("Home");

    $("#home-main").css('display', 'block');
    $("#customer-main").css('display', 'none');
    $("#store-main").css('display', 'none');
    $("#orders-main").css('display', 'none');

    $("#nav-home a").addClass("active");
    $("#nav-customer a").removeClass("active");
    $("#nav-store a").removeClass("active");
    $("#nav-orders a").removeClass("active");

});

$("#nav-customer").click(function () {
    console.log("inside Customer Tab..");

    $("title").text("Customersssssssss");
    // loadAllCustomers();

    /*$.ajax({
        url: "customer?option=GETALL",
        method: "GET",
        success: function (resp) {
            console.log(resp);
            alert(resp.message);

            for (let c of resp.data) {
                let customer = new Customer(c.id, c.name, c.address, c.contact);

                newRow = `<tr>
                    <td>${customer.getCustomerID()}</td>
                    <td>${customer.getCustomerName()}</td>
                    <td>${customer.getCustomerAddress()}</td>
                    <td>${customer.getCustomerContact()}</td>
                </tr>`;

                $("#tblCustomer-body").append(newRow);
            }

            loadCmbCustomerId();
            loadCmbCustomerName();
            clearCustomerFields();
        },

        error: function (ob, textStatus, error) {
            alert(textStatus);
            console.log(ob);
        }

    })*/

    $("#home-main").css('display', 'none');
    $("#customer-main").css('display', 'block');
    $("#store-main").css('display', 'none');
    $("#orders-main").css('display', 'none');

    $("#nav-home a").removeClass("active");
    $("#nav-customer a").addClass("active");
    $("#nav-store a").removeClass("active");
    $("#nav-orders a").removeClass("active");

    $("#txtCustomerId").focus();

});

$("#nav-store").click(function () {
    console.log("inside Store Tab..");
    $("title").text("Store");

    $("#home-main").css('display', 'none');
    $("#customer-main").css('display', 'none');
    $("#store-main").css('display', 'block');
    $("#orders-main").css('display', 'none');

    $("#nav-home a").removeClass("active");
    $("#nav-customer a").removeClass("active");
    $("#nav-store a").addClass("active");
    $("#nav-orders a").removeClass("active");

    $("#txtItemCode").focus();

    // loadCmbCustomerId();
    // loadCmbCustomerName();

});

$("#nav-orders").click(function () {
    console.log("inside Orders Tab..");
    $("title").text("Orders");

    $("#home-main").css('display', 'none');
    $("#customer-main").css('display', 'none');
    $("#store-main").css('display', 'none');
    $("#orders-main").css('display', 'block');

    $("#nav-home a").removeClass("active");
    $("#nav-customer a").removeClass("active");
    $("#nav-store a").removeClass("active");
    $("#nav-orders a").addClass("active");

    // setComboBoxes();

});

// toastr.options = {
//   "closeButton": false,
//   "debug": true,
//   "newestOnTop": false,
//   "progressBar": false,
//   "positionClass": "toast-top-right",
//   "preventDuplicates": false,
//   "onclick": null,
//   "showDuration": "300",
//   "hideDuration": "1000",
//   "timeOut": "5000",
//   "extendedTimeOut": "1000",
//   "showEasing": "swing",
//   "hideEasing": "linear",
//   "showMethod": "fadeIn",
//   "hideMethod": "fadeOut"
// }


let rowSelected;
let updatedRow;

let input;
let newRow;

let searchValue;
let response;

let color;

let alertText;
let alertTitle;
let alertIcon;

function isBorderGreen(inputField) {
    color = $(inputField).css('border-color');

    // if (color === "rgb(38, 222, 129)") {
    if (color === "rgb(39, 174, 96)") {
        return true;
    }
    return false;
}

function changeBorderColor(inputStatus, inputField) {
    switch (true) {
        case inputStatus === "valid":
            // $(inputField).css('border', '5px solid #26de81');
            $(inputField).css('border', '5px solid #27ae60');
            break;

        case inputStatus === "invalid":
            // $(inputField).css('border', '5px solid #ff3f34');
            $(inputField).css('border', '5px solid #e74c3c');
            break;

        default:
            $(inputField).css('border', '2px solid rgb(206, 212, 218)');
            break;
    }
}

function disableButton(btn) {
    $(btn).attr("disabled", "disabled");
}

function enableButton(btn) {
    $(btn).removeAttr("disabled");
}

function display_Alert(alertTitle, alertText, alertIcon) {

    if (alertTitle == "") {
        swal({
            text: alertText,
            icon: alertIcon,
            buttons: "OK",
            closeModal: true,
            closeOnClickOutside: false,
        });

    } else {
        swal({
            title: alertTitle,
            text: alertText,
            icon: alertIcon,
            buttons: "OK",
            closeModal: true,
            closeOnClickOutside: false,
        });
    }

}


/*
function loadCmbCustomerId() {
    console.log("Inside loadCMB ID");
    clearCmbCustomerId();
    // clearCustomerFields();

    let optionValue = -1;

    $.ajax({
        url: "customer?option=GET_ID_NAME",
        method: "GET",
        success: function (resp) {
            for (let c of resp.data) {
                var customer = new Customer(c.id);
                optionValue++;
                newOption = `<option value="${optionValue}">${customer.getCustomerID()}</option>`;
                $(cmbCustomerId).append(newOption);
            }
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
        }
    });
}

function loadCmbCustomerName() {
    console.log("Inside loadCMB Names");
    clearCmbCustomerName();
    // clearCustomerFields();

    let optionValue = -1;
    $.ajax({
        url: "customer?option=GET_ID_NAME",
        method: "GET",
        success: function (resp) {
            for (let c of resp.data) {
                var customer = new Customer(c.name);
                optionValue++;
                newOption = `<option value="${optionValue}">${customer.getCustomerName()}</option>`;
                $(cmbCustomerId).append(newOption);
            }
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
        }
    });
}

function clearCustomerFields() {
    loadCmbCustomerId();
    loadCmbCustomerName();
    txtord_address.val("");
    txtord_contact.val("");
}

function clearCmbCustomerId() {
    $(cmbCustomerId).empty();
    $(cmbCustomerId).append(defaultOption);
}

function clearCmbCustomerName() {
    $(cmbCustomerName).empty();
    $(cmbCustomerName).append(defaultOption);
}*/
