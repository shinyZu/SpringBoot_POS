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

let email;
let pwd;

let reply;

let customerAPIBaseUrl = "http://localhost:8080/springBackend/api/pos/customer";
let itemAPIBaseUrl = "http://localhost:8080/springBackend/api/pos/item";
let ordersAPIBaseUrl = "http://localhost:8080/springBackend/api/pos/orders";

getCustomerCount();
getItemCount();
getOrderCount();

/*console.log(localStorage.getItem("email"));
console.log(localStorage.getItem("pwd"));*/

function getCustomerCount() {
   /* email = localStorage.getItem("email");
    pwd = localStorage.getItem("pwd");
    console.log(email);
    console.log(pwd);*/

    $.ajax({
        // url: "http://localhost:8080/pos/customer?option=GET_COUNT",
        url: customerAPIBaseUrl+"/getCount",
        method: "GET",
        async: false,
        success: function (resp) {
            response = resp;
            $("#totalCustomers").text("0" + resp.data);
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
        }
    });
}

function getItemCount() {
    $.ajax({
        // url: "http://localhost:8080/pos/item?option=GET_COUNT",
        url: itemAPIBaseUrl+"/getCount",
        method: "GET",
        async: false,
        success: function (resp) {
            $("#totalItems").text("0" + resp.data);
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
        }
    });
}

function getOrderCount() {
    $.ajax({
        // url: "http://localhost:8080/pos/orders?option=GET_COUNT",
        url: ordersAPIBaseUrl+"/getCount",
        method: "GET",
        async: false,
        success: function (resp) {
            $("#totalOrders").text("0" + resp.data);
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
        }
    });
}

function generateNextCustomerID() {
    $.ajax({
        // url: "http://localhost:8080/pos/customer?option=LAST_ID",
        // url: "http://localhost:8080/springBackend/api/pos/customer/lastID",
        url: customerAPIBaseUrl+"/lastID",
        method: "GET",
        async: false,
        success: function (resp) {
            response = resp;
            if (resp.data == null) {
                txtCustomerId.val("C00-001");
                return;
            }
            let lastCustId = resp.data;
            let nextCustId = ++lastCustId.split("-")[1];

            if (nextCustId <= 9) {
                nextCustId = "C00-00" + nextCustId;
                txtCustomerId.val(nextCustId);
                return nextCustId;

            } else if (nextCustId > 9) {
                nextCustId = "C00-0" + nextCustId;
                txtCustomerId.val(nextCustId);
                return nextCustId;

            } else if (nextCustId < 100) {
                nextCustId = "C00-" + nextCustId;
                txtCustomerId.val(nextCustId);
                return nextCustId;
            }
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
        }
    });
}

function generateNextItemCode() {
    $.ajax({
        // url: "http://localhost:8080/pos/item?option=LAST_CODE",
        url: itemAPIBaseUrl+"/lastCode",
        method: "GET",
        async: false,
        success: function (resp) {
            response = resp;
            if (resp.data == null) {
                txtItemCode.val("I00-001");
                return;
            }
            let lastItemCode = resp.data;
            let nextItemCode = ++lastItemCode.split("-")[1];

            if (nextItemCode <= 9) {
                nextItemCode = "I00-00" + nextItemCode;
                txtItemCode.val(nextItemCode);
                return nextItemCode;

            } else if (nextItemCode > 9) {
                nextItemCode = "I00-0" + nextItemCode;
                txtItemCode.val(nextItemCode);
                return nextItemCode;

            } else if (nextItemCode < 100) {
                nextItemCode = "I00-" + nextItemCode;
                txtItemCode.val(nextItemCode);
                return nextItemCode;
            }
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
        }
    });
}

function generateNextOrderID() {
    $.ajax({
        // url: "http://localhost:8080/pos/orders?option=LAST_ID",
        url: ordersAPIBaseUrl+"/lastID",
        method: "GET",
        async: false,
        success: function (resp) {
            response = resp;
            if (resp.data == null) {
                orderId.val("OID-001");
                return;
            }
            let lastOrderId = resp.data;
            let nextOrderId = ++lastOrderId.split("-")[1];

            if (nextOrderId <= 9) {
                nextOrderId = "OID-00" + nextOrderId;
                orderId.val(nextOrderId);
                return nextOrderId;

            } else if (nextOrderId > 9) {
                nextOrderId = "OID-0" + nextOrderId;
                orderId.val(nextOrderId);
                return nextOrderId;

            } else if (nextOrderId < 100) {
                nextOrderId = "OID-" + nextOrderId;
                orderId.val(nextOrderId);
                return nextOrderId;
            }
        },
        error: function (ob, textStatus, error) {
            console.log(ob);
        }
    });
}

