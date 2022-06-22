let orderId = $("#txtOrderID");
let date = $("#date");

let cmbCustomerId = $("#cmbCustomerId");
let cmbCustomerName = $("#cmbCustomerName");
let txtord_address = $("#address");
let txtord_contact = $("#contact");

let cmbItemCode = $("#cmbItemCode");
let cmbDescription = $("#cmbDescription");
let txtUnitPrice2 = $("#txtUnitPrice2");
let txtQtyOnHand = $("#txtQtyOnHand");
let txtOrderQty = $("#txtOrderQty");

let txtSearchOrder = $("#txtSearchOrder");

let newOption;
let defaultOption = `<option value="-1" selected disabled hidden >Select</option>`;
let selectedOption;

let orderQty;
let total;
let qtyOnHand;

let selected_cartItem;
let noOfRows = 0;
let cartTotal = 0; // total cost of the cart

var regEx_Discount_Cash = /^[0-9]+$/;

let subTotal;
let balance;
let discount;
let amountPaid;

let allCustomers;
let allItems;
let allOrders;
let allOrderDetails;

$(cmbCustomerId).append(defaultOption);
$(cmbCustomerName).append(defaultOption);
$(cmbItemCode).append(defaultOption);
$(cmbDescription).append(defaultOption);

$("#selectItemForm p.errorText").hide();
$("#purchaseForm p.errorText").hide();

(function () {

    disableButton("#btnAddToCart");
    disableButton("#btnDeleteFromCart");
    disableButton("#btnDeleteOrder");
    disableButton("#btnPurchase");

    txtOrderQty.attr("disabled", "disabled");
    $("#txtDiscount").attr("disabled", "disabled");
    $("#txtAmountPaid").attr("disabled", "disabled");

})();

function getAllCustomers() {
    $.ajax({
        // url: "http://localhost:8080/pos/customer?option=GETALL",
        url:customerAPIBaseUrl,
        method: "GET",
        async: false,
        success: function (resp) {
            allCustomers = resp.data;
        },
        error: function (ob, textStatus, error) {
            alert(textStatus);
            console.log(ob);
        }
    });
}

function getAllItems() {
    $.ajax({
        // url: "http://localhost:8080/pos/item?option=GETALL",
        url: itemAPIBaseUrl,
        method: "GET",
        async: false,
        success: function (resp) {
            allItems = resp.data;
        },
        error: function (ob, textStatus, error) {
            alert(textStatus);
            console.log(ob);
        }
    });
}

function getAllOrders() {
    $.ajax({
        // url: "http://localhost:8080/pos/orders?option=GETALL",
        url:ordersAPIBaseUrl,
        method: "GET",
        async: false,
        success: function (res) {
            allOrders = res.data;
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
        }
    });
}

function getAllOrderDetails() {
    $.ajax({
        url: "http://localhost:8080/pos/orders?option=GET_DETAILS",
        method: "GET",
        async: false,
        success: function (res) {
            allOrderDetails = res.data;
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
        }
    });
}

function clearCmbCustomerId() {
    $(cmbCustomerId).empty();
    $(cmbCustomerId).append(defaultOption);
}

function clearCmbCustomerName() {
    $(cmbCustomerName).empty();
    $(cmbCustomerName).append(defaultOption);
}

function clearCmbItemCode() {
    $(cmbItemCode).empty();
    $(cmbItemCode).append(defaultOption);
}

function clearCmbDescription() {
    $(cmbDescription).empty();
    $(cmbDescription).append(defaultOption);
}

/* --------------------------------------------------------*/

function loadCmbCustomerId() {
    clearCmbCustomerId();

    $.ajax({
        // url: "http://localhost:8080/pos/customer?option=GET_ID_NAME",
        url: customerAPIBaseUrl+"/id_name",
        method: "GET",
        async: false,
        success: function (resp) {
            response = resp;
            for (let c of resp.data) {
                let customer = new Customer(c.customerId);
                newOption = `<option>${customer.getCustomerID()}</option>`;
                $(cmbCustomerId).append(newOption);
            }
            loadCmbCustomerName(resp);
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
        }
    });
}

function loadCmbCustomerName(resp) {
    clearCmbCustomerName();
    /*$.ajax({
        url: "http://localhost:8080/pos/customer?option=GET_ID_NAME",
        method: "GET",
        async: false,
        success: function (resp) {
            for (let c of resp.data) {
                newOption = `<option>${c.name}</option>`;
                $(cmbCustomerName).append(newOption);
            }
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
        }
    });*/
    for (let c of resp.data) {
        newOption = `<option>${c.customerName}</option>`;
        $(cmbCustomerName).append(newOption);
    }
}

