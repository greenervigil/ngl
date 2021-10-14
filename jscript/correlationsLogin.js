var productServiceUrl = '/CorrelationsWebService/CorrelationsWebService?WSDL';
var username;
var passowrd;
$(document).ready(function() {
    $("#loginSubmit").click(function () {
        login();
    });

    $("#username").keydown(function (e) {
        if (e.keyCode == 13)
            login();
    });

    $("#password").keydown(function (e) {
        if (e.keyCode == 13)
            login();
    });

    function login() {
        username = $("#username");
        passowrd = $("#password");

        if (username.val() != "" && passowrd.val() != "") {
            $("#login").ajaxSubmit({
                url: "/correlations/UsersServlet",
                success: function (result) {
                    if (result == "OK")
                        window.location.href = window.location.href;
                    else if (result == "failed")
                        alert("Username or password incorrect");
                    else
                        alert(result);
                }
            });
        }
    }
});