function getUserDetails(email,pwd){
    $.ajax({
        url: "http://localhost:8080/pos/user?email="+email+"&pwd="+pwd,
        method: "GET",
        async: false,
        success:function (resp) {
            response = resp;
            console.log(resp);
            return true;
        },
        error:function (ob, textStatus, error) {
            console.log(ob);
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email or Password..',
                showConfirmButton: false,
                text: 'Email : '+email,
                footer: '<a href="">Try Again</a>'
            })
        }
    });
}

//(function () {
    // localStorage.setItem("reload","0");
    /*if(localStorage.getItem("reload") === "1"){
        // localStorage.removeItem("reload");
        console.log("1");
        console.log(localStorage);
        // window.location.href = window.location.href;
        // alert("llllllllllllll")

    } else{ // if reload == 0 (if First Page Load)
        // localStorage.removeItem("reload");
        console.log("2");
        console.log(localStorage);

        /!*let email;
        let pwd;
        (async () => {
            const { value: formValues } = await Swal.fire({
                title: 'Login / Sign Up',
                html:
                    '<label>Email Address</label>' +
                    '<input id="swal-input1" class="swal2-input" type="email" size=25>' +
                    '<label>Password</label>' +
                    '<input id="swal-input2" class="swal2-input" type="password" size=21>',

                allowOutsideClick: false,

                confirmButtonText: 'Login',
                confirmButtonColor: '#1abc9c',

                showCancelButton: true,
                cancelButtonText: 'Sign Up',
                cancelButtonColor: '#ff7f50',

                customClass: {
                    cancelButton: 'order-1 right-gap',
                    confirmButton: 'order-2',
                },
                allowEnterKey: true,
                preConfirm: () => {
                    email = $('#swal-input1').val();
                    pwd = $('#swal-input2').val();
                    console.log(email);
                    console.log(pwd);
                }
            })

            if (email==="" && pwd === "") { // If login
                console.log("empty.....");
                Swal.fire({
                    icon: 'error',
                    title: 'Please enter Credentials..',
                    showConfirmButton: false,
                    text: 'Access Denied!',
                    footer: '<a href="">Try Again</a>'
                })
                return ;
            }

            if (email && pwd) {
                Swal.fire(`Email : ` + email + '\nPassword : ' + pwd)
                getUserDetails(email,pwd);

                if (response.data.pwd === pwd && response.data.email === email) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful...',
                        showConfirmButton: false,
                        timer:2000,

                    })
                    // console.log("going to stop...")
                    window.stop();

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Email or Password..',
                        showConfirmButton: false,
                        text: 'Access Denied!',
                        footer: '<a href="">Try Again</a>'
                    })
                }

            } else if (email) {
                Swal.fire({
                    icon: 'error',
                    title: 'Please enter password..',
                    showConfirmButton: false,
                    text: 'Access Denied!',
                    footer: '<a href="">Try Again</a>'
                })
            } else if (pwd) {
                Swal.fire({
                    icon: 'error',
                    title: 'Please enter email..',
                    showConfirmButton: false,
                    text: 'Access Denied!',
                    footer: '<a href="">Try Again</a>'
                }).then(function() {
                    console.log("aaaaaaa");
                    // window.location = "redirectURL";
                });

            } else if (Swal.DismissReason.cancel) { // If Sign Up
                email = $('#swal-input1').val();
                pwd = $('#swal-input2').val();
                console.log(email);
                console.log(pwd);

                if (email==="" && pwd === "") {
                    console.log("empty.....");
                    Swal.fire({
                        icon: 'error',
                        title: 'Please enter Credentials..',
                        showConfirmButton: false,
                        text: 'Access Denied!',
                        footer: '<a href="">Try Again</a>'
                    })
                    return ;
                }

                if (email && pwd) {
                    getUserDetails(email,pwd);
                    if (response.data.pwd === pwd || response.data.email === email) {
                        Swal.fire({
                            icon: 'error',
                            title: 'A User Already Exist with given Email..',
                            showConfirmButton: false,
                            text: 'Please use another email...',
                            footer: '<a href="">Try Again</a>'
                        })
                        return;
                    }

                    $.ajax({
                        url: "http://localhost:8080/pos/user?email="+email+"&pwd="+pwd,
                        method: "POST",
                        success:function (resp) {
                            console.log(resp);
                            console.log(resp.data.pwd);
                            if (resp.message === "SUCCESS"){
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Sign Up Successful...',
                                    showConfirmButton: false,
                                    timer:2000
                                })

                            }
                            /!* else if (resp.message === "FAIL"){
                                Swal.fire({
                                    icon: 'error',
                                    title: 'qqqqqqqqqqqqqqqqqqqqqqqqq',
                                    showConfirmButton: false,
                                    text: 'Access Denied!',
                                    footer: '<a href="">Try Again</a>'
                                })
                            } else if (resp.status === 500) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'A User already exist with '+email,
                                    showConfirmButton: false,
                                    text: 'Please use another email...',
                                    footer: '<a href="">Try Again</a>'
                                })
                            }*!/
                        },
                        error:function (ob, textStatus, error) {
                            console.log(ob);
                            Swal.fire({
                                icon: 'error',
                                title: 'zzzzzzzzzzzzzzzzzzzzzzzz',
                                showConfirmButton: false,
                                footer: '<a href="">Try Again</a>'
                            })

                        }
                    });

                } else if (email) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Please enter password..',
                        showConfirmButton: false,
                        text: 'Access Denied!',
                        footer: '<a href="">Try Again</a>'
                    })

                } else if (pwd) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Please enter email..',
                        showConfirmButton: false,
                        text: 'Access Denied!',
                        footer: '<a href="">Try Again</a>'
                    })
                }
            }
        })()*!/

        localStorage.setItem("reload","1");
        console.log(localStorage);
    }*/

    // localStorage.setItem("email",email);
    // localStorage.setItem("pwd",pwd);
    // localStorage.removeItem("email");
    // localStorage.removeItem("pwd");

    /*(async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Login / Sign Up',
            html:
                '<label>Email Address</label>' +
                '<input id="swal-input1" class="swal2-input" type="email" size=25 placeholder="abc@gmail.com">' +
                '<label>Password</label>' +
                '<input id="swal-input2" class="swal2-input" type="password" size=21 placeholder="abc123">',

            allowOutsideClick: false,

            confirmButtonText: 'Login',
            confirmButtonColor: '#1abc9c',

            showCancelButton: true,
            cancelButtonText: 'Sign Up',
            cancelButtonColor: '#ff7f50',

            customClass: {
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
            },
            allowEnterKey: true,
            // validationMessage: 'This field is required',

            preConfirm: () => {
                email = $('#swal-input1').val();
                pwd = $('#swal-input2').val();
                // console.log(email);
                // console.log(pwd);
            }
        })

        if (email==="" && pwd === "") { // If login
            console.log("empty.....");
            Swal.fire({
                icon: 'error',
                title: 'Please enter Credentials..',
                showConfirmButton: false,
                allowOutsideClick: false,
                text: 'Access Denied!',
                footer: '<a href="">Try Again</a>'
            })
            return ;
        }

        if (email && pwd) {
            Swal.fire(`Email : ` + email + '\nPassword : ' + pwd)
            getUserDetails(email,pwd);

            if (response.data.pwd === pwd && response.data.email === email) {
                /!*localStorage.removeItem("email");
                localStorage.removeItem("pwd");

                localStorage.setItem("email",email);
                localStorage.setItem("pwd",pwd);*!/

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successfully...',
                    showConfirmButton: false,
                    text:'',
                    timer:2000,

                })

                /!*email = localStorage.getItem("email");
                pwd = localStorage.getItem("pwd");*!/

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Email or Password..',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    text: 'Email : '+email,
                    footer: '<a href="">Try Again</a>'
                })
            }

        } else if (email) {
            Swal.fire({
                icon: 'error',
                title: 'Please enter password..',
                showConfirmButton: false,
                allowOutsideClick: false,
                text: 'Access Denied!',
                footer: '<a href="">Try Again</a>',

            })

        } else if (pwd) {
            Swal.fire({
                icon: 'error',
                title: 'Please enter email..',
                showConfirmButton: false,
                allowOutsideClick: false,
                text: 'Access Denied!',
                footer: '<a href="">Try Again</a>'
            })

        } else if (Swal.DismissReason.cancel) { // If Sign Up
            email = $('#swal-input1').val();
            pwd = $('#swal-input2').val();
            console.log(email);
            console.log(pwd);

            if (email==="" && pwd === "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Please enter Credentials..',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    text: 'Access Denied!',
                    footer: '<a href="">Try Again</a>'
                })
                return ;
            }

            if (email && pwd) {
                getUserDetails(email,pwd);
                if (response.data.pwd === pwd || response.data.email === email) {
                    Swal.fire({
                        icon: 'error',
                        title: 'A User Already Exist with given Email..',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        text: 'Please use another email...',
                        footer: '<a href="">Try Again</a>'
                    })
                    return;
                }

                $.ajax({
                    url: "http://localhost:8080/pos/user?email="+email+"&pwd="+pwd,
                    method: "POST",
                    success:function (resp) {
                        console.log(resp);
                        console.log(resp.data.pwd);
                        if (resp.data === "SUCCESS"){
                            Swal.fire({
                                icon: 'success',
                                title: 'Sign Up Successfully...',
                                showConfirmButton: false,
                                text:'',
                                timer:2000
                            })

                        } else if (resp.status === 500) {
                            Swal.fire({
                                icon: 'error',
                                title: 'A User already exist with '+email,
                                showConfirmButton: false,
                                text: 'Please use another email...',
                                footer: '<a href="">Try Again</a>'
                            })
                        }
                    },
                    error:function (ob, textStatus, error) {
                        console.log(ob);
                        Swal.fire({
                            icon: 'error',
                            title: 'Something Went Wrong...',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            footer: '<a href="">Try Again</a>'
                        })
                    }
                });

            } else if (email) {
                Swal.fire({
                    icon: 'error',
                    title: 'Please enter password..',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    text: 'Access Denied!',
                    footer: '<a href="">Try Again</a>'
                })

            } else if (pwd) {
                Swal.fire({
                    icon: 'error',
                    title: 'Please enter email..',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    text: 'Access Denied!',
                    footer: '<a href="">Try Again</a>'
                })
            }
        }
    })()*/