function loadCmbItemCode() {
    clearCmbItemCode();

    $.ajax({
        // url: "http://localhost:8080/pos/item?option=GET_CODE_DESCRIP",
        url: itemAPIBaseUrl+"/code_description",
        method: "GET",
        async: false,
        success: function (resp) {
            for (let item of resp.data) {
                newOption = `<option>${item.itemCode}</option>`;
                $(cmbItemCode).append(newOption);
            }
            loadCmbDescription(resp);
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
        }
    });
}

function loadCmbDescription(resp) {
    clearCmbDescription();

    /*$.ajax({
        url: "http://localhost:8080/pos/item?option=GET_CODE_DESCRIP",
        method: "GET",
        async: false,
        success: function (resp) {
            for (let item of resp.data) {
                newOption = `<option>${item.description}</option>`;
                $(cmbDescription).append(newOption);
            }
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
        }
    });*/

    for (let item of resp.data) {
        newOption = `<option>${item.description}</option>`;
        $(cmbDescription).append(newOption);
    }
}

/* ---------------------Load Customer Details-------------*/

function loadCustomerDetails(customer) {
    cmbCustomerId.val(customer.getCustomerID());
    cmbCustomerName.val(customer.getCustomerName());
    txtord_address.val(customer.getCustomerAddress());
    txtord_contact.val(0 + customer.getCustomerContact());
}

$("#cmbCustomerId").click(function () {
    selectedOption = cmbCustomerId.val();
    if (selectedOption != null) {
        $.ajax({
            // url: "http://localhost:8080/pos/customer?option=SEARCH&customerID=" + selectedOption + "&customerName=",
            url: customerAPIBaseUrl+"/"+selectedOption,
            method: "GET",
            success: function (resp) {
                response = resp;
                let customer = new Customer(resp.data.customerId, resp.data.customerName, resp.data.customerAddress, resp.data.customerContact);
                loadCustomerDetails(customer);
            }
        });
    }
});

$("#cmbCustomerName").click(function () {
    selectedOption = cmbCustomerName.val();
    if (selectedOption != null) {
        $.ajax({
            // url: "http://localhost:8080/pos/customer?option=SEARCH&customerID=&customerName=" + selectedOption,
            url: customerAPIBaseUrl+"?name="+selectedOption,
            method: "GET",
            success: function (resp) {
                response = resp;
                let customer = new Customer(resp.data.customerId, resp.data.customerName, resp.data.customerAddress, resp.data.customerContact);
                loadCustomerDetails(customer);
            }
        });
    }
});

/* ---------------------Load Item Details-------------*/

function loadItemDetails(item) {
    cmbItemCode.val(item.getItemCode());
    cmbDescription.val(item.getDescription());
    txtUnitPrice2.val(item.getUnitPrice());

    qtyOnHand = parseInt(item.getQtyOnHand());
    response = isItemAlreadyAddedToCart(item.getItemCode());

    if (response) { // if item is already added to cart
        let rowNo = response;
        let orderedQty = $(`#tblInvoice-body>tr:nth-child(${rowNo})`).children(":nth-child(4)").text();
        txtQtyOnHand.val(qtyOnHand - parseInt(orderedQty));

    } else if (response == false) {
        txtQtyOnHand.val(qtyOnHand);
    }
}

$("#cmbItemCode").click(function () {
    selectedOption = cmbItemCode.val();
    if (selectedOption != null) {
        $.ajax({
            // url: "http://localhost:8080/pos/item?option=SEARCH&itemCode=" + selectedOption + "&description=",
            url: itemAPIBaseUrl+"/"+selectedOption,
            method: "GET",
            success: function (resp) {
                response = resp;
                let item = new Item(resp.data.itemCode, resp.data.description, resp.data.unitPrice, resp.data.qtyOnHand);
                loadItemDetails(item);
                txtOrderQty.removeAttr("disabled");
            }
        });
    }
});

$("#cmbDescription").click(function () {
    selectedOption = cmbDescription.val();
    if (selectedOption != null) {
        $.ajax({
            // url: "http://localhost:8080/pos/item?option=SEARCH&itemCode=&description=" + selectedOption,
            url: itemAPIBaseUrl+"?description="+selectedOption,
            method: "GET",
            success: function (resp) {
                response = resp;
                let item = new Item(resp.data.itemCode, resp.data.description, resp.data.unitPrice, resp.data.qtyOnHand);
                loadItemDetails(item);
                txtOrderQty.removeAttr("disabled");
            }
        });
    }
});

/* ---------------------Clear Fields & Invoice Table-------------*/

function clearItemFields() {
    loadCmbItemCode();
    // loadCmbDescription();
    txtUnitPrice2.val("");
    txtQtyOnHand.val("");
    txtOrderQty.val("").css('border', '1px solid rgb(206, 212, 218)');
    $("#selectItemForm p.errorText").hide();

    disableButton("#btnAddToCart");
}

