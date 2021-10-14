$(document).ready(function () {
    $("#searchAgainParam").typeAhead({
        value: "Search Products",
        submitButton: "#submit_button_header2",
        searchAll: true
    });
});

function submitRBType(event) {
    if ((event.keyCode == 13)) {
        mainRBSearch();
    }
}
function mainRBSearch() {
    var n = validateISBN2($.trim($("#searchAgainParam").val()));
    if (n[0] == true) { $('#searchAgainParam').val(n[1]); }
    var q = $('#searchAgainParam').val().replace(/^\s+|\s+$/g, '');
    if (q == null || q.length == 0)
        location.reload();
    else {
        $('#searchAgainParam').val(q);
        $('#ES2').submit();
    }
}
