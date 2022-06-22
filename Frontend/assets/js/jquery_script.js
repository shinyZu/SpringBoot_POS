/* ----------------------------------------------------------------Navigation-----------------------------------------------------------*/

$("#nav-home").click(function () {
    console.log("inside Home");

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
    console.log("inside Manage Customers");

    $("title").text("Customers");

    $("#home-main").css('display', 'none');
    $("#customer-main").css('display', 'block');
    $("#store-main").css('display', 'none');
    $("#orders-main").css('display', 'none');

    $("#nav-home a").removeClass("active");
    $("#nav-customer a").addClass("active");
    $("#nav-store a").removeClass("active");
    $("#nav-orders a").removeClass("active");

});

$("#nav-store").click(function () {
    console.log("inside Manage Store");

    $("title").text("Store");

    $("#home-main").css('display', 'none');
    $("#customer-main").css('display', 'none');
    $("#store-main").css('display', 'block');
    $("#orders-main").css('display', 'none');

    $("#nav-home a").removeClass("active");
    $("#nav-customer a").removeClass("active");
    $("#nav-store a").addClass("active");
    $("#nav-orders a").removeClass("active");

});

$("#nav-orders").click(function () {
    console.log("inside Manage Invoice");

    $("title").text("Orders");

    $("#home-main").css('display', 'none');
    $("#customer-main").css('display', 'none');
    $("#store-main").css('display', 'none');
    $("#orders-main").css('display', 'block');

    $("#nav-home a").removeClass("active");
    $("#nav-customer a").removeClass("active");
    $("#nav-store a").removeClass("active");
    $("#nav-orders a").addClass("active");

});

/* -------------------------------------------------------------------------------Manage Customer - Events-------------------------------------------------------------- */
var rowSelected;

let customerId;
let customerName;
let customerAddress;
let customerContact;

/* When/after a new Customer is Saved:
    1. add Customer to table
    2. fill input fields when a row is selected
    3. delete the selected Customer from the table
*/

$("#btnSaveCustomer").click(function () {
    console.log("Save btn clicked");

    customerId = $("#txtCustomerId").val();
    customerName = $("#txtCustomerName").val();
    customerAddress = $("#txtAddress").val();
    customerContact = $("#txtContact").val();

    $("#tblCustomer-body").append(
        `<tr>
            <td>${customerId}</td>
            <td>${customerName}</td>
            <td>${customerAddress}</td>
            <td>${customerContact}</td>
        </tr>`
    );

    $("#tblCustomer-body>tr").off();
    $("#tblCustomer-body>tr").click(function () {

        // console.log(this);
        // console.log($(this).children(':nth-child(1)').text());
        // console.log($(this).children(':nth-child(2)').text());
        // console.log($(this).children(':nth-child(3)').text());
        // console.log($(this).children(':nth-child(4)').text());

        rowSelected = this;

        customerId = $(this).children(':nth-child(1)').text();
        customerName = $(this).children(':nth-child(2)').text();
        customerAddress = $(this).children(':nth-child(3)').text();
        customerContact = $(this).children(':nth-child(4)').text();

        console.log(customerId,customerName,customerAddress,customerContact);

        $("#txtCustomerId").val(customerId);
        $("#txtCustomerName").val(customerName);
        $("#txtAddress").val(customerAddress);
        $("#txtContact").val(customerContact);

        $("#btnDeleteCustomer").click(function () { 
            console.log("Delete btn clicked");
            $(rowSelected).remove();
            
            // Clear fields after Customer is deleted
            $("#txtCustomerId").val("");
            $("#txtCustomerName").val("");
            $("#txtAddress").val("");
            $("#txtContact").val("");
        });
    });

});

/* When selected an already existing Customer from the table
    1. fill input fields when a row is selected
    2. delete the selected Customer from the table
*/

$("#tblCustomer-body>tr").click(function () {
    // console.log(this);
    // console.log($(this).children(':nth-child(1)').text());
    // console.log($(this).children(':nth-child(2)').text());
    // console.log($(this).children(':nth-child(3)').text());
    // console.log($(this).children(':nth-child(4)').text());

    rowSelected = this;
    // console.log(rowSelected);

    customerId = $(this).children(':nth-child(1)').text();
    customerName = $(this).children(':nth-child(2)').text();
    customerAddress = $(this).children(':nth-child(3)').text();
    customerContact = $(this).children(':nth-child(4)').text();

    console.log(customerId,customerName,customerAddress,customerContact);

    $("#txtCustomerId").val(customerId);
    $("#txtCustomerName").val(customerName);
    $("#txtAddress").val(customerAddress);
    $("#txtContact").val(customerContact);

    $("#btnDeleteCustomer").click(function () { 
        console.log("Delete btn clicked");
        $(rowSelected).remove();
        
        // Clear fields after Customer is deleted
        $("#txtCustomerId").val("");
        $("#txtCustomerName").val("");
        $("#txtAddress").val("");
        $("#txtContact").val("");
    });
});