function clearCustomerFields() {
    loadCmbCustomerId();
    // loadCmbCustomerName();
    txtord_address.val("");
    txtord_contact.val("");
}

function clearInvoiceFields() {
    $("#txtTotal, #txtDiscount, #txtSubTotal, #txtAmountPaid, #txtBalance").val("");

    changeBorderColor("default", $("#txtDiscount"));
    $("#purchaseForm input#txtDiscount+p.errorText").hide();

    changeBorderColor("default", $("#txtAmountPaid"));
    $("#purchaseForm input#txtAmountPaid+p.errorText").hide();

    changeBorderColor("default", $("#txtBalance"));

    disableButton("#btnPurchase");
}

$("#btnClearSelectItemFields").click(function (e) {
    clearItemFields();
});

function clearInvoiceTable() {
    $("#tblInvoice-body").empty();
    noOfRows = 0;
    rowSelected = null;
}

function clearAll() {
    clearCustomerFields();
    clearItemFields();
    clearInvoiceFields();
    clearInvoiceTable();

    date.val("");

    generateNextOrderID();
    disableButton("#btnDeleteOrder");
    $("#txtDiscount").attr("disabled", "disabled");
    $("#txtAmountPaid").attr("disabled", "disabled");
    enableCmbBoxes();

    txtSearchOrder.val("");

    select_OrderDetailRow();
}

$("#btnClearAllFields").click(function (e) {
    clearAll();
});

function disableCmbBoxes() {
    cmbCustomerId.attr("disabled", "disabled");
    cmbCustomerName.attr("disabled", "disabled");
    cmbItemCode.attr("disabled", "disabled");
    cmbDescription.attr("disabled", "disabled");
    $("#txtOrderQty").attr("disabled", "disabled");
    $("#txtDiscount").attr("disabled", "disabled");
    $("#txtAmountPaid").attr("disabled", "disabled");
}

function enableCmbBoxes() {
    cmbCustomerId.removeAttr("disabled");
    cmbCustomerName.removeAttr("disabled");
    cmbItemCode.removeAttr("disabled");
    cmbDescription.removeAttr("disabled");
    $("#txtOrderQty").removeAttr("disabled");
}

/* --------------------Select from Cart------------- */

function select_CartRow() {
    getAllItems();

    $("#tblInvoice-body>tr").click(function (e) {
        enableButton("#btnDeleteFromCart");

        rowSelected = this;
        itemCode = $(this).children(':first-child').text();
        orderQty = $(this).children(':nth-child(4)').text();

        for (let i of allItems) {
            let item = new Item(i.itemCode, i.description, i.unitPrice, i.qtyOnHand);

            if (itemCode === item.getItemCode()) {
                loadItemDetails(item);
                txtOrderQty.val(orderQty);
            }
        }

        $("#btnDeleteFromCart").off("click");
        $("#btnDeleteFromCart").click(function (e) {
            if (rowSelected != null) {
                itemCode = $(rowSelected).children(':first-child').text();

                Swal.fire({
                    text: `Do you really need to Remove Item ${itemCode} from Cart..?`,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Remove',
                    confirmButtonColor: '#e66767',
                    customClass: {
                        cancelButton: 'order-1 right-gap',
                        confirmButton: 'order-2',
                    },
                    allowOutsideClick: false,

                }).then(result => {
                    if (result.isConfirmed) {
                        $(rowSelected).remove();
                        clearItemFields();
                        clearInvoiceFields();
                        rowSelected = null;

                        disableButton("#btnDeleteFromCart");
                        noOfRows--;
                        calculate_OrderCost();
                        reset_InvoiceOnCartUpdate();
                    }
                });

            } else {
                alertText = "Please select a row to delete...";
                display_Alert("", alertText, "warning");
            }
        });
        validate_OrderQty(parseInt(txtOrderQty.val()), txtOrderQty);
    });
}

/* ------------------------Add To Cart------------ */

function validate_OrderQty(input, txtField) {
    orderQty = txtOrderQty.val();
    qtyOnHand = parseInt(txtQtyOnHand.val());

    if (regExQty.test(input)) {

        if (input < qtyOnHand) {
            changeBorderColor("valid", txtField);
            $("#selectItemForm p.errorText").hide();
            enableButton("#btnAddToCart");

        } else if (input > qtyOnHand) {
            changeBorderColor("invalid", txtField);
            $("#selectItemForm p.errorText").show();
            $("small#errorQty").text("Please enter an amount lower than " + qtyOnHand);
            disableButton("#btnAddToCart");

        }

    } else {
        changeBorderColor("invalid", txtField);
        $("#selectItemForm p.errorText").show();
        // $("small#errorQty").text("Please enter an amount lower than "+qtyOnHand);
        $("small#errorQty").text("Please enter only numbers");
        disableButton("#btnAddToCart");
    }
}