//})();

// $('.swal2-footer a').click(function (event) {
//     event.preventDefault();
//     console.log("prevent")
//     // or use return false;
// });

$("#nav-home").click(function () {
    $("title").text("Home");

    $("#home-main").css('display', 'block');
    $("#customer-main").css('display', 'none');
    $("#store-main").css('display', 'none');
    $("#orders-main").css('display', 'none');

    $("#nav-home a").addClass("active");
    $("#nav-customer a").removeClass("active");
    $("#nav-store a").removeClass("active");
    $("#nav-orders a").removeClass("active");

    getCustomerCount();
    getItemCount();
    getOrderCount();
});

$("#nav-customer").click(function () {
    $("title").text("Customers");

    $("#home-main").css('display', 'none');
    $("#customer-main").css('display', 'block');
    $("#store-main").css('display', 'none');
    $("#orders-main").css('display', 'none');

    $("#nav-home a").removeClass("active");
    $("#nav-customer a").addClass("active");
    $("#nav-store a").removeClass("active");
    $("#nav-orders a").removeClass("active");

    txtCustomerId.attr("disabled", "disabled");
    $("#txtCustomerName").focus();

    loadAllCustomers();
    generateNextCustomerID();

});

$("#nav-store").click(function () {
    $("title").text("Store");

    $("#home-main").css('display', 'none');
    $("#customer-main").css('display', 'none');
    $("#store-main").css('display', 'block');
    $("#orders-main").css('display', 'none');

    $("#nav-home a").removeClass("active");
    $("#nav-customer a").removeClass("active");
    $("#nav-store a").addClass("active");
    $("#nav-orders a").removeClass("active");

    txtItemCode.attr("disabled", "disabled");
    $("#txtDescription").focus();

    loadAllItems();
    generateNextItemCode();
});

$("#nav-orders").click(function () {
    $("title").text("Orders");

    $("#home-main").css('display', 'none');
    $("#customer-main").css('display', 'none');
    $("#store-main").css('display', 'none');
    $("#orders-main").css('display', 'block');

    $("#nav-home a").removeClass("active");
    $("#nav-customer a").removeClass("active");
    $("#nav-store a").removeClass("active");
    $("#nav-orders a").addClass("active");

    generateNextOrderID();
    loadCmbCustomerId();
    // loadCmbCustomerName();

    loadCmbItemCode();
    // loadCmbDescription();

    load_TblCustomerOrder();
    select_OrderDetailRow();
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