/* -----Jump to next input field on Enter -----*/

/*$("#txtCustomerId").keydown(function (e) { 
    console.log(`keyCode : ${e.keyCode}\nkey : ${e.key}\ncode : ${e.code}`);
});*/

function addCustomer(e){
    if (e.code === "Enter"){
        customerId = $("#txtCustomerId").val();
        customerName = $("#txtCustomerName").val();
        customerAddress = $("#txtAddress").val();
        customerContact = $("#txtContact").val();

        $("#tblCustomer-body").append(
            `<tr>
                <td>${customerId}</td>
                <td>${customerName}</td>
                <td>${customerAddress}</td>
                <td>${customerContact}</td>
            </tr>`
        );
    }
}

/* $("#txtCustomerId").keydown(function (e) { 
    if (e.code === "Enter"){
        $("#txtCustomerName").focus();
    }
});

$("#txtCustomerName").keydown(function (e) { 
    if (e.code === "Enter"){
        $("#txtAddress").focus();
    }
});

$("#txtAddress").keydown(function (e) { 
    if (e.code === "Enter"){
        $("#txtContact").focus();
    }
});

$("#txtContact").keydown(function (e) { 
    addCustomer(e);
}); */

/* ---Using Switch---- */

const customerInputs = [txtCustomerId, txtCustomerName, txtAddress, txtContact]

customerInputs.forEach((item) => {
            
    $(item).keydown(function (e) { 

        switch (true) {
            case $("#txtCustomerId").is(':focus') && e.code === "Enter":
                $("#txtCustomerName").focus();
                console.log(item);
                break;

            case $("#txtCustomerName").is(':focus') && e.code === "Enter":
                $("#txtAddress").focus();
                console.log(item);
                break;

            case $("#txtAddress").is(':focus') && e.code === "Enter":
                $("#txtContact").focus();
                console.log(item);
                break;

            case $("#txtContact").is(':focus') && e.code === "Enter":
                addCustomer(e);
                console.log(item);
                break;
        
            default:
                break;
        }
    });
});


/* When Clear button is clicked*/

$("#btnClearFields").click(function () {
    console.log("Clear btn clicked");

    $("#txtCustomerId").val("");
    $("#txtCustomerName").val("");
    $("#txtAddress").val("");
    $("#txtContact").val("");

});

/* -------------------------------------------------------------------------------Manage Store - Events-------------------------------------------------------------- */

var itemCode;
var description;
var unitPrice;
var qty;

/* When/after a new Item is Saved:
    1. add Item to table
    2. fill input fields when a row is selected
    3. delete the selected Item from the table
    4. jump to next input field on Enter
*/

$(".btnSaveItem").click(function () { 
    console.log("Save Item btn clicked");

    itemCode = $("#txtItemCode").val();
    description = $("#txtDescription").val();
    unitPrice = $("#txtUnitPrice").val();
    qty = $("#txtQty").val();

    $("#tblItem-body").append(
        `<tr>
            <td>${itemCode}</td>
            <td>${description}</td>
            <td>${unitPrice}.00</td>
            <td>${qty}</td>
        </tr>`
     );

     $("#tblItem-body>tr").off();
     $("#tblItem-body>tr").click(function () { 
        // console.log(this);
        // console.log($(this).children());
        // console.log($(this).children(':first-child').text());

        rowSelected = this;
    
        itemCode = $(this).children(':first-child').text();
        description = $(this).children(':nth-child(2)').text();
        unitPrice = $(this).children(':nth-child(3)').text();
        qty = $(this).children(':last-child').text();

        console.log(itemCode,description,unitPrice,qty);
    
        $("#txtItemCode").val(itemCode);
        $("#txtDescription").val(description);
        $("#txtUnitPrice").val(unitPrice);
        $("#txtQty").val(qty);

        $("#btnDeleteItem").click(function () { 
            console.log("Delete btn clicked");
            $(rowSelected).remove();
            
            // Clear fields after Customer is deleted
            $("#txtItemCode").val('');
            $("#txtDescription").val('');
            $("#txtUnitPrice").val('');
            $("#txtQty").val('');
        });
    });

    $("#cmbItemCode").append(
        `<option>${itemCode}</option>`
    );

    $("#cmbDescription").append(
        `<option>${description}</option>`
    );
});