function isItemAlreadyAddedToCart(code) {
    let codeInCart;
    let rowNo = 1;
    do {
        codeInCart = $(`#tblInvoice-body>tr:nth-child(${rowNo})`).children(":nth-child(1)").text();
        if (code == codeInCart) {
            return rowNo; // if item is already added to cart
        }
        rowNo++;
    } while (codeInCart != "");
    return false; // if item is not yet added to the cart
}

function addToCart() {
    itemCode = cmbItemCode.val();
    description = cmbDescription.val();
    unitPrice = parseFloat(txtUnitPrice2.val());
    orderQty = parseInt(txtOrderQty.val());
    total = parseFloat(unitPrice * orderQty);
    qtyOnHand = txtQtyOnHand.val();

    response = isItemAlreadyAddedToCart(itemCode);

    if (response) { // if item is already added to cart

        let rowToUpdate = $(`#tblInvoice-body>tr:nth-child(${response})`);
        let prevQty = parseInt(rowToUpdate.children(":nth-child(4)").text());
        rowToUpdate.children(":nth-child(4)").text(prevQty + orderQty);
        rowToUpdate.children(":nth-child(5)").text(parseFloat((prevQty + orderQty) * unitPrice).toFixed(2));

    } else if (response === false) { // if item is not yet added to the cart

        newRow = `<tr>
                    <td>${itemCode}</td>
                    <td>${description}</td>
                    <td>${txtUnitPrice2.val()}</td>
                    <td>${txtOrderQty.val()}</td>
                    <td>${parseFloat(total).toFixed(2)}</td>
                 </tr>`;

        $("#tblInvoice-body").append(newRow);
        noOfRows++;
    }
    clearItemFields();
    disableButton("#btnDeleteFromCart");

    $("#txtDiscount").removeAttr("disabled");
    $("#txtAmountPaid").removeAttr("disabled");

    calculate_OrderCost();
    calculate_subTotal($("#txtDiscount").val());

    reset_InvoiceOnCartUpdate();
}

$("#txtOrderQty").keyup(function (e) {
    validate_OrderQty(txtOrderQty.val(), txtOrderQty);

    if (e.code === "Enter" && isBorderGreen(this)) {
        addToCart();
        rowSelected = null;
    }
    select_CartRow();

    $("#tblInvoice-body>tr").off("dblclick");
    delete_cartRowOnDblClick();
});

$("#btnAddToCart").click(function (e) {
    if (isBorderGreen(txtOrderQty)) {
        addToCart();
        rowSelected = null;
    }
    select_CartRow();
    delete_cartRowOnDblClick();
});

/* ------------------------Delete from Cart------------ */

