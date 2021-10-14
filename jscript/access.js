$(document).ready(function () {
    $(".group").accordion({
        header: 'h4',
        autoHeight: false,
        collapsible: true,
        active: false,
        icons: { 'header': 'ui-icon-circlesmall-plus', 'headerSelected': 'ui-icon-circlesmall-minus' }
    });
});