/* When selected an already existing Item from the table
    1. fill input fields when a row is selected
    2. delete the selected Item from the table
*/

$("#tblItem-body>tr").click(function () { 
    // console.log(this);
    // console.log($(this).children());
    // console.log($(this).children(':first-child').text());

    rowSelected = this;

    itemCode = $(this).children(':first-child').text();
    description = $(this).children(':nth-child(2)').text();
    unitPrice = $(this).children(':nth-child(3)').text();
    qty = $(this).children(':last-child').text();

    console.log(itemCode,description,unitPrice,qty);

    $("#txtItemCode").val(itemCode);
    $("#txtDescription").val(description);
    $("#txtUnitPrice").val(unitPrice);
    $("#txtQty").val(qty);

    $("#btnDeleteItem").click(function () { 
        console.log("Delete btn clicked");
        $(rowSelected).remove();
        
        // Clear fields after Customer is deleted
        $("#txtItemCode").val('');
        $("#txtDescription").val('');
        $("#txtUnitPrice").val('');
        $("#txtQty").val('');
    });
});

/* -----Jump to next input field on Enter -----*/

/*$("#txtItemCode").keydown(function (e) { 
    console.log(`keyCode : ${e.keyCode}\nkey : ${e.key}\ncode : ${e.code}`);
});*/

function addItem(e){
    if (e.code === "Enter"){
        itemCode = $("#txtItemCode").val();
        description = $("#txtDescription").val();
        unitPrice = $("#txtUnitPrice").val();
        qty = $("#txtQty").val();

        $("#tblItem-body").append(
            `<tr>
                <td>${itemCode}</td>
                <td>${description}</td>
                <td>${unitPrice}.00</td>
                <td>${qty}</td>
            </tr>`
        );
    }
}

/* $("#txtItemCode").keydown(function (e) { 
    if (e.code === "Enter"){
        $("#txtDescription").focus();
    }
});

$("#txtDescription").keydown(function (e) { 
    if (e.code === "Enter"){
        $("#txtUnitPrice").focus();
    }
});

$("#txtUnitPrice").keydown(function (e) { 
    if (e.code === "Enter"){
        $("#txtQty").focus();
    }
});

$("#txtQty").keydown(function (e) { 
    if (e.code === "Enter"){
        addItem(e);
    }
}); */

const itemInputs = [txtItemCode, txtDescription, txtUnitPrice, txtQty]

itemInputs.forEach((item) => {
            
    $(item).keydown(function (e) { 

        switch (true) {
            case $("#txtItemCode").is(':focus') && e.code === "Enter":
                $("#txtDescription").focus();
                console.log(item);
                break;

            case $("#txtDescription").is(':focus') && e.code === "Enter":
                $("#txtUnitPrice").focus();
                console.log(item);
                break;

            case $("#txtUnitPrice").is(':focus') && e.code === "Enter":
                $("#txtQty").focus();
                console.log(item);
                break;

            case $("#txtQty").is(':focus') && e.code === "Enter":
                addItem(e);
                console.log(item);
                break;
        
            default:
                break;
        }
    });
});

/* When Clear button is clicked*/

$("#btnClearItemFields").click(function () { 
    $("#txtItemCode").val('');
    $("#txtDescription").val('');
    $("#txtUnitPrice").val('');
    $("#txtQty").val('');
    
});

/* -------------------------------------------------------------------------------Manage Invoice - Events-------------------------------------------------------------- */
// unitPrice * qtyOrdered
var total;

/* When/after an Item is Added To Cart:
    1. add Item to table
*/

$("#btnAddToCart").click(function () { 
    console.log("Add to Cart btn clicked");

    // console.log($("#cmbItemCode").val());
    
    itemCode = $("#cmbItemCode").val();
    description = $("#cmbDescription").val();
    unitPrice = $("#txtUnitPrice2").val();
    qty = $("#txtOrderQty").val();
    total = unitPrice * qty;

    $("#tblInvoice-body").append(
        `<tr>
            <td>${itemCode}</td>
            <td>${description}</td>
            <td>${unitPrice}.00</td>
            <td>${qty}</td>
            <td>${total}.00</td>
         </tr>`
    );

});

/* When Clear button is clicked*/

$("#btnClearSelectItemFields").click(function () { 
    $("#cmbItemCode").val('I001');
    $("#cmbDescription").val('Rice');
    $("#txtUnitPrice2").val('');
    $("#txtOrderQty").val('');
});