function delete_cartRowOnDblClick() {
    $("#tblInvoice-body>tr").off("dblclick");
    $("#tblInvoice-body>tr").dblclick(function () {
        itemCode = $(rowSelected).children(':first-child').text();

        Swal.fire({
            text: `Do you really need to Remove Item ${itemCode} from Cart..?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Remove',
            confirmButtonColor: '#e66767',
            customClass: {
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
            },
            allowOutsideClick: false,

        }).then(result => {
            if (result.isConfirmed) {
                $(rowSelected).remove();
                clearItemFields();
                clearInvoiceFields();
                rowSelected = null;

                disableButton("#btnDeleteFromCart");
                noOfRows--;
                calculate_OrderCost();
                reset_InvoiceOnCartUpdate();
            }
        });
    });
}

/* ---------------Calculate Order Total, Subtotal, Balance------------------ */

function reset_InvoiceOnCartUpdate() {
    if (noOfRows == 0) {
        $("#txtDiscount").val("");
    }

    $("#txtAmountPaid, #txtBalance").val("");
    changeBorderColor("default", $("#txtBalance"));
    changeBorderColor("default", $("#txtAmountPaid"));
}

function calculate_OrderCost() {
    cartTotal = 0.00;
    let colTotal = 0; // column "Total" in Table
    let rowNo = 1;

    if (noOfRows == 0) {
        $("#txtTotal").val("0.00");
        cartTotal = 0;

    } else {
        do {
            colTotal = parseFloat($(`#tblInvoice-body>tr:nth-child(${rowNo})`).children(":nth-child(5)").text());
            cartTotal += parseFloat(colTotal);
            $("#txtTotal").val(parseFloat(cartTotal).toFixed(2));
            rowNo++;

        } while (rowNo <= noOfRows);
    }
    calculate_subTotal($("#txtDiscount").val());
}

function calculate_subTotal(discount) {

    if ($("#txtDiscount").val() == '') {
        subTotal = cartTotal;
        $("#txtSubTotal").val(parseFloat(subTotal).toFixed(2));
        return;
    }

    subTotal = cartTotal * (100 - discount) / 100;
    $("#txtSubTotal").val(parseFloat(subTotal).toFixed(2));
}

function validate_Discount_Cash(input, txtField, txtFieldId) {  // validate discount & cash fields

    if (regEx_Discount_Cash.test(input)) {
        changeBorderColor("valid", txtField);
        $(`#purchaseForm input${txtFieldId}+p.errorText`).hide();
        return true;

    } else {
        changeBorderColor("invalid", txtField);
        $(`#purchaseForm input${txtFieldId}+p.errorText`).show();
        $(`#purchaseForm input${txtFieldId}+p.errorText small`).text(" Enter Only Numbers");

        return false;
    }
}

function calculate_Balance(amountPaid) {
    balance = parseFloat(amountPaid - subTotal).toFixed(2);

    $("#txtBalance").val(balance);

    if (balance < 0) {
        changeBorderColor("invalid", $("#txtAmountPaid"));
        changeBorderColor("invalid", $("#txtBalance"));
        $("#purchaseForm input#txtAmountPaid+p.errorText").show();
        $("small#errorPaid").text("Insufficient Credit");

    } else {
        changeBorderColor("valid", $("#txtAmountPaid"));
        changeBorderColor("default", $("#txtBalance"));
        $("#purchaseForm input#txtAmountPaid+p.errorText").hide();

        enableButton("#btnPurchase");
    }
}

$("#txtDiscount, #txtAmountPaid").keydown(function (e) {
    if (e.key === "Tab") {
        e.preventDefault();
    }
});

$("#txtDiscount").keyup(function (e) {
    discount = $("#txtDiscount").val();
    validate_Discount_Cash(discount, $("#txtDiscount"), "#txtDiscount");
    calculate_subTotal(discount);
    if (e.code === "Enter" && isBorderGreen(this)) {
        $("#txtAmountPaid").focus();
    }
});

$("#txtAmountPaid").keyup(function (e) {
    amountPaid = $("#txtAmountPaid").val();
    isValid = validate_Discount_Cash(amountPaid, $("#txtAmountPaid"), "#txtAmountPaid");

    if (isValid) {
        calculate_Balance(amountPaid);
        if (e.code === "Enter" && isBorderGreen(this)) {
            $("#btnPurchase").focus();
        }
    }
});

function transaction() {

    let rowNo = 1;
    let orderDetail;

    $.ajax({
        url: "orders",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(orderObj),
        async: false,
        success: function (resp1) {
            console.log(4);
            response = resp1;
            if (resp1.status === 200) {
                console.log(5);
                // toastr.success(resp.message);
                if (resp1.message === "O_ACCEPTED") {
                    console.log("order ACCEPTED");

                    if (noOfRows === 0) {
                        alert("Empty Table..");

                    } else {
                        getAllItems();
                        do {
                            itemCode = $(`#tblInvoice-body>tr:nth-child(${rowNo})`).children(":nth-child(1)").text();
                            orderQty = $(`#tblInvoice-body>tr:nth-child(${rowNo})`).children(":nth-child(4)").text();

                            orderDetail = new OrderDetails(orderId, itemCode, orderQty);

                            $.ajax({
                                url: "orderDetails",
                                method: "POST",
                                contentType: "application/json",
                                data: JSON.stringify(
                                    {
                                        orderId: orderDetail.getOrderId(),
                                        itemCode: orderDetail.getItemCode(),
                                        orderQty: orderDetail.getOrderQty()
                                    }
                                ),
                                success: function (resp2) {
                                    response = resp2;
                                    if (resp2.status === 200) {
                                        // toastr.success(resp2.message);
                                        if (resp2.message === "D_ACCEPTED") {
                                            //
                                        }
                                    } else {
                                        toastr.error(resp2.message);
                                    }
                                },
                                error: function (ob, textStatus, error) {
                                    console.log(ob);
                                }
                            });

                            for (let i of allItems) {
                                let item = new Item(i.itemCode, i.description, i.unitPrice, i.qtyOnHand);
                                if (item.getItemCode() === itemCode) {
                                    qtyOnHand = item.getQtyOnHand();
                                }
                            }

                            let index = 0;

                            for (let i in allItems) {
                                // let item = new Item(i.itemCode, i.description, i.unitPrice, i.qtyOnHand);
                                if (allItems[i].id === itemCode) {
                                    qtyOnHand = allItems[i].qtyOnHand;
                                    index = i;
                                }
                            }

                            rowNo++;

                        } while (rowNo <= noOfRows);
                    }
                }
            } else {
                console.log(6);
                toastr.error(resp.message);
            }

        },
        error: function (ob, textStatus, error) {
            console.log(7);
            console.log(ob);
            alert(textStatus);
        }
    });
}

/* --------------------Place Order------------------------ */

/*function place_Order(orderId) {
    customerId = cmbCustomerId.val();
    // let newOrder = new Orders(orderId, date.val(), subTotal, discount, customerId);

    /!*let orderObj = {
        orderId: newOrder.getOrderId(),
        date: newOrder.getOrderDate(),
        // subTotal: parseFloat(newOrder.getOrderCost()).toFixed(2),
        // subTotal: subTotal.toFixed(2),
        subTotal: newOrder.getOrderCost().toFixed(2),
        discount: newOrder.getOrderDiscount(),
        customerId: newOrder.getCustomerID()
        // setAutoCommit: "FALSE"
    }*!/

    let orderObj = {
        orderId: orderId,
        date: date.val(),
        subTotal: subTotal.toFixed(2),
        discount: discount,
        customerId: customerId
    }

    // transaction();

    $.ajax({
        url: "orders",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(orderObj),
        async: false,
        success: function (resp1) {
            response = resp1;
            if (resp1.status === 200) {
                toastr.success(resp1.message);

            } else {
                toastr.error(resp1.message);
            }
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
            alert(textStatus);
        }
    });

    let rowNo = 1;
    let orderDetail;

    if (noOfRows === 0) {
        alert("Empty Table..");

    } else {
        getAllItems();
        do {
            itemCode = $(`#tblInvoice-body>tr:nth-child(${rowNo})`).children(":nth-child(1)").text();
            orderQty = $(`#tblInvoice-body>tr:nth-child(${rowNo})`).children(":nth-child(4)").text();

            orderDetail = new OrderDetails(orderId, itemCode, orderQty);
            // orderDetailDB.push(orderDetail);
            console.log(orderId);

            $.ajax({
                url: "orderDetails",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(
                    {
                        orderId: orderDetail.getOrderId(),
                        itemCode: orderDetail.getItemCode(),
                        orderQty: orderDetail.getOrderQty(),
                    }
                ),
                success: function (resp) {
                    response = resp;
                    if (resp.status === 200) {
                        toastr.success(resp.message);
                    } else {
                        toastr.error(resp.message);
                    }
                },
                error: function (ob, textStatus, error) {
                    console.log(ob);
                }
            });

            for (let i of allItems) {
                let item = new Item(i.itemCode, i.description, i.unitPrice, i.qtyOnHand);
                if (item.getItemCode() === itemCode) {
                    qtyOnHand = item.getQtyOnHand();
                    console.log(qtyOnHand);
                }
            }

            let index = 0;

            for (let i in allItems) {
                // let item = new Item(i.itemCode, i.description, i.unitPrice, i.qtyOnHand);
                if (allItems[i].id === itemCode) {
                    qtyOnHand = allItems[i].qtyOnHand;
                    index = i;
                }
            }

            let newQtyOnHand = qtyOnHand - parseInt(orderQty);

            let itemObj = {
                itemCode: itemCode,
                description: allItems[index].description,
                unitPrice: allItems[index].unitPrice,
                // qty: `${newQtyOnHand}`
                // qty: String{newQtyOnHand}
                qty: newQtyOnHand.toString()
            }

            updateItem(itemObj);
            loadAllItems();
            rowNo++;

        } while (rowNo <= noOfRows);
    }
    select_OrderDetailRow();
    select_ItemRow();
}*/

function place_Order(orderId) {
    let rowNo = 1;

    let array_OrderDetail = [];
    let array_UpdateQtyDetail = [];

    getAllItems();

    if (noOfRows === 0) {
        toastr.error("Your Cart is Empty..!!!");

    } else {
        do {
            qtyOnHand = 0;
            itemCode = $(`#tblInvoice-body>tr:nth-child(${rowNo})`).children(":nth-child(1)").text();
            orderQty = $(`#tblInvoice-body>tr:nth-child(${rowNo})`).children(":nth-child(4)").text();

            array_OrderDetail.push(
                {
                    orderId: orderId,
                    itemCode: itemCode,
                    orderQty: orderQty
                }
            );

            //--------------------------Update QtyOnHand---------------------------------------

            /*let index = 0;
            for (let i in allItems) {
                if (allItems[i].itemCode === itemCode) {
                    qtyOnHand = allItems[i].qtyOnHand;
                    index = i;
                }
            }

            let newQtyOnHand = qtyOnHand - parseInt(orderQty);
            array_UpdateQtyDetail.push(
                {
                    itemCode: itemCode,
                    qtyOnHand: newQtyOnHand
                }
            )*/
            rowNo++;
        } while (rowNo <= noOfRows);

        console.log(array_OrderDetail);
        console.log(array_UpdateQtyDetail);

        customerId = cmbCustomerId.val();

        let purchaseDetails = {
            orderId: orderId,
            orderDate: date.val(),
            orderCost: subTotal.toFixed(2),
            discount: discount,
            // customer: customerId,
            // customer: new Customer(cmbCustomerId.val(),cmbCustomerName.val(),txtord_address.val(),txtord_contact.val()),
            customer:
                {
                    customerId:cmbCustomerId.val(),
                    customerName: cmbCustomerName.val(),
                    customerAddress: txtord_address.val(),
                    customerContact: txtord_contact.val()
                },
            orderDetails: array_OrderDetail
        }

        console.log(purchaseDetails);

        $.ajax({
            // url: "http://localhost:8080/pos/orders",
            url: ordersAPIBaseUrl,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(purchaseDetails),
            async: false,
            success: function (resp) {
                response = resp
                if (resp.code === 201) {
                    // toastr.success(resp.message);

                    swal({
                        title: 'Order Placed Successfully!',
                        text: "Order  " + orderId + "  Placed.",
                        icon: 'success',
                        buttons: ["OK"],
                        timer: 2000,
                        closeModal: true,
                    });

                    // -Update QtyOnHand if Order Placed Successfully-

                    /*console.log("before update qty");
                    for (let i in array_UpdateQtyDetail) {
                        console.log(1);
                        for (let j of allItems) {
                            if (array_UpdateQtyDetail[i].itemCode === j.itemCode) {
                                console.log(2);
                                let itemObj = {
                                    itemCode: j.itemCode,
                                    description: j.description,
                                    unitPrice: j.unitPrice,
                                    qtyOnHand: array_UpdateQtyDetail[i].qtyOnHand.toString()
                                }
                                console.log(3);
                                console.log(itemObj)
                                updateItem(itemObj);
                            }
                        }
                    }*/

                } else {
                    toastr.error(resp.message);
                }
            },
            error: function (ob, textStatus, error) {
                console.log(ob);
                toastr.error(ob.responseJSON.message);
            }
        });
    }
    select_OrderDetailRow();
    select_ItemRow();
}

function reset_Forms() {
    date.val("");

    clearCustomerFields();
    clearItemFields();
    clearInvoiceFields();
}

function reset_Table() {
    $("#tblInvoice-body>tr").remove();
    noOfRows = 0;
}

function load_TblCustomerOrder() {
    $("#tblOrders-body").empty();
    getAllCustomers();
    getAllOrders();
    // getAllOrderDetails();

    $.ajax({
        // url: "http://localhost:8080/pos/orders?option=GETALL",
        url: ordersAPIBaseUrl,
        method: "GET",
        async: false,
        success: function (res) {
            response = res;
            for (let o of res.data) {
                // let order = new Orders(o.orderId, o.orderDate, o.orderCost, o.discount, o.customerId);
                let order = new Orders(o.orderId, o.orderDate, o.orderCost, o.discount, o.customer.customerId);
                let c = o.customer;
                let customer = new Customer(c.customerId, c.customerName, c.customerAddress, c.customerContact);
                // for (let c of allCustomers) {
                //     let customer = new Customer(c.customerId, c.customerName, c.customerAddress, c.customerContact);
                //
                //     if (order.getCustomerID() === customer.getCustomerID()) {
                //         newRow = `<tr>
                //              <td>${order.getOrderId()}</td>
                //              <td>${order.getCustomerID()}</td>
                //              <td>${customer.getCustomerName()}</td>
                //              <td>0${customer.getCustomerContact()}</td>
                //              <td>${parseFloat(order.getOrderCost()).toFixed(2)}</td>
                //              <td>${order.getOrderDate()}</td>
                //          </tr>`;
                //     }
                // }

                newRow = `<tr>
                     <td>${order.getOrderId()}</td>
                     <td>${order.getCustomerID()}</td>
                     <td>${customer.getCustomerName()}</td>
                     <td>0${customer.getCustomerContact()}</td>
                     <td>${parseFloat(order.getOrderCost()).toFixed(2)}</td>
                     <td>${order.getOrderDate()}</td>
                 </tr>`;

                $("#tblOrders-body").append(newRow);
            }
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
        }
    });
}

$("#btnPurchase").click(function (e) {
    if (cmbCustomerId.val() == null) {
        alertText = "Please select a Customer....";
        display_Alert("", alertText, "warning");

    } else if (date.val() === "") {
        alertText = "Please select a Date....";
        display_Alert("", alertText, "warning");

    } else {
        Swal.fire({
            text: "Are you sure you want to Place this Order..?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Purchase',
            confirmButtonColor: '#ff7f50',
            customClass: {
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
            },
            allowOutsideClick: false,
            returnFocus: false,

        }).then(result => {
            if (result.isConfirmed) {
                place_Order(orderId.val());
                load_TblCustomerOrder();
                generateNextOrderID();

                reset_Forms();
                reset_Table();

                select_OrderDetailRow();
                select_ItemRow();
            }
        });
    }
});

/* ------------------Search Order------------------------- */

// find() --> looks at the children of the current selection for a match
// filter() --> looks at the current selection for a match
// each()-->  used to iterate over any collection, whether it is an object or an array. 

/* --------------------------------------------------------------*/

$("#txtSearchOrder").keyup(function (e) {
    searchValue = $(this).val();

    $("#tblOrders-body>tr").each(function () {
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

/* ------------Load Order Details when OrderID is selected-----------*/

function select_OrderDetailRow() {
    $("#tblOrders-body>tr").off("click");
    $("#tblOrders-body>tr").click(function (e) {

        clearInvoiceTable();
        disableCmbBoxes();

        rowSelected = this;
        let orderID = $(this).children(":nth-child(1)").text();

        let order_obj;
        let cust_obj;
        let item_obj = null;

        let orderDetail_arr = [];

        getAllOrders();
        // getAllCustomers();
        getAllItems();
        // getAllOrderDetails();

        for (let obj of allOrders) {
            if (obj.orderId === orderID) {
                order_obj = obj;
            }
        }
        cust_obj = order_obj.customer;
        orderDetail_arr = order_obj.orderDetails;

        /*for (let obj of allCustomers) {
            if (order_obj.customerId === obj.id) {
                cust_obj = obj;
            }
        }

        let index = 0;
        for (let i in allOrderDetails) {
            if (orderID === allOrderDetails[i].orderId) {
                orderDetail_arr[index++] = allOrderDetails[i];
            }
        }*/

        orderId.val(orderID);
        date.val(order_obj.orderDate);

        /*cmbCustomerId.val(cust_obj.id);
        cmbCustomerName.val(cust_obj.name);
        txtord_address.val(cust_obj.address)
        txtord_contact.val("0" + cust_obj.contact);*/

        cmbCustomerId.val(cust_obj.customerId);
        cmbCustomerName.val(cust_obj.customerName);
        txtord_address.val(cust_obj.customerAddress)
        txtord_contact.val("0" + cust_obj.customerContact);

        for (let i = 0; i < orderDetail_arr.length; i++) {
            for (let obj of allItems) {
                if (orderDetail_arr[i].itemCode === obj.itemCode) {
                    item_obj = obj;
                }
            }

            let unitPrice = item_obj.unitPrice;
            orderQty = orderDetail_arr[i].orderQty;
            total = unitPrice * orderQty;

            newRow = `<tr>
                        <td>${item_obj.itemCode}</td>
                        <td>${item_obj.description}</td>
                        <td>${unitPrice}</td>
                        <td>${orderQty}</td>
                        <td>${parseFloat(total).toFixed(2)}</td>
                    </tr>`;

            $("#tblInvoice-body").append(newRow);
            noOfRows++;
        }

        calculate_OrderCost();
        discount = order_obj.discount;
        $("#txtDiscount").val(discount)
        calculate_subTotal(discount);
        enableButton("#btnDeleteOrder");


        $("#btnDeleteOrder").off("click");
        /* ------------------Delete Order------------*/
        $("#btnDeleteOrder").click(function (e) {
            deleteOrder(orderId.val());
        });

        $("#tblOrders-body>tr").off("dblclick");
        delete_OrderRowOnDblClick();
    });
}

function delete_OrderRowOnDblClick() {

    $("#tblOrders-body>tr").dblclick(function () {
        rowSelected = $(this);
        let orderID = $(this).children(":nth-child(1)").text();
        deleteOrder(orderID);
    });

}

/* -------------------------------Delete Order------------------------*/

function deleteOrder(orderID) {
    Swal.fire({
        text: "Are you sure you want to Delete this Order..?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#e66767',
        customClass: {
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
        },
        allowOutsideClick: false,

    }).then(result => {
        if (result.isConfirmed) {
            $.ajax({
                // url: "http://localhost:8080/pos/orders?orderId=" + orderID,
                url: ordersAPIBaseUrl+"?orderId=" + orderID,
                method: "DELETE",
                async: false,
                success: function (resp) {
                    if (resp.code === 200) {
                        swal({
                            title: 'Deleted!',
                            text: "Order  " + orderID + "  Deleted.",
                            icon: 'success',
                            buttons: ["OK"],
                            timer: 2000,
                            closeModal: true,
                        });
                        getOrderCount();

                    } else if (resp.code === 400) {
                        toastr.error(resp.message);

                    } else {
                        toastr.error(resp.message);
                    }
                },
                error: function (ob, textStatus, error) {
                    // console.log(ob);
                    toastr.error(ob.responseJSON.message);
                }
            });
            load_TblCustomerOrder();
            clearAll();
        }
    });
}

